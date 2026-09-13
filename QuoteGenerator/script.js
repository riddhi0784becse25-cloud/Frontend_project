const quotes = [
    { text: "Dream big. Start small.", category: "motivational" },
    { text: "Success is built daily.", category: "success" },
    { text: "Life is what you make it.", category: "life" },
    { text: "Push yourself every day.", category: "motivational" },
    { text: "Hard work beats talent.", category: "success" },
    { text: "Stay positive always.", category: "life" }
];

let currentCategory = "all";
let currentQuote = "";

function generateQuote() {
    let filteredQuotes;

    if (currentCategory === "all") {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(q => q.category === currentCategory);
    }

    let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuote = filteredQuotes[randomIndex].text;

    document.getElementById("quote").innerText = currentQuote;

    changeBackground();
}

function setCategory(category) {
    currentCategory = category;
}

function saveQuote() {
    if (currentQuote === "") return;

    let saved = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    saved.push(currentQuote);
    localStorage.setItem("savedQuotes", JSON.stringify(saved));

    alert("Quote Saved ❤️");
}

function copyQuote() {
    if (currentQuote === "") return;

    navigator.clipboard.writeText(currentQuote);
    alert("Quote Copied 📒");
}

function changeBackground() {
    const colors = [
        "linear-gradient(135deg, #667eea, #764ba2)",
        "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        "linear-gradient(135deg, #a18cd1, #fbc2eb)",
        "linear-gradient(135deg, #1e1e2f, #2b2b4f)"
    ];

    let randomColor = Math.floor(Math.random() * colors.length);
    document.body.style.background = colors[randomColor];
}

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        this.innerText = "☀️";
    } else {
        this.innerText = "🌙";
    }
});
