export class Cart {
    constructor(products, id = null) {
        this.products = products
        this.id = ""
        if (id !== null)
            this.id = id
    }

    getProducts() {
        return this.products
    }

    setId(cid) {
        this.id = cid
    }

    addProduct(product) {
        const existingProduct = this.products.find(p => p.product === product.product)
        console.log(this.products);
        if (existingProduct) {
            existingProduct.quantity += product.quantity
        } else {
            this.products.push(product)
            console.log(this.products);
        }
    }
    
}