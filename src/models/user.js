class User {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.likedRestaurant = []
    this.myOrders = []
  }

  likeRestaurant(restaurant) {
    this.likedRestaurant.push(restaurant)
    restaurant.likedBy.push(this.name)
  }

  createOrder(order) {
    this.myOrders.push(order)
  }
}

module.exports = User
