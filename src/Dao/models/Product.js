import { Schema, model } from "mongoose";
import { randomUUID } from 'node:crypto'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products'

const productSchema = new Schema({
    _id: { type: String, default: randomUUID() },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, default: '/static/images/default_thumbnail.jpg' },
    status: { type: Boolean, default: true },
    category: { type: String, required: true },
    code: { type: Number, integer: true, min: 0, required: true, unique: true },
    stock: { type: Number, min: 0, integer: true, default: 1 }
}, {
    strict: 'throw',
    versionKey: false
})

productSchema.plugin(mongoosePaginate)

export const manager = model(productsCollection, productSchema)