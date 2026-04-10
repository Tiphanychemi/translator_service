chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: "translateToDarija",
            title: "Translate to Darija",
            contexts: ["selection"]
        });
    });
});

chrome.runtime.onStartup.addListener(() => {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: "translateToDarija",
            title: "Translate to Darija",
            contexts: ["selection"]
        });
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "translateToDarija") {
        await chrome.storage.local.set({
            selectedText: info.selectionText || ""
        });

        chrome.tabs.create({
            url: chrome.runtime.getURL("sidepanel.html")
        });
    }
});