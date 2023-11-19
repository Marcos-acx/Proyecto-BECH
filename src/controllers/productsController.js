import { Product } from "../Product.js"
import { ProductManager } from "../ProductManager.js"

const pm = new ProductManager('./db/productos.json')

export async function getController(req, res) {
    const limit = Number(req.query.limit)
    const products = await pm.getProducts(limit)
    if (!products.length) {
        res.send("<h1>No hay productos disponibles en este momnento.</h1>")
    } else {
        res.json(products)
    }
}

export async function getControllerPid(req, res) {
    const pid = Number(req.params.pid)
    try {
        const searchedProd = await pm.getProductById(pid)
        res.json(searchedProd)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export async function postController(req, res) {
    const product = new Product(
        req.body.id,
        req.body.title,
        req.body.description,
        req.body.thumbnail,
        req.body.price,
        req.body.category,
        req.body.code,
        req.body.stock
    )
    await pm.addProduct(product)
    res.status(200).json({
        message: 'Producto agregado correctamente.',
    })
}

export async function postControllerPid(req, res) {
    const product = req.body
    const existingProduct = pm.updateProduct(product)
     if (existingProduct) {
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
    const pid = Number(req.params.pid)
    const products = await pm.getProducts()
    if (products.some(prod => prod.id === pid)) {
        pm.deleteProduct(pid)
        res.status(200).json({
            message: 'Producto eliminado correctamente.'
        })
    } else {
        res.status(404).json({
            message: `No se ha encontrado el producto de id ${pid}.`
        })
    }
}