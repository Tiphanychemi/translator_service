const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("status");

// Load selected text from storage
chrome.storage.local.get(["selectedText"], (result) => {
    if (result.selectedText) {
        inputText.value = result.selectedText;
    }
});

// Translate text
translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();

    if (!text) {
        statusText.textContent = "Please enter text to translate.";
        return;
    }

    statusText.textContent = "Translating...";

    try {
        const response = await fetch("http://localhost:8080/translator_service/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Authorization": "Basic dXNlcjpwYXNzd29yZDEyMw=="
            },
            body: text
        });

        const result = await response.text();

        if (!response.ok) {
            outputText.value = "";
            statusText.textContent = `Error ${response.status}: ${result}`;
            return;
        }

        outputText.value = result;
        statusText.textContent = "Translation successful.";
    } catch (error) {
        outputText.value = "";
        statusText.textContent = "Request failed: " + error.message;
    }
});

// Read aloud
speakBtn.addEventListener("click", () => {
    const text = outputText.value.trim();

    if (!text) {
        statusText.textContent = "No translation to read aloud.";
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-MA"; // Moroccan Arabic if available
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
        statusText.textContent = "Reading aloud...";
    };

    utterance.onend = () => {
        statusText.textContent = "Finished reading.";
    };

    utterance.onerror = () => {
        statusText.textContent = "Speech failed on this device/browser.";
    };

    window.speechSynthesis.speak(utterance);
});

// Stop reading
stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    statusText.textContent = "Speech stopped.";
});