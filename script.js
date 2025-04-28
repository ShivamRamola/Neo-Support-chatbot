// DOM Elements
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const newChatButton = document.getElementById('new-chat-button');
const themeToggle = document.querySelector('.theme-toggle');
const languageSelect = document.getElementById('language-select');
const themeIcon = document.querySelector('.theme-icon');

// Language translations
const translations = {
    en: {
        welcome: "Hi there! How can I help you today?",
        inputPlaceholder: "Type your message...",
        send: "Send",
        newChat: "New Chat",
        help: "Help",
        footer: "© 2025 Neo Support | Help",
        botResponses: [
            "That's interesting. Tell me more about it.",
            "I see. How can I assist you with that?",
            "Thanks for sharing. Is there anything specific you'd like to know?",
            "I understand. What would you like to do next?",
            "That's a great question. Let me help you with that."
        ]
    },
    hi: {
        welcome: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?",
        inputPlaceholder: "अपना संदेश टाइप करें...",
        send: "भेजें",
        newChat: "नई चैट",
        help: "सहायता",
        footer: "© 2025 मिनिमलिस्ट चैटबॉट | सहायता",
        botResponses: [
            "यह दिलचस्प है। मुझे इसके बारे में और बताएं।",
            "मैं समझता हूँ। मैं आपकी इसमें कैसे सहायता कर सकता हूँ?",
            "साझा करने के लिए धन्यवाद। क्या कोई विशेष बात है जो आप जानना चाहते हैं?",
            "मैं समझता हूँ। आप आगे क्या करना चाहेंगे?",
            "यह एक अच्छा सवाल है। मुझे आपकी मदद करने दीजिए।"
        ]
    }
};

// Chat state
let currentLanguage = 'en';
let isDarkMode = false;
let isTyping = false;

/**
 * Applies the selected language to all UI elements
 * @param {string} lang - Language code ('en' or 'hi')
 */
function applyLanguage(lang) {
    currentLanguage = lang;
    
    // Update text elements
    document.getElementById('welcome-message').textContent = translations[lang].welcome;
    messageInput.placeholder = translations[lang].inputPlaceholder;
    sendButton.textContent = translations[lang].send;
    document.getElementById('new-chat-text').textContent = translations[lang].newChat;
    document.getElementById('help-link').textContent = translations[lang].help;
    
    // Update footer with help link
    document.getElementById('footer-text').innerHTML = 
        translations[lang].footer.replace('Help', 
            `<a href="#" id="help-link">${translations[lang].help}</a>`);
    
    // Update logo text based on language
    document.getElementById('logo-text').textContent = lang === 'en' ? 'Neo Support' : 'Neo Support';
}

/**
 * Toggles between light and dark mode
 */
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }
}

/**
 * Adds a new message to the chat
 * @param {string} text - Message text
 * @param {boolean} isUser - Whether the message is from the user
 */
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Shows the typing indicator
 */
function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('typing-dot');
        typingDiv.appendChild(dot);
    }
    
    chatContainer.appendChild(typingDiv);
    scrollToBottom();
}

/**
 * Hides the typing indicator
 */
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
        isTyping = false;
    }
}

/**
 * Simulates a bot response
 */
/**
 * Sends a user message and fetches a real bot response from backend
 */
async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        addMessage(messageText, true);
        messageInput.value = '';

        // Trigger backend call
        await botResponse(messageText);
    }
}

/**
 * Sends user's message to backend and gets the response
 * @param {string} userMessage - The user's message text
 */
async function botResponse(userMessage) {
    showTypingIndicator();

    try {
        const response = await fetch('http://localhost:5000/predict', {   // <== IMPORTANT: Adjust endpoint if different
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        hideTypingIndicator();

        // Show the actual bot response from server
        addMessage(data.response, false);    // assuming backend returns { "response": "..." }

    } catch (error) {
        hideTypingIndicator();
        console.error('Error:', error);
        addMessage("Sorry, couldn't connect to the server.", false);
    }
}

/**
 * Starts a new chat by clearing messages
 */
function startNewChat() {
    // Clear all messages except the welcome message
    while (chatContainer.children.length > 1) {
        chatContainer.removeChild(chatContainer.lastChild);
    }
    
    // Focus on input after clearing
    messageInput.focus();
}

/**
 * Scrolls chat container to the bottom
 */
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

newChatButton.addEventListener('click', startNewChat);

themeToggle.addEventListener('click', toggleDarkMode);

languageSelect.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
});

// Help link handler
document.addEventListener('click', (e) => {
    if (e.target.id === 'help-link') {
        e.preventDefault();
        alert('Help functionality would open here.');
    }
});

// Initialize the app
function initApp() {
    // Apply default language
    applyLanguage(currentLanguage);
    
    // Focus on input field
    messageInput.focus();
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);