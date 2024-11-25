const socket = io();

const usernameContainer = document.getElementById('usernameContainer');
const usernameInput = document.getElementById('usernameInput');
const startChatButton = document.getElementById('startChatButton');

const chatContainer = document.getElementById('chatContainer');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let username = null;

// Set username and start chat
startChatButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit('set_username', username); // Send username to server
        usernameContainer.classList.add('hidden');
        chatContainer.classList.remove('hidden');
    }
});

// Send messages
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', message); // Send message to server
        addMessage(`You: ${message}`); // Show message locally
        messageInput.value = ''; // Clear input field
    }
});

// Handle incoming messages
socket.on('message', (data) => {
    addMessage(`${data.username}: ${data.message}`); // Display received message
});

// Helper function to add a message to the chat box
function addMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the latest message
}
