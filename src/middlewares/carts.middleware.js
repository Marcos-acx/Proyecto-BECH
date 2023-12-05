import { CartsManager } from "../Dao/models/mongodb.js"

export async function checkCid(req, res, next) {
    const cid = req.params.cid
    try {
        await CartsManager.findById(cid)
    } catch (error) {
        res.status(404).json({
            message: 'No se ha encontrado un carrito con ese id.'
        })
    }
    next()
}