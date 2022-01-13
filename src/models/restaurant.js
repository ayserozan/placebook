const Menu = require('./menu')

class Restaurant {
  constructor(name) {
    this.name = name
    this.likedBy = []
    this.menus = []
  }

  createMenu(menuName) {
    // const menu = new Menu(menuName)
    this.menus.push(new Menu(menuName))
  }
}

module.exports = Restaurant
