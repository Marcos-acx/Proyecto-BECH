import express from 'express'
import handlebars from 'express-handlebars'
import { apiRouter } from './routers/api.router.js'
import { Server } from 'socket.io'
import { webRouter } from './routers/web.router.js'
import { MessageManager, ProductManager } from './Dao/models/mongodb.js'
import { PORT } from './config.js'

const app = express()
const products = await ProductManager.find().lean()

app.engine('handlebars', handlebars.engine())

const server = app.listen(PORT,() => {
    console.log('Conectado!');
})

export const websocketServer = new Server(server)

websocketServer.on('connection', async (socket) => {
    socket.emit('updateProducts', products)
    socket.broadcast.emit('newUser', socket.handshake.auth.user)
    websocketServer.emit('messages', await MessageManager.find().lean())

    socket.on('message', async message => {
        await MessageManager.create({message: message,
            user: socket.handshake.auth.user
        })
        websocketServer.emit('messages', await MessageManager.find().lean())
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', socket.handshake.auth.user)
    })
})

app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('../static'))
app.use(express.json())
app.use(apiRouter)
app.use(webRouter)
