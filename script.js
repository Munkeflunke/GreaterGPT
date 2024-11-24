// Grab DOM elements
const apiKeyInput = document.getElementById("apiKey");
const queryTextArea = document.getElementById("queryText");
const responseOutput = document.getElementById("responseOutput");
const sendQueryButton = document.getElementById("sendQuery");
const resetQueryButton = document.getElementById("resetQuery");

// Predefined queries
const exampleQueries = [
    { id: "summarizeFilter", text: "Summarize the given content into key points." },
    { id: "compareFilter", text: "Compare two concepts in the provided input." },
    { id: "categorizeFilter", text: "Categorize the input into logical groups." },
    { id: "prioritizeFilter", text: "Identify and prioritize the main tasks or ideas." },
    { id: "visualizeFilter", text: "Create a visualization for the input data." },
    { id: "debateFilter", text: "Formulate arguments for and against the input topic." },
    { id: "patternFilter", text: "Find patterns in the input data or text." },
    { id: "evaluateFilter", text: "Evaluate the input's effectiveness or quality." },
    { id: "predictFilter", text: "Predict future trends based on the input." },
    { id: "generateFilter", text: "Generate alternative ideas or solutions." },
    { id: "explainFilter", text: "Explain the details behind the input." },
    { id: "contrastFilter", text: "Highlight the differences in the input." },
    { id: "trendFilter", text: "Analyze trends or shifts in the input." },
    { id: "optimizeFilter", text: "Optimize the input for better outcomes." },
    { id: "sentimentFilter", text: "Analyze the emotional tone of the input." },
    { id: "hypothesizeFilter", text: "Develop hypotheses based on the input." },
    { id: "classifyFilter", text: "Classify the input into defined categories." },
    { id: "correlateFilter", text: "Find correlations within the input data." },
    { id: "decomposeFilter", text: "Break the input into smaller, solvable parts." },
    { id: "benchmarkFilter", text: "Compare input performance against benchmarks." },
    { id: "assistantRole", text: "Act as a virtual assistant to manage tasks." },
    { id: "creativeRole", text: "Generate creative ideas from the given input." },
    { id: "educatorRole", text: "Teach the input as a lesson or concept." },
    { id: "translatorRole", text: "Translate the input into another language." },
    { id: "researcherRole", text: "Find relevant information about the input." },
    { id: "debuggerRole", text: "Debug or troubleshoot problems in the input." },
    { id: "storytellerRole", text: "Turn the input into a story or narrative." },
    { id: "explainerRole", text: "Simplify and explain the input in detail." },
    { id: "motivatorRole", text: "Motivate or inspire using the input." },
    { id: "plannerRole", text: "Plan an approach based on the input." },
    { id: "advisorRole", text: "Provide actionable advice related to the input." },
    { id: "criticRole", text: "Critique and review the input for improvement." },
    { id: "entertainerRole", text: "Make the input fun or entertaining." },
    { id: "interviewerRole", text: "Use the input to conduct an interview." },
    { id: "collaboratorRole", text: "Collaborate to build on the input." },
    { id: "roleModelRole", text: "Act as a role model for behavior or decisions." },
    { id: "analystRole", text: "Perform a detailed analysis of the input." },
    { id: "philosopherRole", text: "Interpret the input philosophically." },
    { id: "coachRole", text: "Provide coaching advice using the input." },
    { id: "historianRole", text: "Act as a historian to contextualize the input." }
];

// Attach event listeners to predefined query buttons
exampleQueries.forEach((query) => {
    const button = document.getElementById(query.id);
    if (button) {
        button.addEventListener("click", () => {
            queryTextArea.value += '\n' + query.text;
            queryTextArea.focus();
        });
    }
});

// Helper functions
function resetFields() {
    queryTextArea.value = "";
    responseOutput.innerHTML = "";
}

function displayContent(content) {
    responseOutput.innerHTML = `<pre>${content}</pre>`;
}

function callOpenAI(apiKey, queryText) {
    responseOutput.innerHTML = "Getting your response...";
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: queryText }]
        })
    })
        .then(response => response.json())
        .then(data => {
            const content = data.choices[0].message.content || "No response.";
            displayContent(content);
        })
        .catch(err => {
            displayContent(`Error: ${err.message}`);
        });
}

// Event handlers
sendQueryButton.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim();
    const queryText = queryTextArea.value.trim();

    if (!apiKey) {
        displayContent("Error: API key is required.");
        return;
    }

    if (!queryText) {
        displayContent("Error: Query is empty.");
        return;
    }

    callOpenAI(apiKey, queryText);
});

resetQueryButton.addEventListener("click", resetFields);
