export class Product {
    constructor(id = null, title, description, thumbnail, price, category, code, stock) {
        this.id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.status = true
        this.category = category
        this.code = code
        this.stock = stock
        if (id !== null) {
            this.id = id
        }
    }

    setId(id) {
        this.id = id
    }
}