import express from "express";
import { Router } from "express";
import { ProductManager } from "../Dao/models/mongodb.js"

export const webRouter = Router()

webRouter.use('/static', express.static('static'))

webRouter.get('/', (req, res) => {
    res.render('home.handlebars', {
        titulo: 'Home',
        hayProductos: ProductManager.countDocuments() > 0,
        products
    })
})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts.handlebars', {
        titulo: 'Productos en tiempo real',
    })
})

