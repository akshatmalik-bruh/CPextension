document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const code = document.getElementById("code").value.trim();
  

    
    if (!code) {
        showError("Please paste your code first.");
        return;
    }

    
    document.getElementById("loading").style.display = "block";
    document.getElementById("results").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("analyzeBtn").disabled = true;

    try {

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        const problemData = await chrome.tabs.sendMessage(tab.id, { action: "extractData" });

        if (!problemData || !problemData.heading) {
            showError("Could not extract problem data. Make sure you're on a Codeforces or LeetCode problem page.");
            return;
        }

        
        const headingEl = document.getElementById("problemHeading");
        headingEl.textContent = problemData.heading;
        headingEl.style.display = "block";

        
        const response = await chrome.runtime.sendMessage({
            action: "analyze",
            data: {
                questions: {
                    title: problemData.heading,
                    description: problemData.problemStatement
                },
                
                code: {
                    
                    solution: code
                }
            }
        });

        if (response.error) {
            showError(response.error);
            return;
        }

        
        displayResults(response.result);

    } catch (err) {
        showError("Failed to analyze. Make sure you're on a Codeforces problem page or leetcode problem page and the server is running.");
        console.error(err);
    } finally {
        document.getElementById("loading").style.display = "none";
        document.getElementById("analyzeBtn").disabled = false;
    }
});

function displayResults(result) {
    document.getElementById("results").style.display = "block";

    
    const isCorrectEl = document.getElementById("isCorrect");
    if (result.isCorrect) {
        isCorrectEl.textContent = "Yes";
        isCorrectEl.className = "result-value correct";
    } else {
        isCorrectEl.textContent = "No";
        isCorrectEl.className = "result-value incorrect";
    }

    
    document.getElementById("timeComplexity").textContent = result.timeComplexity;
    document.getElementById("spaceComplexity").textContent = result.spaceComplexity;
    document.getElementById("explanation").textContent = result.explanation;

    
    const optimalCodeDiv = document.getElementById("optimalCode");
    if (result.optimalCode && result.optimalCode.trim() !== "") {
        optimalCodeDiv.style.display = "block";
        document.getElementById("optimalCodeContent").textContent = result.optimalCode;
    } else {
        optimalCodeDiv.style.display = "none";
    }
}

function showError(msg) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("analyzeBtn").disabled = false;
    const errorEl = document.getElementById("error");
    errorEl.textContent = msg;
    errorEl.style.display = "block";
}
