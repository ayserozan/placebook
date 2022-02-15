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
  cuisines: [],
  likedBy: [],
  logo: String,
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

  async describeCuisine(newCuisine) {
    if (Array.isArray(newCuisine)) {
      for (let i = 0; i < newCuisine.length; i += 1) {
        this.cuisines.push(newCuisine[i])
      }
    } else await this.cuisines.push(newCuisine)

    await this.save()
  }

  async addLogo(logoName) {
    this.logo = logoName

    await this.save()
  }
}

restaurantSchema.loadClass(Restaurant)
restaurantSchema.plugin(autopopulate)
module.exports = mongoose.model('Restaurant', restaurantSchema)
