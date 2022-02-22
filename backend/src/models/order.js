const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        autopopulate: { maxDepth: 5 },
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
})

class Order {
  async addProduct(product, quantity = 1) {
    const currentItem = this.orderItems.find(orderItem => orderItem.item.id == product.id)
    if (currentItem) {
      currentItem.quantity += quantity
    } else {
      this.orderItems.push({ item: product, quantity })
    }

    await this.save()
  }

  async calculateAmount() {
    this.amount = 0
    for (let i = 0; i < this.orderItems.length; i += 1) {
      this.amount += this.orderItems[i].item.price * this.orderItems[i].quantity
    }
    await this.save()
  }
}

orderSchema.loadClass(Order)
orderSchema.plugin(autopopulate)
module.exports = mongoose.model('Order', orderSchema)
