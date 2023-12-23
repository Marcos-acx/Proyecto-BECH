import { Router } from "express";
import { UserManager } from "../../Dao/models/mongodb.js";

export const usersRouter = Router()

usersRouter.post('/users', async (req, res) => {
    const userData = req.body
    try {
        const user = await UserManager.create(userData)
        res.status(201).json({ status: 'success', payload: user })
    } catch (error) {
    res.status(400).json({ status: 'error', message: error.message })
    }
})