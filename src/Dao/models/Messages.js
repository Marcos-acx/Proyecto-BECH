import { Schema, model } from "mongoose"

const messagesSchemna = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false
})

export const manager = model('message', messagesSchemna)