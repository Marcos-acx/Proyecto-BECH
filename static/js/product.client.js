const buttonCart = document.querySelector('#añadirCarrito')
const socket = io()

function añadirCarrito(id) {
    socket.emit('añadirCarrito', id)
}