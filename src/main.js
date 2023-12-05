import express from 'express'
import handlebars from 'express-handlebars'
import { apiRouter } from './routers/api.router.js'
import { Server } from 'socket.io'
import { webRouter } from './routers/web.router.js'
import { ProductManager } from './Dao/models/mongodb.js'
import { PORT } from './config.js'

const app = express()
const products = ProductManager.find()

app.engine('handlebars', handlebars.engine())

const server = app.listen(PORT, () => {
    console.log('Conectado!');
})

export const websocketServer = new Server(server)

websocketServer.on('connection', async (socket) => {
    socket.emit('updateProducts', products)
})

app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('../static'))
app.use(express.json())
app.use(apiRouter)
app.use(webRouter)
