// popup.js

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
const voiceBtn = document.getElementById("voiceBtn");
const result = document.getElementById("result");

// --- CARDS ---
const moodEmoji = document.getElementById("moodEmoji");
const moodTitle = document.getElementById("moodTitle");
const moodSub = document.getElementById("moodSub");

const stressNumber = document.getElementById("stressNumber");
const stressTitle = document.getElementById("stressTitle");
const stressSub = document.getElementById("stressSub");

// --- GLOBAL STATE ---
let currentMood = "Neutral";

// --- LOAD SAVED JOURNAL ---
journal.value = localStorage.getItem("mindjournal_text") || "";

// --- UPDATE UI ---
function updateCards(analysis) {
    currentMood = analysis.mood;

    const emojiMap = {
        "High Distress": "🚨",
        "Anxious": "😰",
        "Low Mood": "😔",
        "Positive": "😄",
        "Neutral": "😐"
    };

    moodEmoji.innerText = emojiMap[analysis.mood] || "😐";
    moodTitle.innerText = analysis.mood;
    moodSub.innerText = analysis.advice;

    const stressMap = {
        "High Distress": 5,
        "Anxious": 4,
        "Low Mood": 3,
        "Neutral": 1,
        "Positive": 0
    };

    stressNumber.innerText = stressMap[analysis.mood];
    stressTitle.innerText =
        analysis.mood === "High Distress" ? "Critical Stress" :
            analysis.mood === "Anxious" ? "High Stress" :
                analysis.mood === "Low Mood" ? "Moderate Stress" :
                    analysis.mood === "Positive" ? "Low Stress" :
                        "Balanced";

    stressSub.innerText = analysis.advice;
}

// --- LIVE INPUT ---
journal.addEventListener("input", () => {
    localStorage.setItem("mindjournal_text", journal.value);
    const text = journal.value.trim();
    if (!text) return;
    updateCards(offlineMoodAnalysis(text));
});

// --- ANALYZE ---
analyzeBtn.addEventListener("click", () => {
    const text = journal.value.trim();
    if (!text) {
        result.innerText = "Please write or speak something first.";
        return;
    }
    const analysis = offlineMoodAnalysis(text);
    updateCards(analysis);
    result.innerText = `Mood: ${analysis.mood}\n\n${analysis.advice}`;
});

// --- VOICE INPUT ---
voiceBtn.addEventListener("click", () => {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice input not supported.");
        return;
    }

    const rec = new webkitSpeechRecognition();
    rec.lang = "en-US";
    rec.start();
    voiceBtn.innerText = "🎙️ Listening...";

    rec.onresult = e => {
        journal.value += (journal.value ? " " : "") + e.results[0][0].transcript;
        localStorage.setItem("mindjournal_text", journal.value);
        updateCards(offlineMoodAnalysis(journal.value));
    };

    rec.onend = () => voiceBtn.innerText = "🎤 Speak";
});

// --- TEXT TO SPEECH ---
function speak(text) {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

// --- I NEED HELP (CHATGPT-LIKE SUPPORT ENGINE) ---
function generateHelpMessage(mood) {

    if (mood === "High Distress") {
        return `I’m really glad you reached out right now. That tells me something important — a part of you wants help, safety, and relief from this pain.

When thoughts about ending life appear, it does NOT mean you truly want to die. It means the pain feels unbearable, exhausting, and endless. Pain can lie. Emotions can lie. But your life still has value — even if you cannot feel it right now.

Please pause for a moment. Breathe slowly with me. You are not weak. You are overwhelmed.

Right now, your safety matters more than anything else.

📞 IMMEDIATE HELP (India):
• Kiran Mental Health Helpline (24/7): 1800-599-0019
• AASRA: +91 9820466726
• Emergency Services: 112

If you can, move to a safer place. Remove anything harmful nearby. Reach out to a trusted person and tell them honestly: “I am not okay and I need help.”

💙 Why your life matters:
Your existence has impact beyond what you see today. People have survived moments like this and later found meaning, connection, love, and peace — but only because they stayed. You do NOT need to solve your entire life tonight. You only need to survive today.

This pain can change.
This moment can pass.
Please stay.`;
    }

    if (mood === "Anxious") {
        return `Anxiety can feel terrifying — racing heart, tight chest, endless thoughts — but listen carefully: you are not in danger right now.

Anxiety is your nervous system stuck in “alarm mode.” It feels real, but it is not harmful.

Let’s calm your body first:
• Put both feet on the ground
• Name 5 things you can see
• Breathe slowly (inhale 4 seconds, exhale 6 seconds)

🛠 How to reduce anxiety long-term:
• Reduce caffeine and late-night screen use
• Write worries down instead of replaying them
• Walk daily or stretch gently
• Practice slow breathing every day

💡 Motivation:
Anxiety does not define you. Many successful, strong people live with anxiety and still achieve amazing things. Every calm breath you take is training your brain to feel safer. You are learning — not failing.`;
    }

    if (mood === "Low Mood") {
        return `Feeling low does not mean you are broken. It means your mind and body are tired.

Lower the pressure. You do not need to be productive right now.

🌱 Small recovery steps:
• Do one tiny task
• Drink water
• Step into sunlight
• Write without judging yourself

🛠 How to slowly heal:
• Maintain sleep and meals
• Reduce negative self-talk
• Stay connected to one safe person

🌟 Motivation:
This phase is not your destination. Many people grow the most during low periods. You are still learning, still becoming, still moving forward — even if it’s slow.`;
    }

    if (mood === "Positive") {
        return `Congratulations — feeling positive is a powerful achievement 🌟

This didn’t happen by accident. Something you did — your habits, mindset, resilience — brought you here.

💡 Reflect:
• What helped you feel this way?
• Who supported you?
• Which routines worked?

🚀 How to keep growing:
• Protect your peace
• Stay consistent with good habits
• Set meaningful goals
• Help others when you can

🌈 Motivation:
This moment proves you are capable of stability, happiness, and success. You have much more ahead — achievements, growth, opportunities. Keep going. This is only the beginning.`;
    }

    return `Checking in with yourself is a sign of emotional intelligence.

Stay mindful.
Stay gentle.
You are building long-term mental strength — and that matters more than constant happiness.`;
}

// --- SMART SUPPORT BUTTON ---
panicBtn.addEventListener("click", () => {
    const msg = generateHelpMessage(currentMood);
    result.innerText = msg;
    speak(msg);
    const emergencyBox = document.getElementById("emergencyActions");

    if (currentMood === "High Distress") {
        emergencyBox.classList.remove("hidden");
    } else {
        emergencyBox.classList.add("hidden");
    }

});

// --- SMART SUPPORT BUTTON ---
panicBtn.addEventListener("click", () => {
    const msg = generateHelpMessage(currentMood);

    // Add emergency call links directly into result box
    result.innerHTML = `
    <div>${msg.replace(/\n/g, "<br>")}</div>
    <br>
    <h3>🚨 Emergency Call Options</h3>
    <a href="tel:112" class="emergency-btn police">🚓 Call Police (112)</a><br>
    <a href="tel:108" class="emergency-btn hospital">🚑 Call Ambulance (108)</a><br>
    <a href="tel:18005990019" class="emergency-btn mental">🧠 Mental Health Helpline (Kiran)</a>
  `;

    speak(msg);

    const emergencyBox = document.getElementById("emergencyActions");
    if (currentMood === "High Distress") {
        emergencyBox.classList.remove("hidden");
    } else {
        emergencyBox.classList.add("hidden");
    }
});