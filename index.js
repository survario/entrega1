const express = require('express')
const app = express()
const PORT = 8080
const routerCarrito = require('./routes/carritoRouter')
const routerProductos = require('./routes/productosRouter')
const Producto = require('./classes/Producto')
const Carrito = require('./classes/Carrito')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public'))

const server = app.listen(PORT, (req, res) => {
    console.log(
        `El servidor está siendo escuchado en el puerto ${server.address().port}`
    )
})
server.on('error', (error) => console.log('Hubo un error ' + error))

app.use('/carrito', routerCarrito)
app.use('/productos', routerProductos)

//The 404 Route (ALWAYS Keep this as the last route)
app.use('*', function(req, res){
    res.send({ error: 404, descripcion: 'Ruta No Implementada' })
  })