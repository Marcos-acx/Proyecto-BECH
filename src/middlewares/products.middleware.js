import { ProductManager } from "../Dao/models/mongodb.js";

export async function checkPid(req, res, next) {
    const pid = req.params.pid
    try {
        await ProductManager.findById(pid)
    } catch (error) {
        res.status(404).json({
            message: 'No se ha encontrado un producto con ese id.'
        })
    }
    next()
}