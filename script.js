const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
};

const socket = io('http://192.168.100.60:3000');

const usernameInput = document.getElementById('username');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');

const chat_message = () => {
    console.log(`${colors.green}${colors.bright}Sending message...${colors.reset}`);
    if (input.value && usernameInput.value) {
        socket.emit('chat_message', { username: usernameInput.value, message: input.value });
        input.value = '';
    }
};

socket.on('connect', () => {
    console.log(`${colors.green}${colors.bright}Connected to server.${colors.reset}`);
});

socket.on('disconnect', () => {
    console.log(`${colors.red}${colors.bright}Disconnected from server.${colors.reset}`);
});

socket.on('chat_message', (data) => {
    console.log(`${colors.bright}${data.username}: ${colors.reset}${data.message}`);
    const item = document.createElement('li');
    item.textContent = `${data.username}: ${data.message}`;
    messages.appendChild(item);
});

// Handle message_blocked event
socket.on('message_blocked', (data) => {
    console.log(`${colors.red}${colors.bright}Message blocked:${colors.reset} ${data.message}`);
    alert(data.message); // Display an alert with the blocked message
});

// Add event listener for Send button click
sendBtn.addEventListener('click', chat_message);

// Add event listener for Enter key press in input field
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        chat_message();
    }
});
