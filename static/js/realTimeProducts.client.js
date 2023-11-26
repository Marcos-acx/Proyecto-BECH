const updatedProducts = document.getElementById('ulProducts')

const socket = io()

if (updatedProducts) {
    socket.on('updateProducts',  async (products) => {
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
    })
}
console.log(updatedProducts);