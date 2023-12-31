import { Router } from "express";
import { UserManager } from "../../Dao/models/mongodb.js";
import passport from "passport";

export const sessionsRouter = Router()

sessionsRouter.post('/sessions', 
    passport.authenticate('loginLocal', {
        failWithError: true
    }), 
    async (req, res, next) => {
        res.status(201).json({status: 'success', payload: req.user})
    }, (error, req, res, next) => {
        res.status(401).json({status: 'error', message: error.message})
    }
)

sessionsRouter.delete('/sessions/current', async (req, res) => {
    req.session.destroy(err => {
        res.status(204).json({status: 'success'})
    })
})