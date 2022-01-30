class Orderitem{
    constructor(product, quantitiy = 1) {
        //this.orderId = orderId
        this.product = product
        this.quantitiy = quantitiy
    }

    get amount(){
        return this.product.price * this.quantitiy
    }
}

module.exports = Orderitem