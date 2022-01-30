const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  likeBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      autopopulate: true,
    },
  ],
  myOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      autopopulate: true,
    },
  ],
})
class User {
  async likeRestaurant(restaurant) {
    await this.likedRestaurant.push(restaurant)
    await restaurant.likedBy.push(this.name)

    await restaurant.save()
    await this.save()
  }

  async createOrder(order) {
    this.myOrders.push(order)

    await this.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)
