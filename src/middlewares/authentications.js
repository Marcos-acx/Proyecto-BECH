import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { UserManager } from "../Dao/models/mongodb.js";
import { GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../config.js";

const passportConfig = {
    usernameField: 'email'
}

async function verificationCallback(username, password, done) {
    try {
        const userData = await UserManager.login(username, password)
        done(null, userData)
    } catch (error) {
        done(error)
    }
}

const loginLocal = new LocalStrategy(passportConfig, verificationCallback)

passport.use('loginLocal', loginLocal)
passport.use('loginGithub', new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
}, async (_, __, profile, done) => {
    let user = await UserManager.findOne({email: profile.username})
    if (!user) {
        user = await UserManager.create({
            nombre: profile.displayName,
            apellido: '',
            email: profile.username,
            password: ''
        })
    }
    done(null, user.toObject())
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()