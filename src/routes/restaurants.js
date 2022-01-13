const express = require('express')
const Restaurant = require('../models/restaurant')

const router = express.Router()

const restaurant = new Restaurant('samis')

restaurant.createMenu('pizza')
restaurant.createMenu('beverages')
restaurant.menus[0].addProduct('margaritta', 10)
restaurant.menus[0].addProduct('vegan', 12)
restaurant.menus[0].addProduct('salami', 15)
restaurant.menus[1].addProduct('fanta', 2)
restaurant.menus[1].addProduct('Coca cola', 2)
restaurant.menus[1].addProduct('Ice Tea', 1.8)
restaurant.menus[1].addProduct('Sprite', 2.1)
console.log(restaurant.menus[0].menuInfo)

router.get('/', (req, res) => {
  res.render('restaurant', { restaurant })
})

module.exports = router
