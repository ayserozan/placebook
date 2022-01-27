// const res = require('express/lib/response')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Menu = require('./menu')

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  likedBy: [],
  menus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      autopopulate: true,
    },
  ],
})
class Restaurant {
  async createMenu(menuName) {
    const menu = await Menu.create({ name: menuName })
    await this.menus.push(menu)

    await this.save()
  }
}

restaurantSchema.loadClass(Restaurant)
restaurantSchema.plugin(autopopulate)
module.exports = mongoose.model('Restaurant', restaurantSchema)
