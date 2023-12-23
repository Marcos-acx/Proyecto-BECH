import mongoose from "mongoose"
import { MONGODB_CNX_STRING } from "../../config.js"

await mongoose.connect(MONGODB_CNX_STRING)

export { manager as ProductManager } from './Product.js'
export { manager as CartsManager } from './Cart.js'
export { manager as MessageManager } from './Messages.js'
export { manager as UserManager } from './User.js'