import { Schema, model } from "mongoose"
import { randomUUID } from 'node:crypto'

const cartSchema = new Schema({
    _id: { type: String, default: randomUUID() },
    products: {
        type: [{
            product: { type: String, required: true },
            quantity: { type: Number, integer: true, default: 1 }
        }], default: []}
}, {
    strict: 'throw',
    versionKey: false
})

export const manager = model('cart', cartSchema)