const fs = require('fs')
const express = require('express')
const router = express.Router()
const Producto = require('../classes/Producto')

let administrador

router.get('/', async (req, res) => {
    try {
        const content = await fs.promises.readFile('./data/productos.json', 'utf-8')
        const productos = JSON.parse(content)
        res.type('json')
        res.send(JSON.stringify(productos, null, 2))
    } catch (err) {
        res.json({ error: 'Error de lectura: El archivo está vacío o no se encuentra' })
    }
})

router.post('/', (req, res) => {
//    if (administrador) { 
    const product = new Producto(req.body)
    try {
        const content = fs.readFileSync('./data/productos.json', 'utf-8')
        const productos = JSON.parse(content)
        product.id = (productos.length+1)
        product.timestamp = new Date()
        product.title = req.body.title
        product.description = req.body.description
        product.code = req.body.code
        product.thumbnail = req.body.thumbnail
        product.price = req.body.price
        product.stock = req.body.stock
        fs.writeFileSync('./data/productos.json', JSON.stringify([...productos, product]))
        res.type('json')
        res.send(JSON.stringify(product, null, 2))
    } catch (e) {       
        product.id = 1
        product.timestamp = new Date()
        product.title = req.body.title
        product.description = req.body.description
        product.code = req.body.code
        product.thumbnail = req.body.thumbnail
        product.price = req.body.price
        product.stock = req.body.stock
        fs.writeFileSync('./data/productos.json', JSON.stringify([{...product, id: 1}]))
        res.type('json')
        res.send(JSON.stringify(product, null, 2))
    }
//    } else {
//        res.json({ error: 'Usuario no Autorizado', descripcion: 'ruta /productos método DEKETE requiere Administrador' })      
//    }
})

router.get('/:id?', async (req, res) => {
    try {
        const content = await fs.promises.readFile('./data/productos.json', 'utf-8')
        const productos = (JSON.parse(content))
        const product = productos[(req.params.id)-1]
        if (isNaN(req.params.id)) {
            res.json({ error: 'El parámetro no es un número' })
        } else {
            product !== undefined
                ? res.json(product)
                : res.json({ error: 'Producto no encontrado'})
        } 
    } catch (err) {
        res.json({ error: 'Error de lectura: El archivo está vacío o no se encuentra' })
    }
})

router.put('/:id', (req, res) => {
//    if (administrador) {
    try {
        const content = fs.readFileSync('./data/productos.json', 'utf-8')
        const productos = (JSON.parse(content))        
        const product = productos[(req.params.id)-1]
        const respuesta = {} 
        let producto = {id: req.params.id} 
        if (isNaN(req.params.id)) {
            res.json({ error: 'el parametro no es un numero' })
        } else if (product !== undefined) {
            respuesta.before = productos[(req.params.id)-1];             
            
            const promise1 = new Promise((resolve, reject) => {
                if (req.body.timestamp !== undefined) {
                    producto.timestamp = req.body.timestamp
                    return producto
                } else {
                    if (product.timestamp !== undefined) {   
                        producto.timestamp = product.timestamp                 
                        return producto
                    } else {
                        producto.timestamp = new Date()
                        return producto
                    }                
                }
            })
            const promise2 = new Promise((resolve, reject) => {
                if (req.body.title !== undefined) {
                    producto.title = req.body.title
                    return producto
                } else {
                    producto.title = product.title
                    return producto
                }
            })
            const promise3 = new Promise((resolve, reject) => {
                if (req.body.description !== undefined) {
                    producto.description = req.body.description
                    return producto
                } else {
                    producto.description = product.description
                    return producto
                }
            })
            const promise4 = new Promise((resolve, reject) => {
                if (req.body.code !== undefined) {
                    producto.code = req.body.code
                    return producto
                } else {
                    producto.code = product.code
                    return producto
                }
            })
            const promise5 = new Promise((resolve, reject) => {
                if (req.body.thumbnail !== undefined) {
                    producto.thumbnail = req.body.thumbnail
                    return producto
                } else {
                    producto.thumbnail = product.thumbnail
                    return producto
                }
            })
            const promise6 = new Promise((resolve, reject) => {
                if (req.body.price !== undefined) {
                    producto.price = req.body.price
                    return producto
                } else {
                    producto.price = product.price
                    return producto
                }
            })
            const promise7 = new Promise((resolve, reject) => {
                if (req.body.stock !== undefined) {
                    producto.stock = req.body.stock
                    return producto
                } else {
                    producto.stock = product.stock
                    return producto
                }
            })
            Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7]).then(function(producto) {
                return producto
            })
            respuesta.update = producto
            productos.splice((req.params.id-1), 1, producto)
            fs.writeFileSync('./data/productos.json', JSON.stringify(productos))
            res.send(respuesta)
        } else {
            res.json({ error: 'producto no encontrado'})
        } 
    } catch (error) {
        res.json({ error: 'Error de lectura: El archivo está vacío o no se encuentra' })
    }
//    } else {
//        res.json({ error: 'Usuario no Autorizado', descripcion: 'ruta /productos método DEKETE requiere Administrador' })      
//    }
})

router.delete('/:id', (req, res) => {
    //    if (administrador) {
    try {
        const content = fs.readFileSync('./data/productos.json', 'utf-8')
        const productos = (JSON.parse(content))
        const product = productos[(req.params.id)-1]
        if (isNaN(req.params.id)) {
            res.json({ error: 'El parámetro no es un número' })
        } else if (product !== undefined) {
            productos.splice((req.params.id-1), 1 , {})
            fs.writeFileSync('./data/productos.json', JSON.stringify(productos))
            res.json({ mensaje: 'el producto fue eliminado exitosamente' })
        } else {
                res.json({ error: 'producto no encontrado'})
        }
    } catch (e) {
                res.json({ error: 'Error de lectura: El archivo está vacío o no se encuentra' })
    }
    //    } else {
    //        res.json({ error: 'Usuario no Autorizado', descripcion: 'ruta /productos método DEKETE requiere Administrador' })      
    //    }
})

//exportamos el router
module.exports = router