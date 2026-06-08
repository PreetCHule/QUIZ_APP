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
        question:
          "What is the primary function of chlorophyll in a plant?",
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
        options: [
          "A. Julius Caesar",
          "B. Augustus",
          "C. Nero",
          "D. Caligula",
        ],
        answer: "B",
      },
      {
        question: "In which year did the Titanic sink?",
        options: ["A. 1905", "B. 1912", "C. 1918", "D. 1923"],
        answer: "B",
      },
      {
        question:
          "Which ancient civilization built the pyramids of Giza?",
        options: [
          "A. Mesopotamian",
          "B. Greek",
          "C. Egyptian",
          "D. Roman",
        ],
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
        options: [
          "A. Sydney",
          "B. Melbourne",
          "C. Canberra",
          "D. Brisbane",
        ],
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
        question:
          "What is the name of the whale in Herman Melville's novel?",
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
const readyPromptElement = document.querySelector("#instruction-view .ready-prompt");
const topicPromptElement = document.querySelector("#topic-selection-view .topic-prompt");
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

// --- Global State ---
let currentTopic = "";
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 25; // Time limit for each question in seconds
let timer;

const API_BASE = "http://127.0.0.1:8001/api";
let authToken = localStorage.getItem("qt_token");
let currentUser = localStorage.getItem("qt_user") || "";

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

console.log("Speech synthesis supported:", isSpeechSynthSupported);
console.log("Speech recognition supported:", isSpeechRecogSupported);

if (isSpeechRecogSupported) {
  try {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    console.log("Speech recognition initialized successfully");
  } catch (e) {
    console.error("Failed to initialize speech recognition:", e);
    recognition = null;
  }
}

// --- View Management ---

function showView(viewId) {
  // Hide all views
  const views = document.querySelectorAll(".view");
  views.forEach((view) => view.classList.remove("active"));
  views.forEach((view) => (view.style.display = "none"));

  // Show the selected view
  const targetView = document.getElementById(viewId);
  targetView.style.display = "block";
  targetView.classList.add("active");
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
      authInstructionElement.textContent = "Voice features are not supported in this browser. Please use Chrome or Edge.";
    }
    return;
  }
  console.log("Starting auth voice prompt...");
  speak(
    'Welcome to Quiz Talk. Say "Login" to sign in, or "Register" to create a new account. You only need a username.',
    startListeningForAuthCommand
  );
}

function resetRecognition() {
  if (!isSpeechRecogSupported || !recognition) return;
  if (listeningTimeout) {
    clearTimeout(listeningTimeout);
    listeningTimeout = null;
  }
  try {
    recognition.stop();
  } catch (e) {
    // no-op
  }
}

function startAuthVoiceFlow() {
  if (!isSpeechSynthSupported || !isSpeechRecogSupported) {
    if (authInstructionElement) {
      authInstructionElement.textContent = "Voice features are not supported in this browser. Please use Chrome or Edge.";
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
        showAuthError("Microphone permission blocked. Please allow mic access and press Start Voice.");
        setVoiceStatus("Microphone blocked.");
        return;
      }
      if (error.name === "NotFoundError" || error.name === "OverconstrainedError") {
        showAuthError("No microphone found. Please connect a microphone and press Start Voice.");
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
    showAuthError("Voice input is not supported in this browser. Please use Chrome or Edge.");
    return;
  }

  if (authInstructionElement) {
    authInstructionElement.textContent = "Listening... Say 'Login' or 'Register'.";
  }

  console.log("Listening for login/register command...");
  let hasResult = false;
  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onend = null;
  recognition.onnomatch = null;

  recognition.onresult = function (event) {
    hasResult = true;
    if (listeningTimeout) clearTimeout(listeningTimeout);
    const cmd = event.results[0][0].transcript.toLowerCase();
    console.log("Heard:", cmd);
    if (cmd.includes("login")) {
      authMode = "login";
      speak("Please say your username.", startListeningForAuthUsername);
    } else if (cmd.includes("register")) {
      authMode = "register";
      speak("Please say your desired username.", startListeningForAuthUsername);
    } else {
      speak('Sorry, please say "Login" or "Register".');
      setTimeout(startListeningForAuthCommand, 500);
    }
  };

  recognition.onnomatch = function () {
    hasResult = false;
  };

  recognition.onend = function () {
    if (!hasResult) {
      setTimeout(startListeningForAuthCommand, 500);
    }
  };

  recognition.onerror = function (event) {
    console.error("Recognition error:", event.error);
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
      showAuthError("Microphone permission blocked. Please allow mic access and press Start Voice.");
      return;
    }
    if (event.error === "audio-capture") {
      showAuthError("No microphone found. Please connect a microphone and press Start Voice.");
      return;
    }
    if (event.error === "network") {
      showAuthError("Speech service unavailable (network error). Please use Chrome or Edge, or enable speech services in your browser.");
      setVoiceStatus("Speech service unavailable.");
      resetRecognition();
      return;
    }
    speak("I didn't hear you. Please say Login or Register.", () => {
      setTimeout(startListeningForAuthCommand, 500);
    });
  };

  try {
    resetRecognition();
    recognition.start();
    setVoiceStatus("Listening for Login or Register...");
    listeningTimeout = setTimeout(() => {
      console.log("Listening timeout for auth command");
      resetRecognition();
      speak("I didn't hear anything. Please say Login or Register.", () => {
        setTimeout(startListeningForAuthCommand, 500);
      });
    }, LISTENING_TIMEOUT);
  } catch (e) {
    console.error("Error starting recognition:", e);
    if (e.name === "InvalidStateError") {
      setTimeout(startListeningForAuthCommand, 300);
      return;
    }
  }
}

function startListeningForAuthUsername() {
  if (!isSpeechRecogSupported || !recognition) return;

  if (authInstructionElement) {
    authInstructionElement.textContent = "Listening... Say your username.";
  }

  let hasResult = false;
  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onend = null;
  recognition.onnomatch = null;

  recognition.onresult = function (event) {
    hasResult = true;
    if (listeningTimeout) clearTimeout(listeningTimeout);
    authUsername = event.results[0][0].transcript.toLowerCase().trim();
    performAuth();
  };

  recognition.onnomatch = function () {
    hasResult = false;
  };

  recognition.onend = function () {
    if (!hasResult) {
      setTimeout(startListeningForAuthUsername, 500);
    }
  };

  recognition.onerror = function (event) {
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
      showAuthError("Microphone permission blocked. Please allow mic access and press Start Voice.");
      return;
    }
    if (event.error === "audio-capture") {
      showAuthError("No microphone found. Please connect a microphone and press Start Voice.");
      return;
    }
    if (event.error === "network") {
      showAuthError("Speech service unavailable (network error). Please use Chrome or Edge, or enable speech services in your browser.");
      setVoiceStatus("Speech service unavailable.");
      resetRecognition();
      return;
    }
    speak("I did not hear that. Please say your username again.", () => {
      setTimeout(startListeningForAuthUsername, 500);
    });
  };

  try {
    resetRecognition();
    recognition.start();
    setVoiceStatus("Listening for username...");
    listeningTimeout = setTimeout(() => {
      console.log("Listening timeout for username");
      resetRecognition();
      speak("I didn't hear your username. Please say your username clearly.", () => {
        setTimeout(startListeningForAuthUsername, 500);
      });
    }, LISTENING_TIMEOUT);
  } catch (e) {
    if (e.name === "InvalidStateError") {
      setTimeout(startListeningForAuthUsername, 300);
      return;
    }
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
      initInstructionView
    );
  } catch (error) {
    showAuthError(error.message);
    speak(`${error.message} Please say Login or Register.`);
    authMode = null;
    authUsername = "";
    setTimeout(startListeningForAuthCommand, 500);
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
    scoreHistoryContainer.innerHTML = "<h3>My Recent Scores</h3><p>No scores yet.</p>";
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

  if (callback) {
    utterance.onend = callback;
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
  clearTimeout(timer);
}

// --- Instructions View Logic ---

function readInstructions() {
  if (isSpeechRecogSupported && recognition) recognition.stop();
  speak(getFullInstructionsText(), startListeningForStartCommand);
}

function readTopicInstructions() {
  if (isSpeechRecogSupported && recognition) recognition.stop();
  const topics = Array.from(topicListElement.children)
    .map((li) => li.textContent.trim())
    .join(". ");
  const text = `The available topics are: ${topics}. ${topicPromptElement.textContent}`;
  speak(text, startListeningForTopicCommand);
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
    recognition.start();
    listeningTimeout = setTimeout(() => {
      console.log("Listening timeout for start command");
      resetRecognition();
      speak("I didn't hear you. Please say Start Quiz to begin.", () => {
        setTimeout(startListeningForStartCommand, 500);
      });
    }, LISTENING_TIMEOUT);
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

    if (cmd.includes("logout") || cmd.includes("log out") || cmd.includes("sign out")) {
      clearAuth();
      showView("auth-view");
      startAuthVoiceFlow();
      return;
    }

    if (cmd.includes("start quiz") || cmd.includes("begin") || cmd.includes("play again")) {
      showTopicSelection();
      return;
    }

    speak("Please say Start Quiz to play again, or say Logout to sign out.", () => {
      setTimeout(startListeningForResultCommand, 500);
    });
  };

  recognition.onerror = function (event) {
    if (event.error !== "no-speech") {
      setTimeout(startListeningForResultCommand, 500);
    }
  };

  try {
    recognition.start();
    listeningTimeout = setTimeout(() => {
      console.log("Listening timeout for result command");
      resetRecognition();
      speak("I didn't hear you. Say Start Quiz to play again, or say Logout to sign out.", () => {
        setTimeout(startListeningForResultCommand, 500);
      });
    }, LISTENING_TIMEOUT);
  } catch (e) {
    if (e.name !== "InvalidStateError") {
    }
  }
}

function startListeningForTopicCommand() {
  if (!isSpeechRecogSupported || !recognition) return;

  recognition.onresult = null;
  recognition.onerror = null;

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);
    currentCommand = event.results[0][0].transcript.toLowerCase();
    handleTopicSelection(currentCommand);
  };

  recognition.onerror = function (event) {
    speak(
      "I had trouble understanding. Please say the topic name or number again."
    );
    setTimeout(startListeningForTopicCommand, 500);
  };

  try {
    recognition.start();
    listeningTimeout = setTimeout(() => {
      console.log("Listening timeout for topic command");
      resetRecognition();
      speak("I didn't hear a topic. Please say the topic number or name.", () => {
        setTimeout(startListeningForTopicCommand, 500);
      });
    }, LISTENING_TIMEOUT);
  } catch (e) {
    if (e.name !== "InvalidStateError") {
    }
  }
}

function handleTopicSelection(command) {
  if (!command) {
    speak(
      "I couldn't hear a topic. Please say the topic name or number clearly."
    );
    setTimeout(startListeningForTopicCommand, 500);
    return;
  }

  const normalized = command.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const topics = {
    1: "science",
    one: "science",
    first: "science",
    science: "science",
    2: "history",
    two: "history",
    second: "history",
    "world history": "history",
    history: "history",
    3: "geography",
    three: "geography",
    third: "geography",
    "geography facts": "geography",
    4: "literature",
    four: "literature",
    fourth: "literature",
    "classic literature": "literature",
  };

  let selectedTopic = null;

  for (const key in topics) {
    if (normalized.includes(String(key))) {
      selectedTopic = topics[key];
      break;
    }
  }

  if (selectedTopic) {
    recognition.stop();
    // Instead of navigating to quiz.html, we call the in-page initQuiz
    speak(`You selected ${selectedTopic}. Starting the quiz now!`, () => {
      initQuiz(selectedTopic);
    });
  } else {
    speak(
      "I couldn't match that to a topic. Please say the topic name or number clearly."
    );
    setTimeout(startListeningForTopicCommand, 500);
  }
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
    speak(`You selected ${topic}. Starting the quiz now!`, () => {
      initQuiz(topic);
    });
  });
}

// Function to transition from Instructions to Topic Selection
function showTopicSelection() {
  if (isSpeechRecogSupported && recognition) {
    recognition.stop();
  }
  showView("topic-selection-view");
  readTopicInstructions();
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

function initQuiz(topic) {
  // 1. Setup initial state
  currentTopic = topic;
  questions = quizData[currentTopic].questions;
  topicTitleElement.textContent = quizData[currentTopic].title;
  currentQuestionIndex = 0;
  score = 0;
  scoreTextElement.textContent = `Score: ${score}`;

  // 2. Start the quiz
  showView("quiz-view");
  
  // Enable keyboard shortcuts
  if (quizKeyboardHandler) {
    document.removeEventListener('keydown', quizKeyboardHandler);
  }
  quizKeyboardHandler = (e) => {
    const key = e.key.toLowerCase();
    if (['a', 'b', 'c', 'd'].includes(key)) {
      resetRecognition();
      handleAnswer(key);
    }
  };
  document.addEventListener('keydown', quizKeyboardHandler);
  
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
      const letter = ['A', 'B', 'C', 'D'][idx];
      return `<li data-answer="${letter}" style="cursor: pointer; transition: background 0.2s;" 
                  onmouseover="this.style.background='#e3f2fd'" 
                  onmouseout="this.style.background='#fcfcfc'">${opt}</li>`;
    })
    .join("");

  const questionText = `Question ${currentQuestionIndex + 1}. ${
    q.question
  }. The options are: ${q.options.join(". ")}`;

  // Add click handlers to options
  const optionItems = optionsList.querySelectorAll('li');
  optionItems.forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.getAttribute('data-answer');
      if (answer) {
        resetRecognition();
        handleAnswer(answer.toLowerCase());
      }
    });
  });

  startTimer();
  speak(questionText, startListeningForAnswer);
}

function startTimer() {
  let timeLeft = timeLimit;
  timerElement.textContent = `Time left: ${timeLeft}s`;

  timer = setTimeout(function tick() {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      handleAnswer(null); // Time's up, null answer
    } else {
      timer = setTimeout(tick, 1000);
    }
  }, 1000);
}

function startListeningForAnswer() {
  if (!isSpeechRecogSupported || !recognition) return;

  recognition.onresult = function (event) {
    if (listeningTimeout) clearTimeout(listeningTimeout);
    const transcript = event.results[0][0].transcript.toLowerCase();
    handleAnswer(transcript);
  };

  recognition.onerror = function (event) {
    if (event.error !== "no-speech" && event.error !== "audio-capture") {
      speak("Pardon? Please say A, B, C, or D.", () => {
        if (timer) setTimeout(startListeningForAnswer, 500);
      });
    }
  };

  try {
    recognition.start();
    listeningTimeout = setTimeout(() => {
      console.log("Listening timeout for answer");
      resetRecognition();
      speak("I didn't hear your answer. Please say A, B, C, or D.", () => {
        if (timer) setTimeout(startListeningForAnswer, 500);
      });
    }, LISTENING_TIMEOUT);
  } catch (e) {
    if (e.name !== "InvalidStateError") {
    }
  }
}

function handleAnswer(spokenCommand) {
  stopSpeechAndRecognition();

  const q = questions[currentQuestionIndex];
  const canonicalAnswer = {
    a: "A",
    b: "B",
    c: "C",
    d: "D",
    "option a": "A",
    "option b": "B",
    "option c": "C",
    "option d": "D",
    "ay": "A",
    "be": "B",
    "bee": "B",
    "see": "C",
    "sea": "C",
    "dee": "D",
  };

  let userChoice = null;

  if (spokenCommand) {
    const normalized = spokenCommand.toLowerCase().trim();
    for (const key in canonicalAnswer) {
      if (normalized.includes(key) || normalized === key) {
        userChoice = canonicalAnswer[key];
        break;
      }
    }
  }

  let feedbackText;
  if (userChoice === q.answer) {
    score++;
    feedbackText = `Correct! Your answer, ${userChoice}, is right.`;
  } else if (spokenCommand !== null) {
    feedbackText = `Incorrect. The correct answer was ${q.answer}.`;
  } else {
    feedbackText = `Time's up! The correct answer was ${q.answer}.`;
  }

  scoreTextElement.textContent = `Score: ${score}`;
  currentQuestionIndex++;
  speak(feedbackText, loadQuestion);
}

async function saveScore() {
  if (!scoreSaveStatus) return;
  scoreSaveStatus.textContent = "";
  if (!authToken) {
    scoreSaveStatus.textContent = "Sign in to save your score.";
    return;
  }

  try {
    await apiRequest("/scores/", {
      method: "POST",
      body: JSON.stringify({
        topic: quizData[currentTopic].title || currentTopic,
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
    document.removeEventListener('keydown', quizKeyboardHandler);
    quizKeyboardHandler = null;
  }
  
  showView("result-view");

  const totalQuestions = questions.length;
  finalScoreElement.textContent = `${score} out of ${totalQuestions}`;

  let finalFeedback;
  const percentage = (score / totalQuestions) * 100;

  if (percentage >= 80) {
    finalFeedback =
      "Excellent! You have a deep understanding of this topic.";
  } else if (percentage >= 50) {
    finalFeedback = "Good job! You've passed the quiz.";
  } else {
    finalFeedback =
      "Keep practicing! Review the material and try again to improve your score.";
  }

  feedbackElement.textContent = finalFeedback;

  speak(
    `Quiz finished. Your final score is ${score} out of ${totalQuestions}. ${finalFeedback} Say Start Quiz to play again, or say Logout to sign out.`,
    startListeningForResultCommand
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
    readyPromptElement.textContent = 'When you are ready, say "Start Quiz" to begin.';
  }

  if (isSpeechSynthSupported && isSpeechRecogSupported) {
    readInstructions();
  } else if (readyPromptElement) {
    readyPromptElement.textContent =
      "Voice features are required. Please use a supported browser like Chrome or Edge.";
  }
}

window.onload = async function () {
  console.log("Page loaded. Speech support:", isSpeechSynthSupported, isSpeechRecogSupported);
  
  const hasUser = await loadCurrentUser();
  if (hasUser) {
    console.log("User already logged in");
    initInstructionView();
  } else {
    console.log("No user. Showing auth view");
    showView("auth-view");
    
    if (!isSpeechSynthSupported || !isSpeechRecogSupported) {
      if (authInstructionElement) {
        authInstructionElement.textContent = "Voice features are not supported in this browser. Please use Chrome or Edge.";
      }
      if (authErrorElement) {
        authErrorElement.textContent = "Voice not supported";
      }
    } else {
      if (authInstructionElement) {
        authInstructionElement.textContent = "Click Start Voice, then say 'Login' or 'Register'. You only need a username.";
      }
    }
  }
};
