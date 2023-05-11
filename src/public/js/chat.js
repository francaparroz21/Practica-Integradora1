const messages = document.getElementById("messages")
const messageForm = document.getElementById("message-form")
const inputMessage = document.getElementById("input-message")

const emailFormContainer = document.getElementById("container-email-form")
const emailForm = document.getElementById("email-form")
const inputEmail = document.getElementById("input-email")
const emailError = document.getElementById("error-email")

const socket = io()

emailForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const email = inputEmail.value

    if(email.trim().length <= 0) {
        emailError.style.display = "flex"
        emailError.innerHTML = `<i class="ph-warning-circle-bold"></i> Please type something`
    }
    else{
        emailError.style.display = "none"
        emailError.innerHTML = ""
        
        emailFormContainer.style.display = "none"
        
        socket.emit("email", email)

        inputMessage.focus()
    }
})

messageForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const email = inputEmail.value
    const message = inputMessage.value

    if(email.trim().length <= 0)return

    socket.emit("message", { email, message })

    inputMessage.value = ""
})

socket.on("load-messages", data => {
    messages.innerHTML = ""

    data.forEach(message => {
        messages.innerHTML += `
            <div class="message">
                <p class="message-username" style="${message.user === inputEmail.value && 'display: none'}">${message.user}</p>
                <span class="message-message">${message.message}</span>
            </div>
        `
    })
})

socket.on("user-connected", email => notification(`${email} joined to chat.`))

socket.on("new-message", data => {
    messages.innerHTML = ""

    data.forEach(message => {
        messages.innerHTML += `
            <div class="message ${message.user === inputEmail.value ? 'sender' : ''}">
            <p class="message-username" style="${message.user === inputEmail.value && 'display: none'}">${message.user}</p>
                <span class="message-message">${message.message}</span>
            </div>
        `
    })
})