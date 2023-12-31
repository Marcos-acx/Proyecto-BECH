export function onlyLogued(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}