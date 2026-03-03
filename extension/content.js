chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractData") {
        const heading = document.querySelector(".header .title")?.textContent || document.title || "";
        const problemStatement = document.querySelector(".problem-statement")?.innerText || "";

        sendResponse({ heading, problemStatement });
    }
});
