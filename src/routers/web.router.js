import express from "express";
import { Router } from "express";
import { ProductManager } from "../Dao/models/mongodb.js"

export const webRouter = Router()

webRouter.use('/static', express.static('static'))

webRouter.get('/', async (req, res) => {
    res.render('home.handlebars', {
        titulo: 'Home',
        hayProductos: await ProductManager.countDocuments() > 0,
        products: await ProductManager.find().lean()
    })
})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts.handlebars', {
        titulo: 'Productos en tiempo real',
    })
})

webRouter.get('/chat', (req, res) => {
    res.render('chat.handlebars', {
        titulo: 'Chat'
    })
})

