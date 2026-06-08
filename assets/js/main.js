// --- QUIZ DATA STRUCTURE (from extension) ---
const quizData = {
  science: {
    title: "Science Trivia Quiz",
    questions: [
      {
        question: "What is the chemical symbol for the element Gold?",
        options: ["A. Au", "B. Ag", "C. Fe", "D. Gd"],
        answer: "A",
      },
      {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["A. Venus", "B. Jupiter", "C. Mars", "D. Saturn"],
        answer: "C",
      },
      {
        question: "What is the primary function of chlorophyll in a plant?",
        options: [
          "A. To absorb water",
          "B. To absorb sunlight",
          "C. To transport nutrients",
          "D. To store energy",
        ],
        answer: "B",
      },
      {
        question: "In what unit is electric current measured?",
        options: ["A. Watt", "B. Volt", "C. Ohm", "D. Ampere"],
        answer: "D",
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["A. Gold", "B. Iron", "C. Diamond", "D. Quartz"],
        answer: "C",
      },
    ],
  },
  history: {
    title: "World History Quiz",
    questions: [
      {
        question: "Who was the first Emperor of Rome?",
        options: ["A. Julius Caesar", "B. Augustus", "C. Nero", "D. Caligula"],
        answer: "B",
      },
      {
        question: "In which year did the Titanic sink?",
        options: ["A. 1905", "B. 1912", "C. 1918", "D. 1923"],
        answer: "B",
      },
      {
        question: "Which ancient civilization built the pyramids of Giza?",
        options: ["A. Mesopotamian", "B. Greek", "C. Egyptian", "D. Roman"],
        answer: "C",
      },
      {
        question:
          "What war was fought between the North and South regions of the United States?",
        options: [
          "A. World War I",
          "B. Revolutionary War",
          "C. Civil War",
          "D. Korean War",
        ],
        answer: "C",
      },
      {
        question: "The Renaissance began in which country?",
        options: ["A. France", "B. England", "C. Italy", "D. Spain"],
        answer: "C",
      },
    ],
  },
  geography: {
    title: "Geography Facts Quiz",
    questions: [
      {
        question: "What is the longest river in the world?",
        options: [
          "A. Amazon River",
          "B. Nile River",
          "C. Yangtze River",
          "D. Mississippi River",
        ],
        answer: "B",
      },
      {
        question: "What is the capital city of Australia?",
        options: ["A. Sydney", "B. Melbourne", "C. Canberra", "D. Brisbane"],
        answer: "C",
      },
      {
        question: "Which desert is the largest hot desert in the world?",
        options: ["A. Gobi", "B. Arabian", "C. Sahara", "D. Kalahari"],
        answer: "C",
      },
      {
        question: "How many oceans are officially recognized on Earth?",
        options: ["A. Three", "B. Four", "C. Five", "D. Six"],
        answer: "C",
      },
      {
        question:
          "Which mountain range runs along the western coast of South America?",
        options: ["A. Rockies", "B. Himalayas", "C. Alps", "D. Andes"],
        answer: "D",
      },
    ],
  },
  literature: {
    title: "Classic Literature Quiz",
    questions: [
      {
        question: "Who wrote the novel 'Pride and Prejudice'?",
        options: [
          "A. Charlotte Brontë",
          "B. Jane Austen",
          "C. Emily Dickinson",
          "D. Mary Shelley",
        ],
        answer: "B",
      },
      {
        question: "What is the name of the whale in Herman Melville's novel?",
        options: ["A. Shamu", "B. Moby Dick", "C. Flipper", "D. Willy"],
        answer: "B",
      },
      {
        question:
          "The line 'To be, or not to be, that is the question' is from which play?",
        options: [
          "A. Macbeth",
          "B. Othello",
          "C. Hamlet",
          "D. Romeo and Juliet",
        ],
        answer: "C",
      },
      {
        question:
          "Which author is famous for creating the characters Sherlock Holmes and Dr. Watson?",
        options: [
          "A. Agatha Christie",
          "B. Arthur Conan Doyle",
          "C. Edgar Allan Poe",
          "D. Charles Dickens",
        ],
        answer: "B",
      },
      {
        question: "In 'The Great Gatsby', who is the narrator?",
        options: [
          "A. Jay Gatsby",
          "B. Daisy Buchanan",
          "C. Nick Carraway",
          "D. Tom Buchanan",
        ],
        answer: "C",
      },
    ],
  },
};

// --- View Elements (Combined) ---
const authView = document.getElementById("auth-view");
const instructionView = document.getElementById("instruction-view");
const topicSelectionView = document.getElementById("topic-selection-view");
const quizView = document.getElementById("quiz-view");
const resultView = document.getElementById("result-view");

// Quiz UI elements (may not all exist in voice-only mode)
const instructionsContainer = document.getElementById("instructions-text");
const readyPromptElement = document.querySelector(
  "#instruction-view .ready-prompt",
);
const topicPromptElement = document.querySelector(
  "#topic-selection-view .topic-prompt",
);
const topicListElement = document.getElementById("topic-list");

// Auth elements
const authErrorElement = document.getElementById("auth-error");
const authInstructionElement = document.getElementById("auth-instruction");
const userLabel = document.getElementById("user-label");
const logoutButton = document.getElementById("logout-button");
const startVoiceButton = document.getElementById("start-voice");
const voiceStatusElement = document.getElementById("voice-status");

// Quiz elements
const questionTextElement = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const timerElement = document.getElementById("timer");
const scoreTextElement = document.getElementById("score-text");
const finalScoreElement = document.getElementById("final-score");
const topicTitleElement = document.getElementById("topic-title");
const feedbackElement = document.getElementById("feedback");
const scoreSaveStatus = document.getElementById("score-save-status");
const scoreHistoryContainer = document.getElementById("score-history");
const quizVoiceStatusElement = document.getElementById("quiz-voice-status");

// --- Global State ---
let currentTopic = "";
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 30; // Time limit for each question in seconds
let timer;

const API_BASE = "http://127.0.0.1:8001/api";
let authToken = localStorage.getItem("qt_token");
let currentUser = localStorage.getItem("qt_user") || "";

// Global categories storage (loaded from API for better performance)
let availableCategories = [];

// Auth state for voice flow
let authMode = null; // 'login' or 'register'
let authUsername = "";
// let authPassword = ""; // Removed password for username-only auth
const logoutButtonResult = document.getElementById("logout-button-result");

// --- Speech Setup (TTS/STT) ---
const isSpeechSynthSupported = "speechSynthesis" in window;
const isSpeechRecogSupported =
  "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
let speechSynth = isSpeechSynthSupported ? window.speechSynthesis : null;
let utterance = null;
let recognition = null;
let currentCommand = "";
let listeningTimeout = null;
const LISTENING_TIMEOUT = 8000; // 8 seconds
let isRecognizing = false;

console.log("Speech synthesis supported:", isSpeechSynthSupported);
console.log("Speech recognition supported:", isSpeechRecogSupported);

// Diagnostic function to test microphone and speech recognition
window.testMicrophone = async function () {
  console.log("=== MICROPHONE TEST ===");

  // Test 1: Check browser support
  console.log("✓ Browser supports SpeechRecognition:", isSpeechRecogSupported);
  console.log("✓ Browser supports SpeechSynthesis:", isSpeechSynthSupported);
  console.log(
    "✓ Current recognition object:",
    recognition ? "EXISTS" : "MISSING",
  );

  if (recognition) {
    console.log(
      "✓ Recognition state:",
      recognition.continuous ? "CONTINUOUS" : "SINGLE",
    );
    console.log("✓ Recognition language:", recognition.lang);
  }

  // Test 2: Check microphone availability
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("✗ getUserMedia NOT available");
    return;
  }

  try {
    console.log("Requesting microphone access...");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("✓ Microphone access GRANTED");
    stream.getTracks().forEach((track) => track.stop());
  } catch (error) {
    console.error("✗ Microphone access DENIED:", error.name, error.message);
    return;
  }

  // Test 3: Try to start recognition
  if (!recognition) {
    console.error("✗ Recognition object is null");
    return;
  }

  console.log("Attempting to start recognition...");
  try {
    recognition.onstart = () => {
      console.log("✓ Recognition STARTED successfully");
      recognition.stop();
    };
    recognition.onerror = (e) => {
      console.error("✗ Recognition ERROR:", e.error);
    };
    recognition.start();
  } catch (e) {
    console.error("✗ Error starting recognition:", e);
  }

  console.log("=== TEST COMPLETE ===");
};

console.log("Speech recognition initialized successfully");
if (isSpeechRecogSupported) {
  console.log("💡 TIP: Open browser console and run: testMicrophone()");
}

if (isSpeechRecogSupported) {
  try {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening for multiple speech inputs
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;
    console.log("Speech recognition initialized successfully");
  } catch (e) {
    console.error("Failed to initialize speech recognition:", e);
    recognition = null;
  }
}

// --- View Management ---

function showView(viewId) {
  console.log("showView called with:", viewId);
  // Hide all views
  const views = document.querySelectorAll(".view");
  views.forEach((view) => view.classList.remove("active"));
  views.forEach((view) => (view.style.display = "none"));

  // Show the selected view
  const targetView = document.getElementById(viewId);
  if (targetView) {
    console.log("Target view found, showing it");
    targetView.style.display = "block";
    targetView.classList.add("active");
  } else {
    console.error("Target view not found:", viewId);
  }
}

function setAuth(token, username) {
  authToken = token;
  currentUser = username;
  localStorage.setItem("qt_token", token);
  localStorage.setItem("qt_user", username);
  if (userLabel) {
    userLabel.textContent = `Signed in as ${username}`;
  }
}

function clearAuth() {
  authToken = null;
  currentUser = "";
  localStorage.removeItem("qt_token");
  localStorage.removeItem("qt_user");
  if (userLabel) {
    userLabel.textContent = "Signed in";
  }
}

function showAuthError(message) {
  if (authErrorElement) {
    authErrorElement.textContent = message;
  }
}

function setVoiceStatus(message) {
  if (voiceStatusElement) {
    voiceStatusElement.textContent = message;
  }
  if (quizVoiceStatusElement) {
    quizVoiceStatusElement.textContent = message;
  }
}

function normalizeApiError(payload) {
  if (!payload) {
    return "Something went wrong. Please try again.";
  }
  if (typeof payload === "string") {
    return payload;
  }
  if (payload.detail) {
    return payload.detail;
  }
  if (payload.non_field_errors && payload.non_field_errors.length) {
    return payload.non_field_errors[0];
  }
  const firstKey = Object.keys(payload)[0];
  if (firstKey && Array.isArray(payload[firstKey])) {
    return payload[firstKey][0];
  }
  return "Something went wrong. Please try again.";
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (authToken) {
    headers.Authorization = `Token ${authToken}`;
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }
  if (!response.ok) {
    throw new Error(normalizeApiError(payload));
  }
  return payload;
}

// --- Helper Function to Extract Full Text ---
const getFullInstructionsText = () => {
  const fullText = instructionsContainer.innerText;
  return fullText
    .trim()
    .replace(/\n\s*\n/g, ". ")
    .replace(/\n/g, ". ");
};

function readAuthInitialPrompt() {
  if (!isSpeechSynthSupported) {
    console.error("Speech synthesis not supported");
    if (authInstructionElement) {
      authInstructionElement.textContent =
        "Voice features are not supported in this browser. Please use Chrome or Edge.";
    }
    return;
  }
  console.log("Starting auth voice prompt...");
  speak(
    'Welcome to Quiz Talk. Say "Login" to sign in, or "Register" to create a new account. You only need a username.',
    startListeningForAuthCommand,
  );
}

function resetRecognition() {
  if (!isSpeechRecogSupported || !recognition) return;
  if (listeningTimeout) {
    clearTimeout(listeningTimeout);
    listeningTimeout = null;
  }
  // Avoid calling stop()/abort() here — stopping recognition mid-utterance
  // will cause the recognizer to miss user speech. Instead, clear
  // timeouts and handlers so a new flow can take over without forcibly
  // aborting the underlying API.
  try {
    console.log("Resetting recognition: clearing handlers (no stop/abort)");
  } catch (e) {
    console.log(
      "Recognition reset encountered error:",
      e && e.message ? e.message : e,
    );
  }

  // Clear all event handlers
  recognition.onstart = null;
  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onend = null;
  recognition.onnomatch = null;
}

function startRecognitionWithDelay(callback, delayMs = 300) {
  if (!isSpeechRecogSupported || !recognition) return;

  if (isRecognizing) {
    console.warn("Recognition already running — ignoring start request");
    return;
  }

  setTimeout(() => {
    if (!recognition) return;
    // temporary handlers to manage recognizing flag without overwriting
    const onStart = () => {
      isRecognizing = true;
      // remove this listener after fired
      try {
        recognition.removeEventListener("start", onStart);
      } catch (e) {}
    };
    const onEnd = () => {
      isRecognizing = false;
      // cleanup listeners
      try {
        recognition.removeEventListener("end", onEnd);
      } catch (e) {}
    };
    recognition.addEventListener("start", onStart);
    recognition.addEventListener("end", onEnd);

    try {
      console.log("Starting recognition after delay...");
      recognition.start();
      if (callback) callback();
    } catch (e) {
      console.error("Error starting recognition:", e);
      if (e.name === "InvalidStateError") {
        // Still initializing, retry
        setTimeout(() => startRecognitionWithDelay(callback, 100), 200);
      }
    }
  }, delayMs);
}

function startAuthVoiceFlow() {
  if (!isSpeechSynthSupported || !isSpeechRecogSupported) {
    if (authInstructionElement) {
      authInstructionElement.textContent =
        "Voice features are not supported in this browser. Please use Chrome or Edge.";
    }
    showAuthError("Voice not supported");
    return;
  }

  if (speechSynth && typeof speechSynth.resume === "function") {
    speechSynth.resume();
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showAuthError("Microphone access is not available in this browser.");
    return;
  }

  setVoiceStatus("Requesting microphone access...");
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => {
      setVoiceStatus("Microphone ready. Starting voice prompts...");
      readAuthInitialPrompt();
    })
    .catch((error) => {
      console.error("getUserMedia error:", error);
      if (error.name === "NotAllowedError" || error.name === "SecurityError") {
        showAuthError(
          "Microphone permission blocked. Please allow mic access and press Start Voice.",
        );
        setVoiceStatus("Microphone blocked.");
        return;
      }
      if (
        error.name === "NotFoundError" ||
        error.name === "OverconstrainedError"
      ) {
        showAuthError(
          "No microphone found. Please connect a microphone and press Start Voice.",
        );
        setVoiceStatus("Microphone not found.");
        return;
      }
      showAuthError("Could not access microphone. Please try again.");
      setVoiceStatus("Microphone error.");
    });
}

function startListeningForAuthCommand() {
  if (!isSpeechRecogSupported || !recognition) {
    console.error("Speech recognition not supported");
    showAuthError(
      "Voice input is not supported in this browser. Please use Chrome or Edge.",
    );
    return;
  }

  if (authInstructionElement) {
    authInstructionElement.textContent =
      "Listening... Say 'Login' or 'Register'.";
  }

  console.log("Listening for login/register command...");
  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onend = null;
  recognition.onnomatch = null;

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);
    const cmd = event.results[event.resultIndex][0].transcript.toLowerCase();
    console.log("Heard:", cmd);
    if (cmd.includes("login")) {
      authMode = "login";
      speak("Please say your username.", startListeningForAuthUsername);
    } else if (cmd.includes("register")) {
      authMode = "register";
      speak("Please say your desired username.", startListeningForAuthUsername);
    } else {
      speak('Sorry, please say "Login" or "Register".');
    }
  };

  recognition.onnomatch = function () {
    console.log("No match detected in auth command");
    speak("I didn't hear you clearly. Please say Login or Register again.");
  };

  recognition.onend = function () {
    console.log("Recognition ended for auth command.");
  };

  recognition.onerror = function (event) {
    console.error("Recognition error:", event && event.error);
    if (
      event.error === "not-allowed" ||
      event.error === "service-not-allowed"
    ) {
      showAuthError(
        "Microphone permission blocked. Please allow mic access and press Start Voice.",
      );
      return;
    }
    if (event.error === "audio-capture") {
      showAuthError(
        "No microphone found. Please connect a microphone and press Start Voice.",
      );
      return;
    }
    if (event.error === "network") {
      showAuthError(
        "Speech service unavailable (network error). Please use Chrome or Edge, or enable speech services in your browser.",
      );
      setVoiceStatus("Speech service unavailable.");
    }
  };

  try {
    startRecognitionWithDelay(
      () => setVoiceStatus("🎤 Listening for Login or Register..."),
      200,
    );
  } catch (e) {
    console.error("Error starting recognition:", e);
  }
}

function startListeningForAuthUsername() {
  if (!isSpeechRecogSupported || !recognition) return;

  if (authInstructionElement) {
    authInstructionElement.textContent = "Listening... Say your username.";
  }

  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onend = null;
  recognition.onnomatch = null;

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);
    authUsername = event.results[event.resultIndex][0].transcript
      .toLowerCase()
      .trim();
    performAuth();
  };

  recognition.onnomatch = function () {
    console.log("No match detected for username");
    speak("I didn't catch that. Please say your username again.");
  };

  recognition.onend = function () {
    console.log("Recognition ended for username.");
  };

  recognition.onerror = function (event) {
    if (
      event.error === "not-allowed" ||
      event.error === "service-not-allowed"
    ) {
      showAuthError(
        "Microphone permission blocked. Please allow mic access and press Start Voice.",
      );
      return;
    }
    if (event.error === "audio-capture") {
      showAuthError(
        "No microphone found. Please connect a microphone and press Start Voice.",
      );
      return;
    }
    if (event.error === "network") {
      showAuthError(
        "Speech service unavailable (network error). Please use Chrome or Edge, or enable speech services in your browser.",
      );
      setVoiceStatus("Speech service unavailable.");
      resetRecognition();
    }
  };

  try {
    startRecognitionWithDelay(
      () => setVoiceStatus("🎤 Listening for your username..."),
      150,
    );
  } catch (e) {
    console.error("Error starting username recognition:", e);
  }
}

async function performAuth() {
  stopSpeechAndRecognition();
  showAuthError("");

  try {
    const endpoint = authMode === "login" ? "/login/" : "/register/";
    const body = { username: authUsername }; // Only username is needed

    const data = await apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });

    setAuth(data.token, data.username);
    speak(
      `Welcome, ${data.username}! Starting the quiz interface now.`,
      initInstructionView,
    );
  } catch (error) {
    showAuthError(error.message);
    speak(`${error.message} Please say Login or Register.`);
    authMode = null;
    authUsername = "";
  }
}

async function loadCurrentUser() {
  if (!authToken) {
    return false;
  }
  try {
    const data = await apiRequest("/me/");
    setAuth(authToken, data.username);
    return true;
  } catch (error) {
    clearAuth();
    return false;
  }
}

function renderScoreHistory(scores) {
  if (!scoreHistoryContainer) return;
  if (!scores || scores.length === 0) {
    scoreHistoryContainer.innerHTML =
      "<h3>My Recent Scores</h3><p>No scores yet.</p>";
    return;
  }

  const items = scores
    .slice(0, 6)
    .map((entry) => {
      const date = new Date(entry.created_at).toLocaleDateString();
      return `
        <li class="score-item">
          <div class="score-item__row">
            <span class="score-item__topic">${entry.topic}</span>
            <span class="score-item__score">${entry.score}/${entry.total_questions}</span>
          </div>
          <div class="score-item__date">${date}</div>
        </li>
      `;
    })
    .join("");

  scoreHistoryContainer.innerHTML = `<h3>My Recent Scores</h3><ul class="score-list">${items}</ul>`;
}

async function loadScoreHistory() {
  if (!authToken) {
    renderScoreHistory([]);
    return;
  }
  try {
    const scores = await apiRequest("/scores/me/");
    renderScoreHistory(scores);
  } catch (error) {
    renderScoreHistory([]);
  }
}

// --- TTS Core Functions ---

function speak(text, callback) {
  if (!isSpeechSynthSupported) {
    console.error("Speech synthesis not supported");
    if (callback) callback();
    return;
  }

  if (speechSynth.speaking) {
    speechSynth.cancel();
  }

  console.log("Speaking:", text);
  utterance = new SpeechSynthesisUtterance(text);

  // Use a local flag for this specific utterance
  let callbackFired = false;

  if (callback) {
    // Primary callback: fires when speech ends
    utterance.onend = () => {
      if (!callbackFired) {
        callbackFired = true;
        console.log("Speech completed, firing callback");
        callback();
      }
    };
  }

  speechSynth.speak(utterance);
}

function stopSpeechAndRecognition() {
  if (isSpeechSynthSupported && speechSynth.speaking) {
    speechSynth.cancel();
  }
  if (isSpeechRecogSupported && recognition) {
    recognition.stop();
  }
  if (listeningTimeout) {
    clearTimeout(listeningTimeout);
    listeningTimeout = null;
  }
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

// --- Instructions View Logic ---

async function loadCategories() {
  /**
   * Load categories from API for dynamic topic management
   * This approach ensures better performance and scalability:
   * - Database indexes on 'is_active' and 'order' for fast queries
   * - Only active categories are fetched
   * - Results are cached in availableCategories
   * - No hardcoding of topics in frontend
   */
  try {
    const response = await fetch(`${API_BASE}/categories/`);
    if (!response.ok) {
      console.error("Failed to load categories:", response.status);
      return false;
    }

    const data = await response.json();
    availableCategories = data.categories || [];
    console.log("Loaded categories:", availableCategories);

    // Populate the topic list UI
    populateTopicList();
    return true;
  } catch (error) {
    console.error("Error loading categories:", error);
    return false;
  }
}

function populateTopicList() {
  /**
   * Dynamically populate the topic list UI with loaded categories
   * This is called after categories are loaded from API
   */
  if (!topicListElement) return;

  topicListElement.innerHTML = "";

  availableCategories.forEach((category, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-topic", category.slug);
    li.textContent = `${index + 1}. ${category.name}`;
    topicListElement.appendChild(li);
  });

  console.log(`Populated ${availableCategories.length} topics`);
}

function readInstructions() {
  if (isSpeechRecogSupported && recognition) recognition.stop();
  speak(getFullInstructionsText(), startListeningForStartCommand);
}

function readTopicInstructions() {
  if (isSpeechRecogSupported && recognition) recognition.stop();
  try {
    const topics = Array.from(topicListElement.children)
      .map((li) => li.textContent.trim())
      .join(". ");
    const text = `The available topics are: ${topics}. ${topicPromptElement.textContent}`;
    speak(text, startListeningForTopicCommand);
  } catch (e) {
    console.error("Error in readTopicInstructions:", e);
    startListeningForTopicCommand();
  }
}

// NEW: Read custom topic prompt (skip category list)
function readCustomTopicPrompt() {
  if (isSpeechRecogSupported && recognition) recognition.stop();
  try {
    const text =
      "What quiz topic would you like? Say any topic you're interested in - for example: Astronomy, Cooking, Ancient Egypt, or any subject you'd like to learn about.";
    speak(text, startListeningForCustomTopic);
  } catch (e) {
    console.error("Error in readCustomTopicPrompt:", e);
    startListeningForCustomTopic();
  }
}

// --- STT Core Functions (Instructions/Topic) ---

function startListeningForStartCommand() {
  if (!isSpeechRecogSupported || !recognition) return;

  recognition.onresult = null;
  recognition.onerror = null;

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);
    currentCommand = event.results[0][0].transcript.toLowerCase();

    if (
      currentCommand.includes("start quiz") ||
      currentCommand.includes("begin")
    ) {
      showTopicSelection();
    } else {
      speak(`Sorry, I didn't recognize that. Please say 'Start Quiz'.`);
      setTimeout(startListeningForStartCommand, 500);
    }
  };

  recognition.onerror = function (event) {
    if (event.error !== "no-speech") {
      setTimeout(startListeningForStartCommand, 500);
    }
  };

  try {
    startRecognitionWithDelay(() => {
      listeningTimeout = setTimeout(() => {
        console.log("Listening timeout for start command");
        resetRecognition();
        speak("I didn't hear you. Please say Start Quiz to begin.", () => {
          setTimeout(startListeningForStartCommand, 500);
        });
      }, LISTENING_TIMEOUT);
    }, 200);
  } catch (e) {
    if (e.name !== "InvalidStateError") {
    }
  }
}

function startListeningForResultCommand() {
  if (!isSpeechRecogSupported || !recognition) return;

  recognition.onresult = null;
  recognition.onerror = null;

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);
    const cmd = event.results[0][0].transcript.toLowerCase();

    if (
      cmd.includes("logout") ||
      cmd.includes("log out") ||
      cmd.includes("sign out")
    ) {
      clearAuth();
      showView("auth-view");
      startAuthVoiceFlow();
      return;
    }

    if (
      cmd.includes("start quiz") ||
      cmd.includes("begin") ||
      cmd.includes("play again")
    ) {
      showTopicSelection();
      return;
    }

    speak(
      "Please say Start Quiz to play again, or say Logout to sign out.",
      () => {
        setTimeout(startListeningForResultCommand, 500);
      },
    );
  };

  recognition.onerror = function (event) {
    if (event.error !== "no-speech") {
      setTimeout(startListeningForResultCommand, 500);
    }
  };

  try {
    startRecognitionWithDelay(() => {
      listeningTimeout = setTimeout(() => {
        console.log("Listening timeout for result command");
        resetRecognition();
        speak(
          "I didn't hear you. Say Start Quiz to play again, or say Logout to sign out.",
          () => {
            setTimeout(startListeningForResultCommand, 500);
          },
        );
      }, LISTENING_TIMEOUT);
    }, 200);
  } catch (e) {
    if (e.name !== "InvalidStateError") {
    }
  }
}

function startListeningForTopicCommand() {
  if (!isSpeechRecogSupported || !recognition) return;

  recognition.onresult = null;
  recognition.onerror = null;

  recognition.onstart = function () {
    console.log("Recognition started for topic selection");
  };

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);

    // Check if we have a final result
    let finalTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      currentCommand = finalTranscript.toLowerCase();
      console.log("Final transcript for topic:", currentCommand);
      handleTopicSelection(currentCommand);
    }
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);

    // Handle different error types
    if (event.error === "no-speech") {
      speak(
        "I didn't hear anything. Please say a topic name or number.",
        () => {
          setTimeout(startListeningForTopicCommand, 500);
        },
      );
    } else if (event.error === "audio-capture") {
      speak("No microphone found. Please check your audio settings.", () => {
        setTimeout(startListeningForTopicCommand, 500);
      });
    } else if (event.error === "network") {
      speak("Network error. Please try again.", () => {
        setTimeout(startListeningForTopicCommand, 500);
      });
    } else {
      speak(
        "Sorry, I had trouble understanding. Please say a topic name or number.",
        () => {
          setTimeout(startListeningForTopicCommand, 500);
        },
      );
    }
  };

  try {
    startRecognitionWithDelay(() => {
      console.log("Speech recognition started");
      listeningTimeout = setTimeout(() => {
        console.log("Listening timeout for topic command");
        resetRecognition();
        speak(
          "I didn't hear a topic. Please say the topic number or name.",
          () => {
            setTimeout(startListeningForTopicCommand, 500);
          },
        );
      }, LISTENING_TIMEOUT);
    }, 200);
  } catch (e) {
    console.error("Error starting recognition:", e);
  }
}

// NEW: Listen for custom topic (free-form input - no predefined list)
function startListeningForCustomTopic() {
  if (!isSpeechRecogSupported || !recognition) return;

  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onstart = null;

  recognition.onstart = function () {
    console.log("Recognition started for custom topic");
  };

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);

    // Check if we have a final result
    let finalTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      currentCommand = finalTranscript.toLowerCase().trim();
      console.log("Custom topic spoken:", currentCommand);
      handleCustomTopic(currentCommand);
    }
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);

    if (event.error === "no-speech") {
      speak("I didn't hear anything. Please say your topic.", () => {
        setTimeout(startListeningForCustomTopic, 500);
      });
    } else if (event.error === "audio-capture") {
      speak("No microphone found. Please check your audio settings.", () => {
        setTimeout(startListeningForCustomTopic, 500);
      });
    } else if (event.error === "network") {
      speak("Network error. Please try again.", () => {
        setTimeout(startListeningForCustomTopic, 500);
      });
    } else {
      speak(
        "Sorry, I had trouble understanding. Please say your topic.",
        () => {
          setTimeout(startListeningForCustomTopic, 500);
        },
      );
    }
  };

  try {
    startRecognitionWithDelay(() => {
      console.log("Speech recognition started for custom topic");
      listeningTimeout = setTimeout(() => {
        console.log("Listening timeout for custom topic");
        resetRecognition();
        speak("I didn't hear a topic. Please say the topic name.", () => {
          setTimeout(startListeningForCustomTopic, 500);
        });
      }, LISTENING_TIMEOUT);
    }, 200);
  } catch (e) {
    console.error("Error starting recognition:", e);
  }
}

function handleTopicSelection(command) {
  if (!command || command.trim() === "") {
    speak(
      "I couldn't hear a topic. Please say the topic name or number clearly.",
    );
    setTimeout(startListeningForTopicCommand, 500);
    return;
  }

  console.log("Processing command:", command);
  const normalized = command
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();

  // Build dynamic topics mapping from availableCategories
  const topics = {};
  availableCategories.forEach((category, index) => {
    const num = index + 1;
    const numWords = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const ordinalWords = [
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth",
    ];

    // Add numeric and word variations for each category
    topics[String(num)] = category.slug;
    if (numWords[index]) topics[numWords[index]] = category.slug;
    if (ordinalWords[index]) topics[ordinalWords[index]] = category.slug;
    topics[category.slug] = category.slug;
    topics[category.name.toLowerCase()] = category.slug;
  });

  let selectedTopic = null;

  // Try exact match first
  if (topics[normalized]) {
    selectedTopic = topics[normalized];
  } else {
    // Try partial match
    for (const key in topics) {
      if (normalized.includes(key) && key.length > 1) {
        selectedTopic = topics[key];
        break;
      }
    }
  }

  if (selectedTopic) {
    console.log("Topic selected:", selectedTopic);
    if (isSpeechRecogSupported && recognition) {
      recognition.stop();
    }
    currentTopic = selectedTopic;

    // Get the selected category name for feedback
    const selectedCategory = availableCategories.find(
      (c) => c.slug === selectedTopic,
    );
    const categoryName = selectedCategory
      ? selectedCategory.name
      : selectedTopic;

    speak(`You selected ${categoryName}. Starting the quiz now!`, () => {
      initQuiz(selectedTopic);
    });
  } else {
    console.log("No topic matched for normalized command:", normalized);

    // Generate dynamic feedback message
    const topicNames = availableCategories
      .map((c, i) => `${i + 1} for ${c.name}`)
      .join(", ");
    speak(`I couldn't match that to a topic. Please say ${topicNames}.`);
    setTimeout(startListeningForTopicCommand, 500);
  }
}

// NEW: Handle custom (free-form) topic - directly use user input without predefined matching
function handleCustomTopic(topic) {
  if (!topic || topic.trim() === "") {
    speak("I couldn't hear a topic. Please say a topic name clearly.");
    setTimeout(startListeningForCustomTopic, 500);
    return;
  }

  // Clean up the topic for API use
  const customTopic = topic.trim();
  console.log("Using custom topic:", customTopic);

  if (isSpeechRecogSupported && recognition) {
    recognition.stop();
  }

  // Speak confirmation and start quiz with custom topic
  speak(
    `Great! Starting a quiz about ${customTopic}. Generating questions now...`,
    () => {
      initQuiz(customTopic);
    },
  );
}

if (topicListElement) {
  topicListElement.addEventListener("click", (event) => {
    const target = event.target.closest("li");
    if (!target) return;
    const topic = target.getAttribute("data-topic");
    if (!topic) return;
    if (isSpeechRecogSupported && recognition) {
      resetRecognition();
    }
    currentTopic = topic;
    initQuiz(topic);
  });
}

// Function to transition from Instructions to Topic Selection
async function showTopicSelection() {
  if (isSpeechRecogSupported && recognition) {
    recognition.stop();
  }
  showView("topic-selection-view");

  // Skip category list - go straight to custom topic selection
  readCustomTopicPrompt();
}

function startQuiz() {
  if (!authToken) {
    showView("auth-view");
    showAuthError("Please sign in to start the quiz.");
    return;
  }
  if (isSpeechSynthSupported && speechSynth.speaking) {
    speechSynth.cancel();
  }
  showTopicSelection();
}

// --- QUIZ LOGIC (from extension) ---

// Global keyboard handler for quiz answers
let quizKeyboardHandler = null;

async function initQuiz(topic) {
  console.log("Initializing quiz for topic:", topic);

  // 1. Setup initial state
  currentTopic = topic;
  currentQuestionIndex = 0;
  score = 0;
  scoreTextElement.textContent = `Score: ${score}`;

  // 2. Try to load questions from hardcoded data first, or generate via API
  if (quizData[currentTopic]) {
    // Legacy hardcoded data
    console.log("Using hardcoded quiz data for:", topic);
    questions = quizData[currentTopic].questions;
    topicTitleElement.textContent = quizData[currentTopic].title;
    startQuizView();
  } else {
    // Generate questions dynamically via API
    console.log("Generating questions via API for:", topic);
    try {
      const response = await fetch(`${API_BASE}/generate-questions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          topic: topic,
          difficulty: "medium",
          num_questions: 5,
        }),
      });

      if (!response.ok) {
        console.error("Failed to generate questions:", response.status);
        speak("Error generating questions. Please try again.", () => {
          showTopicSelection();
        });
        return;
      }

      const data = await response.json();
      console.log("Received questions:", data);

      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions in response");
      }

      questions = data.questions;

      // Find the category name from availableCategories
      const category = availableCategories.find((c) => c.slug === topic);
      topicTitleElement.textContent = category ? category.name : topic;

      startQuizView();
    } catch (error) {
      console.error("Error generating questions:", error);
      speak(
        "Could not generate questions. Please try another category.",
        () => {
          showTopicSelection();
        },
      );
    }
  }
}

function startQuizView() {
  // Start the quiz view
  showView("quiz-view");

  // Enable keyboard shortcuts
  if (quizKeyboardHandler) {
    document.removeEventListener("keydown", quizKeyboardHandler);
  }
  quizKeyboardHandler = (e) => {
    const key = e.key.toLowerCase();
    if (["a", "b", "c", "d"].includes(key)) {
      resetRecognition();
      handleAnswer(key);
    }
  };
  document.addEventListener("keydown", quizKeyboardHandler);

  loadQuestion();
}

function loadQuestion() {
  stopSpeechAndRecognition();

  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestionIndex];

  questionTextElement.textContent = q.question;
  optionsList.innerHTML = q.options
    .map((opt, idx) => {
      const letter = ["A", "B", "C", "D"][idx];
      return `<li data-answer="${letter}" style="cursor: pointer; transition: background 0.2s;" 
                  onmouseover="this.style.background='#e3f2fd'" 
                  onmouseout="this.style.background='#fcfcfc'">${opt}</li>`;
    })
    .join("");

  // Show 30 seconds on timer immediately for this question
  timerElement.textContent = `Time left: ${timeLimit}s`;

  const questionText = `Question ${currentQuestionIndex + 1}. ${
    q.question
  }. The options are: ${q.options.join(". ")}`;

  // Add click handlers to options
  const optionItems = optionsList.querySelectorAll("li");
  optionItems.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.getAttribute("data-answer");
      if (answer) {
        stopSpeechAndRecognition();
        handleAnswer(answer.toLowerCase());
      }
    });
  });

  console.log("Question loaded, starting speech and waiting for completion...");

  // Speak question first, then start timer after reading completes
  speak(questionText, () => {
    console.log(
      "Speech completed for question, now starting timer and listening...",
    );
    // Timer starts after the system finishes reading the question and options
    startTimer();
    // Then start listening for the user's answer
    startListeningForAnswer();
  });
}

function startTimer() {
  // Make sure any previous timer is completely cleared
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  let timeLeft = timeLimit;
  timerElement.textContent = `Time left: ${timeLeft}s`;

  timer = setTimeout(function tick() {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      timer = null;
      handleAnswer(null); // Time's up, null answer
    } else {
      timer = setTimeout(tick, 1000);
    }
  }, 1000);
}

function startListeningForAnswer() {
  if (!isSpeechRecogSupported || !recognition) {
    console.error("Speech recognition not available");
    return;
  }

  console.log("Starting to listen for answer...");
  let answerSubmitted = false; // Prevent duplicate answer submissions

  // Clear previous handlers
  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onend = null;
  recognition.onnomatch = null;

  recognition.onstart = function () {
    console.log("Recognition started successfully");
    setVoiceStatus("Listening for your answer...");
  };

  recognition.onresult = function (event) {
    if (answerSubmitted) {
      console.log("Answer already submitted, ignoring further results");
      return;
    }

    if (listeningTimeout) clearTimeout(listeningTimeout);

    // Only process final results (not interim)
    let finalTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript.toLowerCase();
      }
    }

    if (finalTranscript.trim()) {
      console.log("Heard answer:", finalTranscript);
      answerSubmitted = true; // Mark as submitted to prevent duplicates
      handleAnswer(finalTranscript);
    }
  };

  recognition.onnomatch = function (event) {
    console.log("No match detected");
    if (!answerSubmitted) {
      speak("Sorry, I didn't catch that. Please say A, B, C, or D.", () => {
        if (timer && !answerSubmitted)
          setTimeout(() => startListeningForAnswer(), 500);
      });
    }
  };

  recognition.onerror = function (event) {
    console.error("Recognition error:", event.error);

    if (
      event.error === "not-allowed" ||
      event.error === "service-not-allowed"
    ) {
      showAuthError(
        "Microphone permission denied. Please refresh and allow microphone access.",
      );
      return;
    }
    if (event.error === "network") {
      console.error("Network error in speech recognition service");
      return;
    }

    if (event.error !== "no-speech" && event.error !== "audio-capture") {
      if (!answerSubmitted) {
        speak("Pardon? Please say A, B, C, or D.", () => {
          if (timer && !answerSubmitted)
            setTimeout(() => startListeningForAnswer(), 500);
        });
      }
    }
  };

  recognition.onend = function () {
    console.log("Recognition ended");
    if (!answerSubmitted && timer) {
      console.log("Recognition ended but no answer yet, restarting...");
      resetRecognition();
      startRecognitionWithDelay(() => startListeningForAnswer(), 500);
    }
  };

  try {
    // Explicitly reset before starting
    resetRecognition();

    // Start with proper delay
    startRecognitionWithDelay(() => {
      setVoiceStatus("🎤 Listening...");

      listeningTimeout = setTimeout(() => {
        console.log("Listening timeout for answer (30s)");
        if (!answerSubmitted) {
          resetRecognition();
          speak("I didn't hear your answer. Please say A, B, C, or D.", () => {
            if (timer && !answerSubmitted)
              setTimeout(() => startListeningForAnswer(), 500);
          });
        }
      }, timeLimit * 1000); // Match the time limit (e.g., 30 seconds)
    }, 300);
  } catch (e) {
    console.error("Error in startListeningForAnswer:", e);
  }
}

async function handleAnswer(spokenCommand) {
  stopSpeechAndRecognition();

  const q = questions[currentQuestionIndex];

  // Better answer detection with priority matching
  const exactMatches = {
    a: "A",
    b: "B",
    c: "C",
    d: "D",
  };

  const phoneticMatches = {
    ay: "A",
    be: "B",
    bee: "B",
    see: "C",
    sea: "C",
    dee: "D",
  };

  const longMatches = {
    "option a": "A",
    "option b": "B",
    "option c": "C",
    "option d": "D",
    "answer a": "A",
    "answer b": "B",
    "answer c": "C",
    "answer d": "D",
  };

  let userChoice = null;

  if (spokenCommand) {
    const normalized = spokenCommand.toLowerCase().trim();
    console.log("Normalized command:", normalized);

    // Priority 1: Exact single letter match
    if (normalized in exactMatches) {
      userChoice = exactMatches[normalized];
      console.log("Matched as exact letter:", userChoice);
    }
    // Priority 2: Check for phonetic spellings
    else if (normalized in phoneticMatches) {
      userChoice = phoneticMatches[normalized];
      console.log("Matched as phonetic:", userChoice);
    }
    // Priority 3: Check for longer phrases
    else {
      for (const key in longMatches) {
        if (normalized.includes(key)) {
          userChoice = longMatches[key];
          console.log("Matched as long phrase:", key, "->", userChoice);
          break;
        }
      }
    }
  }

  let feedbackText;
  let isCorrect = false;

  if (userChoice === q.answer) {
    score++;
    isCorrect = true;
    feedbackText = `Correct! Your answer, ${userChoice}, is right.`;
  } else if (userChoice) {
    feedbackText = `Incorrect. You said ${userChoice}, but the correct answer was ${q.answer}.`;
  } else if (spokenCommand !== null) {
    feedbackText = `I couldn't understand that. The correct answer was ${q.answer}.`;
  } else {
    feedbackText = `Time's up! The correct answer was ${q.answer}.`;
  }

  scoreTextElement.textContent = `Score: ${score}`;
  currentQuestionIndex++;

  // If answer is incorrect and user is logged in, get Grok explanation
  if (!isCorrect && spokenCommand !== null && authToken) {
    speak(feedbackText, async () => {
      try {
        console.log("Fetching Grok explanation for incorrect answer...");
        const explanation = await handleIncorrectAnswer(
          q,
          userChoice,
          currentTopic,
          authToken,
          loadQuestion, // Pass loadQuestion as callback to run after explanation finishes
        );

        console.log("Explanation received and queued for speaking");
      } catch (error) {
        console.error("Error getting explanation:", error);
        // Even if explanation fails, continue to next question
        loadQuestion();
      }
    });
  } else {
    // Default behavior (correct answer or timeout or not logged in)
    speak(feedbackText, loadQuestion);
  }
}

async function saveScore() {
  if (!scoreSaveStatus) return;
  scoreSaveStatus.textContent = "";
  if (!authToken) {
    scoreSaveStatus.textContent = "Sign in to save your score.";
    return;
  }

  try {
    // Use the displayed topic title or fallback to current topic
    const topicTitle =
      topicTitleElement.textContent ||
      (quizData[currentTopic] ? quizData[currentTopic].title : currentTopic);

    await apiRequest("/scores/", {
      method: "POST",
      body: JSON.stringify({
        topic: topicTitle,
        score,
        total_questions: questions.length,
      }),
    });
    scoreSaveStatus.textContent = "Score saved to your account.";
    await loadScoreHistory();
  } catch (error) {
    scoreSaveStatus.textContent = `Could not save score: ${error.message}`;
  }
}

function showResults() {
  stopSpeechAndRecognition();

  // Disable keyboard shortcuts
  if (quizKeyboardHandler) {
    document.removeEventListener("keydown", quizKeyboardHandler);
    quizKeyboardHandler = null;
  }

  showView("result-view");

  const totalQuestions = questions.length;
  finalScoreElement.textContent = `${score} out of ${totalQuestions}`;

  let finalFeedback;
  const percentage = (score / totalQuestions) * 100;

  if (percentage >= 80) {
    finalFeedback = "Excellent! You have a deep understanding of this topic.";
  } else if (percentage >= 50) {
    finalFeedback = "Good job! You've passed the quiz.";
  } else {
    finalFeedback =
      "Keep practicing! Review the material and try again to improve your score.";
  }

  feedbackElement.textContent = finalFeedback;

  speak(
    `Quiz finished. Your final score is ${score} out of ${totalQuestions}. ${finalFeedback} Say Start Quiz to play again, or say Logout to sign out.`,
    startListeningForResultCommand,
  );

  saveScore();
}

// --- Event Handlers (Combined) ---

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    clearAuth();
    showView("auth-view");
    startAuthVoiceFlow();
  });
}

if (logoutButtonResult) {
  logoutButtonResult.addEventListener("click", () => {
    clearAuth();
    showView("auth-view");
    startAuthVoiceFlow();
  });
}

if (startVoiceButton) {
  startVoiceButton.addEventListener("click", () => {
    showAuthError("");
    startAuthVoiceFlow();
  });
}

// --- Initialization ---

function initInstructionView() {
  showView("instruction-view");
  if (currentUser && userLabel) {
    userLabel.textContent = `Signed in as ${currentUser}`;
  }

  if (readyPromptElement) {
    readyPromptElement.textContent =
      'When you are ready, say "Start Quiz" to begin.';
  }

  if (isSpeechSynthSupported && isSpeechRecogSupported) {
    readInstructions();
  } else if (readyPromptElement) {
    readyPromptElement.textContent =
      "Voice features are required. Please use a supported browser like Chrome or Edge.";
  }
}

window.onload = async function () {
  console.log(
    "Page loaded. Speech support:",
    isSpeechSynthSupported,
    isSpeechRecogSupported,
  );

  // Preload categories for better performance
  loadCategories().catch((error) => {
    console.error("Error preloading categories:", error);
  });

  const hasUser = await loadCurrentUser();
  if (hasUser) {
    console.log("User already logged in");
    initInstructionView();
  } else {
    console.log("No user. Showing auth view");
    showView("auth-view");

    if (!isSpeechSynthSupported || !isSpeechRecogSupported) {
      if (authInstructionElement) {
        authInstructionElement.textContent =
          "Voice features are not supported in this browser. Please use Chrome or Edge.";
      }
      if (authErrorElement) {
        authErrorElement.textContent = "Voice not supported";
      }
    } else {
      if (authInstructionElement) {
        authInstructionElement.textContent =
          "Click Start Voice, then say 'Login' or 'Register'. You only need a username.";
      }
    }
  }
};
