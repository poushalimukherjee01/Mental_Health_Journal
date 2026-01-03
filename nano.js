let lastAdvice = "";

// --- PICK NON-REPEATING MESSAGE ---
function pickAdvice(list) {
  if (!list || list.length === 0) return "";
  let advice;
  do {
    advice = list[Math.floor(Math.random() * list.length)];
  } while (advice === lastAdvice && list.length > 1);
  lastAdvice = advice;
  return advice;
}

// --- OFFLINE MOOD ANALYSIS ---
function offlineMoodAnalysis(text) {
  const lowered = text.toLowerCase();

  // --- KEYWORDS ---
  const highDistressWords = [
    "suicide", "kill myself", "self harm",
    "end my life", "can't go on",
    "want to die", "give up",
    "overwhelmed", "stressed", "need support", "need help",
    "please help", "help me",
    "overwhelmed", "stressed",
    "helpless", "hopeless",
    "lost", "confused",
    "alone", "isolated",
    "broken", "exhausted",

    "hopeless", "desperate",
    "helpless", "trapped", "need support", "need help",
    "pls help", "help me",
    "not coping", "can’t cope",
    "too much rn", "over limit",
    "breaking down", "losing it",
    "mentally exhausted", "emotionally done",
    "burnt out fr", "fully drained",
    "no energy left", "nothing left",
    "giving up vibes", "done with everything",
    "not okay at all", "really not okay",
    "crying a lot", "can’t stop crying",
    "spiraling badly", "spiral mode",
    "feels unbearable", "too heavy",
    "alone af", "no one there",
    "need someone", "need comfort",
    "need to talk", "need to vent",
    "support pls", "stand by me",
    "not safe", "unsafe rn",
    "dark thoughts", "bad thoughts",
    "panic attack", "full panic",
    "mind shut", "brain shut down",
    "overwhelmed af", "max stress",
    "emotionally wrecked", "mentally broken",
    "can’t function", "can’t think",
    "lost af", "directionless",
    "distress mode", "crisis vibes",

    "burned out", "exhausted",
    "lost", "confused",
    "broken", "shattered",
    "depressed", "low",
    "empty", "numb",
    "overloaded", "drained",
    "frustrated", "defeated",
    "hopeless", "powerless",
    "rejected", "ignored",
    "worthless", "insignificant",
    "lonely", "isolated",
    "traumatized", "scarred",
    "panic", "disturbed",
    "unwanted", "abandoned",
    "crushed", "downtrodden",
    "stressed", "tense",
    "anxious", "fearful",
    "grief", "sorrow",
    "guilt", "remorse",
    "anguish", "pain",
    "resentful", "bitter",
    "disappointed", "discouraged",
    "trapped", "cornered",
    "misunderstood", "neglected",
    "tired", "fatigued",
    "sad", "melancholy",
    "hopeless", "desolate",
    "empty", "void",
    "angry", "resentful",
    "fearful", "apprehensive",
    "frustrated", "helpless",
    "overworked", "overburdened",
    "pressured", "strained",
    "shocked", "traumatized",
    "panic", "fear",
    "tense", "uptight",
    "grieving", "mourning",
    "miserable", "wretched",
    "stressed", "overwhelmed",
    "burnt out", "exhausted",
    "low", "dejected",
    "disheartened", "discouraged",
    "shaky", "unstable",
    "helpless", "defenseless",
    "afraid", "scared",
    "troubled", "distressed",
    "gloomy", "dismal",
    "suffocated", "restricted",
    "angsty", "restless",
    "overpowered", "dominated",
    "resentful", "vindictive",
    "defeated", "beaten",
    "alone", "forsaken",
    "unloved", "neglected"
  ];

  const anxietyWords = [
    "anxious", "anxiety", "panic",
    "panic attack", "fear", "afraid",
    "overthinking", "nervous",
    "nervous", "jittery",
    "tense", "tight",
    "restless", "fidgety",
    "uneasy", "worrying",
    "anxious", "apprehensive", "overthinking", "spiraling",
    "anxious af", "anxiety kicking",
    "on edge", "uneasy vibes",
    "panic mode", "panic-y",
    "stressy", "stress vibes",
    "mind racing", "brain noise",
    "what ifs", "doom thinking",
    "future scared", "fear mode",
    "heart racing", "shaky",
    "cannot relax", "tense af",
    "hyper aware", "too aware",
    "constantly worried", "always worried",
    "mentally loud", "brain loud",
    "nervous energy", "jitters",
    "pressure building", "stress build up",
    "anticipation anxiety", "waiting anxiety",
    "social anxiety", "people fear",
    "exam anxiety", "performance fear",
    "comparison anxiety", "self doubt",
    "second guessing", "double thinking",
    "restless mind", "can’t sit still",
    "need reassurance", "need clarity",
    "not calm", "not peaceful",
    "fear vibes", "unsafe feeling",

    "uncertain", "unsure",
    "fearful", "afraid",
    "panicky", "alarmed",
    "stressed", "overloaded",
    "edgy", "irritable",
    "troubled", "disturbed",
    "overthinking", "obsessing",
    "worried", "concerned",
    "pressured", "strained",
    "shaky", "trembling",
    "overwhelmed", "flustered",
    "jumpy", "skittish",
    "doubtful", "hesitant",
    "uneasy", "perturbed",
    "tensed", "strained",
    "restless", "impatient",
    "cautious", "careful",
    "nervy", "tense",
    "jittery", "twitchy",
    "unsure", "hesitant",
    "alert", "on edge",
    "panic", "alarm",
    "fearful", "scared",
    "anticipating", "watchful",
    "edgy", "anxious",
    "nervous", "fretful",
    "overthinking", "obsessive",
    "shaky", "wobbly",
    "jumpy", "skittish",
    "hyper", "tense",
    "worried", "preoccupied",
    "hesitant", "uncertain",
    "concerned", "troubled",
    "distressed", "uneasy",
    "fretful", "nervous",
    "apprehensive", "cautious",
    "tensed", "tight",
    "tense", "strained",
    "stressed", "pressured",
    "wary", "alert",
    "uneasy", "fretful",
    "jumpy", "tense",
    "on edge", "anxious",
    "panicked", "alarmed",
    "troubled", "perturbed",
    "watchful", "vigilant",
    "overanxious", "worried",
    "preoccupied", "distracted",
    "fretful", "restless",
    "skittish", "nervy",
    "edgy", "uneasy",
    "hesitant", "doubtful",
    "worrying", "concerned",
    "jittery", "trembling", "need reassurance", "seeking support",
    "worried", "anxious",
    "nervous", "uneasy"

  ];

  const negativeWords = [
    "sad", "depressed", "hopeless",
    "lonely", "empty", "cry",
    "crying", "worthless", "tired", "gloomy", "sorrow",
    "unhappy", "down", "sad", "down",
    "angry", "irritated",
    "frustrated", "annoyed",
    "disappointed", "let down",
    "lonely", "isolated",
    "gloomy", "blue",
    "upset", "distressed",
    "resentful", "bitter",
    "jealous", "envious",
    "hurt", "pained",
    "tired", "weary",
    "bored", "dull",
    "apathetic", "indifferent",
    "discouraged", "disheartened",
    "unmotivated", "lazy",
    "grumpy", "cranky",
    "annoyed", "cross",
    "tense", "stiff",
    "resentful", "offended",
    "sorrowful", "mournful",
    "heartbroken", "crushed",
    "regretful", "remorseful",
    "frustrated", "confused",
    "shy", "insecure",
    "ashamed", "embarrassed",
    "guilty", "blameful",
    "stressed", "pressured",
    "anxious", "uneasy",
    "angsty", "restless",
    "lonely", "forsaken",
    "disconnected", "alienated",
    "upset", "disturbed",
    "downcast", "demoralized",
    "unhappy", "miserable",
    "displeased", "unsatisfied",
    "overwhelmed", "burdened",
    "overworked", "tired",
    "resentful", "angry",
    "bitter", "grudging",
    "cynical", "skeptical",
    "fearful", "apprehensive",
    "hurt", "injured",
    "annoyed", "irritated",
    "unloved", "neglected",
    "hopeless", "desperate",
    "sad", "melancholy",
    "discouraged", "defeated",
    "confused", "lost",
    "tense", "tight",
    "uncomfortable", "uneasy",
    "upset", "disturbed",
    "grieved", "mourning", "lowkey sad", "feeling off",
    "not it", "meh",
    "mid", "very mid",
    "drained", "dead tired",
    "fed up", "over it",
    "burnt", "fried",
    "moody", "snappy",
    "blah", "emptyish",
    "down bad", "struggling",
    "out of it", "checked out",
    "meh vibes", "bad vibes",
    "heavy", "weighed down",
    "low energy", "zero energy",
    "not okay", "kinda bad",
    "off era", "rough phase",
    "messy", "chaotic",
    "annoyed af", "irritated",
    "tired fr", "exhausted",
    "disappointed", "let down",
    "overstimulated", "overloaded",
    "stuck", "blocked",
    "unmotivated", "demotivated",
    "socially tired", "people tired",
    "numb-ish", "blank",

    "unmotivated", "lazy",
    "angry", "mad",
    "shameful", "embarrassed",
    "bored", "apathetic",
    "disappointed", "let down",
    "down", "blue",
    "hurt", "offended",
    "lonely", "isolated"
  ];

  const positiveWords = ["happy", "glad",
    "joyful", "elated",
    "excited", "thrilled", "okay", "fine", "okok",
    "content", "satisfied",
    "cheerful", "joyful",
    "calm", "relaxed",
    "peaceful", "content",
    "hopeful", "optimistic",
    "confident", "assured",
    "loved", "cherished", "slaying", "winning",
    "vibing", "good vibes",
    "chill", "chilling",
    "lit", "fire",
    "feeling it", "in my zone",
    "peaceful era", "soft life",
    "glowing", "glow up",
    "main character", "MC energy",
    "locked in", "focused",
    "lowkey happy", "lowkey good",
    "highkey happy", "highkey excited",
    "feels right", "feeling nice",
    "safe space", "comforted",
    "living", "alive",
    "healed", "healing",
    "soft", "gentle",
    "stable era", "balanced",
    "content era", "settled",
    "okay okay", "doing fine",
    "blessed", "grateful",
    "supported", "backed",
    "valid", "seen",
    "warm", "cozy",
    "grounded", "centered",
    "mentally good", "mentally okay",

    "grateful", "thankful",
    "proud", "accomplished",
    "motivated", "driven",
    "energetic", "active",
    "cheerful", "bright",
    "relieved", "unburdened",
    "playful", "fun",
    "satisfied", "fulfilled",
    "optimistic", "positive",
    "loving", "caring",
    "content", "peaceful",
    "strong", "resilient",
    "curious", "interested",
    "excited", "eager",
    "joyful", "happy",
    "relaxed", "calm",
    "cheerful", "jovial",
    "hopeful", "expectant",
    "grateful", "appreciative",
    "proud", "pleased",
    "motivated", "enthusiastic",
    "energetic", "lively",
    "peaceful", "serene",
    "thankful", "blessed",
    "funny", "amused",
    "loved", "valued",
    "supported", "encouraged",
    "secure", "safe",
    "friendly", "warm",
    "confident", "bold",
    "playful", "merry",
    "excited", "delighted",
    "happy", "joyful",
    "cheerful", "bright",
    "optimistic", "hopeful",
    "relaxed", "easygoing",
    "grateful", "thankful",
    "satisfied", "pleased",
    "proud", "content",
    "motivated", "driven",
    "energetic", "vigorous",
    "joyful", "elated",
    "peaceful", "calm",
    "caring", "loving",
    "loved", "treasured",
    "supported", "appreciated",
    "safe", "secure",
    "happy", "blessed",
    "optimistic", "positive",
    "cheerful", "joyful",
    "relaxed", "peaceful",
    "confident", "assured",
    "playful", "fun",
    "grateful", "thankful",
    "proud", "pleased"
  ];

  // --- MESSAGE BANK ---
  const adviceBank = {

    high: [
      `I’m really glad you spoke up. Thoughts about ending life usually mean the pain feels unbearable — not that life has no value.

Your **safety comes first**. Please pause, breathe slowly (inhale 4s, exhale 6s), and move somewhere you’re not alone.

🇮🇳 Emergency Support:
• Kiran (24/7): 1800-599-0019
• AASRA: +91 9820466726
• Emergency: 112

You do not have to fix everything today. Stay alive **today** — that is enough.`
    ],

    anxious: [
      `Anxiety can make your body feel out of control, but you are not in danger.

Try this now:
• Put both feet on the floor
• Name 5 things you can see
• Breathe slowly and relax your shoulders

Anxiety lies about the future. You are safe **right now**.

Motivation: Fear does not decide your future. Each calm breath trains your brain to feel safer.`
    ],

    negative: [
      `Feeling low doesn’t mean you’re weak — it means you’re human.

Slow things down:
• Do one small task
• Drink water
• Write what you feel without judging

Low phases pass, even when they feel endless.

Motivation: This moment is not your whole story. You are still growing.`
    ],

    positive: [
      `It’s great that you’re feeling good 🌟

Notice what helped:
• Good sleep?
• Supportive people?
• Calm routines?

Protect these habits.

Motivation: Remember this feeling — it proves you can return here again.`
    ],

    neutral: [
      `Feeling neutral is okay. It often means emotional balance.

Stay mindful:
• Maintain routines
• Observe thoughts
• Check in with yourself

Motivation: Mental health is awareness, not constant happiness.`
    ]
  };

  // --- DETECTION ORDER ---
  if (highDistressWords.some(w => lowered.includes(w))) {
    return { mood: "High Distress", advice: pickAdvice(adviceBank.high) };
  }

  if (anxietyWords.some(w => lowered.includes(w))) {
    return { mood: "Anxious", advice: pickAdvice(adviceBank.anxious) };
  }

  if (negativeWords.some(w => lowered.includes(w))) {
    return { mood: "Low Mood", advice: pickAdvice(adviceBank.negative) };
  }

  if (positiveWords.some(w => lowered.includes(w))) {
    return { mood: "Positive", advice: pickAdvice(adviceBank.positive) };
  }

  return { mood: "Neutral", advice: pickAdvice(adviceBank.neutral) };
}
