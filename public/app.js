// Socket.IO connection
const socket = io();

// Whiteboard setup
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Send drawing data to server
    socket.emit('drawing', {
        x: e.offsetX,
        y: e.offsetY,
        lastX: lastX,
        lastY: lastY,
        roomId: currentRoomId
    });
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Room management
let currentRoomId = null;

document.getElementById('createRoomBtn').addEventListener('click', () => {
    const roomName = document.getElementById('roomName').value;
    if (roomName) {
        socket.emit('create-room', roomName);
    }
});

// Socket event handlers
socket.on('room-created', (roomId) => {
    currentRoomId = roomId;
    document.getElementById('studyRoom').style.display = 'grid';
    socket.emit('join-room', roomId);
});

socket.on('room-joined', (roomId) => {
    currentRoomId = roomId;
    document.getElementById('studyRoom').style.display = 'grid';
});

socket.on('drawing', (data) => {
    if (data.roomId === currentRoomId) {
        ctx.beginPath();
        ctx.moveTo(data.lastX, data.lastY);
        ctx.lineTo(data.x, data.y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
});

// Chat functionality
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const message = messageInput.value;
    if (message && currentRoomId) {
        socket.emit('chat-message', {
            roomId: currentRoomId,
            message: message
        });
        messageInput.value = '';
    }
});

socket.on('chat-message', (data) => {
    if (data.roomId === currentRoomId) {
        const messageElement = document.createElement('div');
        messageElement.textContent = data.message;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }
});

// Timer functionality
let timerInterval;
let timeLeft = 0;

function startTimer(minutes) {
    timeLeft = minutes * 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            socket.emit('timer-complete', currentRoomId);
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

socket.on('timer-start', (data) => {
    if (data.roomId === currentRoomId) {
        startTimer(data.minutes);
    }
});

socket.on('timer-complete', (roomId) => {
    if (roomId === currentRoomId) {
        alert('Timer completed!');
    }
});

// Whiteboard tools
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearWhiteboard = document.getElementById('clearWhiteboard');

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
});

brushSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});

clearWhiteboard.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentRoomId) {
        socket.emit('clear-whiteboard', currentRoomId);
    }
});

socket.on('clear-whiteboard', (roomId) => {
    if (roomId === currentRoomId) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Timer controls
const timerMinutes = document.getElementById('timerMinutes');
const startTimerBtn = document.getElementById('startTimer');

startTimerBtn.addEventListener('click', () => {
    const minutes = parseInt(timerMinutes.value);
    if (minutes > 0 && currentRoomId) {
        socket.emit('timer-start', {
            roomId: currentRoomId,
            minutes: minutes
        });
    }
}); 