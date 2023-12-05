import { ProductManager } from "../Dao/models/mongodb.js"
import { websocketServer } from "../main.js"

export async function getController(req, res) {
    const limit = Number(req.query.limit)
    const products = await ProductManager.find().limit(limit)
    if (!products.length) {
        res.send("<h1>No hay productos disponibles en este momento.</h1>")
    } else {
        res.json(products)
    }
}

export async function getControllerPid(req, res) {
    const pid = req.params.pid
    try {
        const searchedProd = await ProductManager.findById(pid)
        res.json(searchedProd)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export async function postController(req, res) {
    let product
    try {
        product = await ProductManager.create(req.body)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
    websocketServer.emit('updateProducts', await ProductManager.find())
    res.status(201).json({
        message: 'Producto agregado correctamente.',
        product
    })
}

export async function postControllerPid(req, res) {
    const product = req.body
    const existingProduct = await ProductManager.findByIdAndUpdate(product)
     if (existingProduct) {
        websocketServer.emit('updateProducts', await ProductManager.find())
        res.status(200).json({
            message: 'Producto actualizado correctamente.'
        })
     } else {
        res.status(404).json({
            message: `Producto de id ${product.id} no encontrado en la base de datos.`
        })
     }
}

export async function delController(req, res) {
    const pid = req.params.pid
    if (ProductManager.findById(pid)) {
        await ProductManager.deleteOne({_id: pid})
        websocketServer.emit('updateProducts', await ProductManager.find())
        res.status(200).json({
            message: `Producto ${pid} eliminado correctamente`
        })
    } else {
        res.status(404).json({
            message: `No se ha encontrado el producto de id ${pid}.`
        })
    }
}