const updatedProducts = document.getElementById('ulProducts')

const socket = io({transports: ['websocket']})

function listarProductos (products) {
    updatedProducts.innerHTML = ``
    for (const p of products) {
        const ulProd = document.createElement('ul')
        Object.entries(p).forEach(([nombre, valor]) => {
            const li = document.createElement('li')
            li.innerText = `${nombre}: ${valor}`
            ulProd.appendChild(li)
        })
        updatedProducts.appendChild(ulProd)
    }
}

if (updatedProducts) {
    socket.on('updateProducts', listarProductos)
}
