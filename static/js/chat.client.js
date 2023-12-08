const chat = document.querySelector('#chat')

let socket

Swal.fire({
    title: "Ingrese su mail",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Entrar",
    allowOutsideClick: false
}).then((result) => {
    if (result.isConfirmed) {
        startChat(result.value)
    }
})

function startChat (user) {
    socket = io({
        auth: {user}
    })

    
    socket.on('newUser', newUser => {
        console.log(newUser);
        Swal.fire({
            text: 'Nuevo usuario: ' + newUser,
            toast: true,
            position: 'center-right'
        })
    })
    
    socket.on('userDisconnected', userDisconnected => {
        Swal.fire({
            text: userDisconnected + ' ha abandonado el chat.',
            toast: true,
            position: 'center-right'
        })
    })
    
    chat.querySelector("#chat-form").addEventListener('submit', event => {
        event.preventDefault()
        const message = chat.querySelector('input').value
        if (message) {
            socket.emit('message', message)
        }
    })

    
    socket.on('messages', messages => {
        console.log(messages);
        const divMessages = document.querySelector('#messages')
        
        divMessages.innerHTML = ``
        
        for (const message of messages) {
            const newMessage = document.createElement('p')
            if (message.user === user) {
                newMessage.innerText = `${message.message}`
                newMessage.className = 'my-message'
            } else {
                newMessage.innerText = `${message.user}: ${message.message}`
                newMessage.className = 'others-message'
            }
            divMessages.appendChild(newMessage)
        }
        chat.querySelector('input').value = ``
    })
}
function handleEnter(event) {
    if (event.keyCode === 13) {
        submitMessage(event)
    }
}

function submitMessage(event) {
    event.preventDefault()
    const message = chat.querySelector('input').value
    if (message) {
        socket.emit('message', message)
    }
}


