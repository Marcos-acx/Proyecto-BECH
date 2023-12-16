import { CartsManager } from "../Dao/models/mongodb.js"

export async function getController (req, res) {
    const cid = req.params.cid
    const cart = await CartsManager.findOne({ _id: cid }).populate('products.product').lean()
    if (!cart) {
        return res.status(404).json({message: `Carrito de id: ${cid} no encontrado.`})
    }
    console.log(cart.products);
    res.render('cart.handlebars', {
        title: 'Carrito',
        hayProductos: cart.products.length > 0,
        products: cart.products
    })
}

export async function postController (req, res) {
    let cart
    try {
        cart = await CartsManager.create(req.body)
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.' })
    }
    res.status(201).json({message: 'Carrito creado correctamente', cart})
}

export async function postControllerPid (req, res) {
    const product = {
        'product': req.params.pid,
        'quantity': req.body.quantity
    }
    CartsManager.updateOne({ _id: req.params.cid }, { $push: { products: { product: product } } })

    res.status(200).json({
        message: 'Se ha agregado el producto exitosamente.'
    })
}

export async function delControllerPid (req, res) {
    const pid = req.params.pid
    const cid = req.params.cid
    let result

    try {
        result = await CartsManager.findByIdAndUpdate({ _id: cid }, 
            { $pull: { products: { product: pid } } },
            { new: true }
        )
        if (!result) {
            return res.status(404).json({ message: `No se ha encontrado el carrito de id: ${cid}.` })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' })
    }
    res.status(200).json({message: `Producto de id: ${pid} eliminado correctamente.`})
}

export async function delController (req, res) {
    const cid = req.params.cid
    let result

    try {
        result = await CartsManager.findByIdAndUpdate(cid, { $set: { products: [] } })
        if (!result) {
            return res.status(404).json({ message: `El carrito de id: ${cid} no se ha encontrado.` })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', message: error.message })
    }
    res.status(200).json({ message: `Se ha actualizado correctamente el carrito:`, result })
}

export async function putController (req, res) {
    const newProducts = req.body
    const cid = req.params.cid
    let result

    console.log(newProducts)

    try {
        result = await CartsManager.findByIdAndUpdate({ _id: cid }, 
            { $set: { products: newProducts } },
            { new: true }
        )
        if (!result) {
            return res.status(404).json({ message: `El carrito de id: ${cid} no se ha encontrado.` })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' })
    }

    res.status(200).json({ message: `Se ha actualizado correctamente el carrito:`, result })
}

export async function putControllerPid (req, res) {
    const pid = req.params.pid
    const cid = req.params.cid
    const quantity = req.body.quantity
    let result

    try {
        result = await CartsManager.updateOne(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': quantity } }
        ).exec()

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'No se encontró el documento o no se realizó ninguna modificación.' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' })
    }

    res.status(200).json({ message: `Producto de id: ${pid} actualizado correctamente.` })
}