import { Cart } from "../Cart.js"
import { CartsManager } from "../CartsManager.js"
import { ProductManager } from "../ProductManager.js"

const cm = new CartsManager()
export async function postController (req, res) {
    const cart = new Cart(req.body.products, req.body.id)
    const cartAdded = await cm.addCart(cart)
    if (cartAdded) {
        res.status(200).json({
            message: 'Carrito agregado correctamente.'
        })
    } else {
        res.json({
            message: 'Error al agregar el carrito.'
        })
    }
}

export async function postControllerPid (req, res) {
    const pm = new ProductManager('./db/productos.json')
    const searchedCart = await cm.getCartByCid(req.params.cid)
    const cart = new Cart(searchedCart.products, searchedCart.id)
    const searchedProd = await pm.getProductById(Number(req.params.pid))

    const product = {
        'product': searchedProd.id,
        'quantity': req.body.quantity
    }
    console.log(searchedCart);
    cart.addProduct(product)
    await cm.updateCart(cart)

    res.status(200).json({
        message: 'Se ha agregado el producto exitosamente.'
    })
}