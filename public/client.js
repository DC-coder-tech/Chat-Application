const socket = io()
let sentButton = document.querySelector('#send-button');
let usernameElement = document.querySelector('.username');
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');
let userName;
do {
    userName = prompt('Please enter your userName: ')
} while (!userName)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
sentButton.addEventListener('click', () => {
    sendMessage(textarea.value);
})

function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let classuserName = type
    mainDiv.classList.add(classuserName, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
usernameElement.textContent = `{${userName}}`;

