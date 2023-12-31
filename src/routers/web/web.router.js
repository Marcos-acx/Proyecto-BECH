import express from "express";
import { Router } from "express";
import { ProductManager } from "../../Dao/models/mongodb.js"
import { onlyLogued } from '../../middlewares/authorization.js'
import passport from "passport";

export const webRouter = Router()

webRouter.use('/static', express.static('static'))

webRouter.get('/', async (req, res) => {
    if (req.user) {
        res.render('home.handlebars', {
            titulo: 'Home',
            hayProductos: await ProductManager.countDocuments() > 0,
            products: await ProductManager.find().lean(),
            ...req.user
        })
    } else {
        res.redirect('/login')
    }
})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts.handlebars', {
        titulo: 'Productos en tiempo real',
    })
})

webRouter.get('/chat', (req, res) => {
    res.render('chat.handlebars', {
        titulo: 'Chat'
    })
})


webRouter.get('/register', (req, res) => {
    res.render('register.handlebars', { title: 'Register'})
})

webRouter.get('/login', (req, res) => {
    res.render('login.handlebars', { title: 'Login'})
})

webRouter.get('/githublogin', passport.authenticate('loginGithub'))

webRouter.get('/githubcallback', passport.authenticate('loginGithub', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}))

webRouter.get('/profile', onlyLogued, (req, res) => {
    res.render('profile.handlebars', {
        title: 'Profile',
        ...req.user
    })
})

webRouter.get('/edit', (req, res) => {
    res.render('edit.handlebars'), { title: 'Editar datos' }
})
