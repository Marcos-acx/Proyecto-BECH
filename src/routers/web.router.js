import express from "express";
import { Router } from "express";
import { ProductManager } from "../services/ProductManager.js";

export const webRouter = Router()

webRouter.use('/static', express.static('static'))

const pm = new ProductManager('./db/productos.json')

const products = await pm.getProducts()

webRouter.get('/', (req, res) => {
    res.render('home.handlebars', {
        titulo: 'Home',
        hayProductos: products.length > 0,
        products
    })
})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts.handlebars', {
        titulo: 'Productos en tiempo real',
    })
})

