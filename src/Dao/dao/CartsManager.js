import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import { existsSync } from 'fs'

const PATH = './db/carts.json'

export class CartsManager {
    constructor() {}

    async getCarts() {
        try {
            if (existsSync(PATH)) {
                const carts = JSON.parse(await fs.readFile(PATH, 'utf-8'))
                return carts
            } else {
                return []
            }
        } catch (error) {
            return []
        }
    }

    async addCart(cart) {
        console.log(typeof cart);
        try {
            const carts = await this.getCarts()
            const cid = randomUUID()
            cart.setId(cid)
            carts.push(cart)

            await fs.writeFile(PATH, JSON.stringify(carts, null, 2))
        } catch (error) {
            console.log(`Error en addCart: ${error}`)
            return false
        }
        return true
    }

    async updateCart(cart) {
        const outdatedCart = await this.getCartByCid(cart.id) 
        if (outdatedCart) {
            const carts = await this.getCarts()
            const index = carts.findIndex(c => c.id === outdatedCart.id)
            carts[index] = cart
            await fs.writeFile(PATH, JSON.stringify(carts, null, 2))
            
            return true
        } else {
            return false
        }
    }

    async getCartByCid(cid) {
        const carts = await this.getCarts()
        const searchedCart = carts.find(c => c.id === cid)
        if (searchedCart) {
            return searchedCart
        } else {
            return
        }
    }
}