chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractData") {
        const slug = window.location.pathname.split("/")[2];
        const heading = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        const problemStatement = document.querySelector(".elfjS")?.innerText
            || document.querySelector("[data-track-load='description_content']")?.innerText
            || document.querySelector(".description__24sA")?.innerText
            || "";

        sendResponse({ heading, problemStatement });
    }
});
