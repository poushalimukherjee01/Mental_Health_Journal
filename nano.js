function offlineMoodAnalysis(text) {
  const lowered = text.toLowerCase();
  const distressWords = ["hopeless", "panic", "worthless", "suicide"];

  if (distressWords.some(word => lowered.includes(word))) {
    return { mood: "High Distress", advice: "You’re not alone. Reach out to someone you trust." };
  }
  if (lowered.includes("stress") || lowered.includes("anxious")) {
    return { mood: "Stressed", advice: "Try grounding exercises or short breaks." };
  }
  if (lowered.includes("sad")) {
    return { mood: "Low Mood", advice: "Be kind to yourself today." };
  }
  return { mood: "Positive", advice: "Keep journaling regularly and stay positive." };
}


async function analyzeWithNano(text) {
  if (navigator.gemini && navigator.gemini.generate) {
    try {
      const response = await navigator.gemini.generate({
        prompt: `Analyze the user's mood from this text: "${text}"`,
        model: "nano"
      });
      return response.text || null;
    } catch (err) {
      return null;
    }
  }
  return null;
}

