// --- TAB SWITCHING ---
const tabs = document.querySelectorAll(".tabs button");
const screens = document.querySelectorAll(".screen");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        screens.forEach(s => s.classList.remove("active"));
        tab.classList.add("active");
        screens[index].classList.add("active");
    });
});

// --- ELEMENTS ---
const journal = document.getElementById("journalText");
const analyzeBtn = document.getElementById("analyzeBtn");
const panicBtn = document.getElementById("panicBtn");
const result = document.getElementById("result");

// --- CARDS ---
const moodEmoji = document.getElementById("moodEmoji");
const moodTitle = document.getElementById("moodTitle");
const moodSub = document.getElementById("moodSub");

const stressNumber = document.getElementById("stressNumber");
const stressTitle = document.getElementById("stressTitle");
const stressSub = document.getElementById("stressSub");

// --- FUNCTION TO UPDATE CARDS ---
function updateCards(analysis) {
    // Mood card
    moodEmoji.innerText =
        analysis.mood === "High Distress"? "😰" :
            analysis.mood === "Stressed" ? "😓" :
                analysis.mood === "Low Mood" ? "😔" : "😄";

    moodTitle.innerText = analysis.mood;
    moodSub.innerText = analysis.advice;

    // Stress card
    stressNumber.innerText =
        analysis.mood === "High Distress" ? 5 :
            analysis.mood === "Stressed" ? 3 :
                analysis.mood === "Low Mood" ? 2 : 1;

    stressTitle.innerText =
        analysis.mood === "High Distress" ? "Very High" :
            analysis.mood === "Stressed" ? "Moderate Stress" :
                analysis.mood === "Low Mood" ? "Mild Stress" : "Low Stress";

    stressSub.innerText = analysis.advice;
}

// --- LIVE UPDATE WHILE TYPING ---
journal.addEventListener("input", () => {
    const text = journal.value;
    const analysis = offlineMoodAnalysis(text);
    updateCards(analysis);
});

// --- ANALYZE BUTTON ---
analyzeBtn.addEventListener("click", async () => {
    const text = journal.value.trim();
    if (!text) {
        result.innerText = "Please write something first.";
        return;
    }

    result.innerText = "Analyzing...";

    // Gemini Nano optional
    let analysisText = await analyzeWithNano(text);

    // Fallback offline
    let analysis;
    if (!analysisText) {
        analysis = offlineMoodAnalysis(text);
        analysisText = `Mood: ${analysis.mood}\nAdvice: ${analysis.advice}`;
    } else {
        analysis = offlineMoodAnalysis(text); // still update cards from nano
    }

    result.innerText = analysisText;
    updateCards(analysis);
});

// --- PANIC BUTTON ---
panicBtn.addEventListener("click", () => {
    alert(`If you are in immediate danger:
• Call your local emergency number
• Reach a trusted person nearby
• You matter and help exists`);
});
