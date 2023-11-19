import express from 'express'
import { productRouter } from './routers/productos.router.js'
import { cartsRouter } from './routers/carts.router.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(productRouter)
app.use(cartsRouter)


app.listen(PORT, () => {
    console.log('Conectado!');
})