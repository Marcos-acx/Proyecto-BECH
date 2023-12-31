import { Router } from "express";
import { UserManager } from "../../Dao/models/mongodb.js";
import { hashing } from "../../utils/cryptography.js";

export const usersRouter = Router()

usersRouter.post('/users', async (req, res) => {
    const userData = req.body
    try {
        userData.password = hashing(userData.password)
        
        const user = await UserManager.create(userData)

        req.login(user.toObject(), err => {
            if (err)
                res.status(401).json({ status: 'error', message: err.message })
            else {
                res.status(201).json({ status: 'succes', payload: user.toObject() })
            }
        })
    } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
    }
})

usersRouter.put('/users', async (req, res) => {
    try {

        if (req.body.password)
            req.body.password = hashing(req.body.password)

        const updated = await UserManager.updateOne(
            { $set: {
                password: req.body.password,
                nombre: req.body.nombre,
                apellido: req.body.apellido
            }}
        )

        if (!updated) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado.' })
        }

        res.status(200).json({ status: 'success', payload: updated })
    } catch (error) {
        return res.status(404).json({ status: 'error', message: error.message })
    }
})