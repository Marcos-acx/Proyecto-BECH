import { Product } from "../Product.js";
import { ProductManager } from "../ProductManager.js";

export function checkInstance(req, res, next) {
    const product = req.body

    const atributosEsperados = ['title', 'description', 'price', 'thumbnail',
            'status', 'category', 'code', 'stock', "id"
        ]
    const tieneMismosAtributos = atributosEsperados.every(attr => attr in product)
    if (tieneMismosAtributos) {
        next()
    } else {
        res.status(400).json({
            message: 'Datos del producto incompletos o incorrectos.'
        })
    }
}

export function checkPid(req, res, next) {
    const pid = Number(req.params.pid)
    const pm = new ProductManager('./db/productos.json')
    try {
        pm.getProductById(pid)
    } catch (error) {
        res.status(404).json({
            message: 'No se ha encontrado un producto con ese id.'
        })
    }
    next()
}