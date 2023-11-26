import { Cart } from "../services/Cart.js"
import { CartsManager } from "../services/CartsManager.js"


export function checkInstance(req, res, next) {
    const cart = req.body

    const atributosEsperados = ['id', 'products']
    const tieneMismosAtributos = atributosEsperados.every(attr => attr in cart)
    if (tieneMismosAtributos) {
        next()
    } else {
        res.status(400).json({
            message: 'Datos del carrito incompletos o incorrectos.'
        })
    }
}

export async function checkCid(req, res, next) {
    const cid = req.params.cid
    const cm = new CartsManager('./db/carts.json')
    try {
        const cart = await cm.getCartByCid(cid)
    } catch (error) {
        res.status(404).json({
            message: 'No se ha encontrado un carrito con ese id.'
        })
    }
    next()
}