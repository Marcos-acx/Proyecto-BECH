import { CartsManager } from "../Dao/models/mongodb.js"

export async function postController (req, res) {
    let cart
    try {
        cart = await CartsManager.create(req.body)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    res.status(201).json({message: 'Carrito creado correctamente', cart})
}

export async function postControllerPid (req, res) {
    const product = {
        'product': req.params.pid,
        'quantity': req.body.quantity
    }
    CartsManager.updateOne({ _id: req.params.cid }, { $push: { products: product } })

    res.status(200).json({
        message: 'Se ha agregado el producto exitosamente.'
    })
}