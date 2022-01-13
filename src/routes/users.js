const express = require('express')

const router = express.Router()

const User = require('../models/user')
// const Restaurant = require('../models/restaurant')
// const Order = require('../models/order')

const ayse = new User('ayse', 32)
const tuna = new User('tuna', 2)

const users = [ayse, tuna]
console.log(users)

/* GET users listing. */
router.get('/', (req, res) => {
  let results = users

  if (req.query.name) {
    results = users.filter(user => user.name == req.query.name)
  }

  res.send(results)
})

router.get('/:userId', (req, res) => {
  const user = users[req.params.userId]

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
