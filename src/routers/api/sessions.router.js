import { Router } from "express";
import { UserManager } from "../../Dao/models/mongodb.js";
import { ADMIN_EMAIL } from "../../config.js";

export const sessionsRouter = Router()

sessionsRouter.post('/sessions', async (req, res) => {
    const user = await UserManager.findOne(req.body)
    if (!user) {
        return res.status(401).json({ status: 'error', message: 'login failed' })
    } else {
        req.session['user'] = {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
        }

        if (user.email === ADMIN_EMAIL) {
            req.session['user'].rol = 'admin'
        } else {
            req.session['user'].rol = 'user'
        }
    }
    res.status(201).json({status: 'success', pauload: req.session['user']})
})

sessionsRouter.delete('/sessions/current', async (req, res) => {
    req.session.destroy(err => {
        res.status(204).json({status: 'success'})
    })
})