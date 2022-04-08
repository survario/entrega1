const fs = require('fs')

class Carrito {
    constructor(id, timestamp, productos) {
        this.id = id
        this.timestamp = timestamp
        this.productos = productos
    }
}

module.exports = Carrito