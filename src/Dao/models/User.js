import { Schema, model } from "mongoose";
import { randomUUID } from 'node:crypto'
import { hashedAreEquals } from "../../utils/cryptography.js";
import { ADMIN_EMAIL } from "../../config.js";

const usersCollection = 'users'

const usersSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: randomUUID },
    nombre: { type: String, required: true },
    apellido: { type: String, default: '' }
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        login: async function (email, password) {
            const user = await model(usersCollection).findOne({ email }).lean()
            let userData
            if (!user) {
                throw new Error('login failed')
            } else if (!hashedAreEquals(password, user.password)) {
                throw new Error('login failed')
            } else {
            
                userData = {
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                }
            
                if (user.email === ADMIN_EMAIL) {
                    userData.rol = 'admin'
                } else {
                    userData.rol = 'user'
                }
            }
            return userData
        }
    }
})

export const manager = model(usersCollection, usersSchema)