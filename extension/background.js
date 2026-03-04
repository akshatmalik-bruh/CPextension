chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyze") {
        fetch("http://localhost:3000/api/analyse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message.data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                  sendResponse({ error: data.error })
            }
            else{
                sendResponse({ result: data.result })
            } 
          
    })
        .catch(err => sendResponse({ error: err.message }));

        // Return true to keep the message channel open for async response
        return true;
    }
});
