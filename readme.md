🧠 MindJournal
The Privacy-First, Offline Mental Health Companion
MindJournal is a lightweight browser extension designed for secure emotional reflection. By processing all sentiment analysis entirely on-device, it provides a "safe space" for users to journal without the fear of their most private thoughts being tracked, stored, or used for profiling.

🚀 Key Features
🔒 100% On-Device Privacy
Zero Data Leaks: No APIs, no cloud storage, and no trackers.

Local Processing: Sentiment analysis is performed on the user's hardware.

Sensitive-Ready: Designed specifically for high-stakes emotional inputs that users might not want to share with traditional cloud-based LLMs.

✍️ Smart Journaling
Free-Form Writing: A clean, distraction-free interface for daily reflection.

Hybrid Analysis: Uses a fast, keyword-based local engine for immediate feedback, with optional Gemini Nano integration for deeper, local LLM insights.

😊 Intelligent Mood Detection
The engine categorizes entries into four primary states, providing instant visual feedback:

Positive: Encouraging affirmations.

Low Mood: Supportive prompts for self-care.

Stress / Anxiety: Grounding exercises.

High Distress: Immediate redirection to local resources.

📊 Stress Indicator & Safety
Visual Stress Gauge: A 1–5 scale that fluctuates based on linguistic markers in your writing.

Offline Panic Button: If extreme distress is detected, the app instantly reveals an emergency guidance panel with pre-loaded, region-agnostic coping strategies.

🛠️ Technical Stack
Frontend: HTML5, CSS3, JavaScript (Vanilla)

AI/ML: * Primary: Local Regex & Keyword-Sentiment Mapping (Zero Latency).

Advanced: Integrated with Gemini Nano via the Window AI API (Experimental) for local inference.

Storage: chrome.storage.local (Data never leaves the browser profile).

🏗️ How It Works
MindJournal follows a strict Local-Loop architecture:

Input: User types into the Journal tab.

Tokenization: The extension breaks down text into sentiment tokens.

Inference: The local model (or Gemini Nano) evaluates the emotional weight.

UI Update: The UI updates the Emoji, Mood Label, and Stress Level in real-time.

Safety Check: If specific "High Distress" triggers are met, the Panic Button UI is prioritized.

🛡️ Privacy Manifesto
Most mental health apps monetize user data by selling "mood trends" to advertisers. MindJournal does the opposite. * No Account Required: Start journaling immediately.

No Internet Needed: Works perfectly in airplane mode.

Your Data, Your Device: To delete your history, you simply clear your extension data.

🚦 Future Roadmap
[ ] Data Export: Export entries to an encrypted PDF or Markdown file.

[ ] Custom Themes: Dark mode and "Calm" color palettes.

[ ] Voice-to-Text: On-device speech recognition for hands-free journaling.

# Mental_Health_Journal
