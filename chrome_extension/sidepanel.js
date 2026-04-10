const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const statusEl = document.getElementById("status");

const API_URL = "http://localhost:8080/translator_service/api/translate";

// Match your backend credentials here
const USERNAME = "user";
const PASSWORD = "password123";

function basicAuthHeader(username, password) {
    return "Basic " + btoa(`${username}:${password}`);
}

chrome.storage.local.get(["selectedText"], (result) => {
    if (result.selectedText) {
        inputText.value = result.selectedText;
    }
});

translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();

    if (!text) {
        statusEl.textContent = "Please enter or select some text first.";
        return;
    }

    statusEl.textContent = "Translating...";
    outputText.value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Authorization": basicAuthHeader(USERNAME, PASSWORD)
            },
            body: text
        });

        const result = await response.text();

        if (!response.ok) {
            throw new Error(result || `HTTP ${response.status}`);
        }

        outputText.value = result;
        statusEl.textContent = "Translation successful.";
    } catch (error) {
        outputText.value = "";
        statusEl.textContent = `Error: ${error.message}`;
    }
});