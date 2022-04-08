const fs = require('fs')

class Producto {
    constructor(id, timestamp, title, description, code, thumbnail, price, stock) {
        this.id = id
        this.timestamp = timestamp
        this.title = title
        this.description = description
        this.code = code
        this.thumbnail = thumbnail
        this.price = price
        this.stock = stock
    }
}

module.exports = Producto