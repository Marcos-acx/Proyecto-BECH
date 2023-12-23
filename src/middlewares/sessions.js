import session from "express-session";
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STRING, SESSION_SECRET } from "../config.js";

const store = connectMongo.create({
    mongoUrl: MONGODB_CNX_STRING,
    ttl: 60 * 60 * 24
})

export const sessions = session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})