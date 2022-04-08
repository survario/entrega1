const fs = require('fs')
const express = require('express')
const router = express.Router()
const Carrito = require('../classes/Carrito')
const Producto = require('../classes/Producto')

router.get('/', async (req, res) => {
    try {
        const content = await fs.promises.readFile('./data/carritos.json', 'utf-8')
        const carrito = JSON.parse(content)
        res.type('json')
        res.send(JSON.stringify(carrito, null, 2))
    } catch (err) {
        res.json({ error: 'Error de lectura: El archivo está vacío o no se encuentra' })
    }
})

router.post('/', (req, res) => {
    const carro = new Carrito(req.body)
    const productos = []
    try {
        const content = fs.readFileSync('./data/carritos.json', 'utf-8')
        const carritos = JSON.parse(content)
        carro.id = (carritos.length+1)
        carro.timestamp = new Date()
        carro.productos = productos
        fs.writeFileSync('./data/carritos.json', JSON.stringify([...carritos, carro]))
        res.json({ id: carro.id})
    } catch (e) {       
        carro.id = 1
        carro.timestamp = new Date()
        carro.productos = productos
        fs.writeFileSync('./data/carritos.json', JSON.stringify([{...carro, id: 1}]))
        res.json({ id: carro.id})
    }
})

router.post('/:id/productos', (req, res) => {
    try {
        const content = fs.readFileSync('./data/carritos.json', 'utf-8')
        const carritos = JSON.parse(content)
        const carro = carritos[(req.params.id)-1]
        if (isNaN(req.params.id)) {
            res.json({ error: 'El parámetro id: carrito ingresado, no es un número' })
        } else {
            if (carro !== undefined) {
                try {
                    const contentProd = fs.readFileSync('./data/productos.json', 'utf-8')
                    const productos = JSON.parse(contentProd)
                    const product = productos[(req.body.id)-1]
                    if (isNaN(req.body.id)) {
                        res.json({ error: 'El parámetro id: producto ingresado, no es un número' })
                    } else {
                        if (product !== undefined) {
                            const arrayProds = carro.productos
                            arrayProds.push(product)
                            carro.productos = arrayProds
                            fs.writeFileSync('./data/carritos.json', JSON.stringify([...carritos,]))
                            res.type('json')
                            res.send(JSON.stringify(carro, null, 2))
                        } else {       
                            res.json({ error: 'Producto no encontrado'})                  
                        }                        
                    }                    
                } catch(err) {
                    res.json({ error: 'Error de lectura: El archivo productos.json se encuentra vacío' })
                }              
            } else {
                res.json({ error: 'Carro no encontrado'})
            }           
        }        
    } catch (e) {       
        res.json({ error: 'Error de lectura: El archivo carritos.json se encuentra vacío' })
    }
})
    
router.get('/:id/productos/', async (req, res) => {
    try {
        const content = await fs.promises.readFile('./data/carritos.json', 'utf-8')
        const carritos = (JSON.parse(content))
        const carro = carritos[(req.params.id)-1]
        if (isNaN(req.params.id)) {
            res.json({ error: 'El parámetro no es un número' })
        } else {
            if (carro !== undefined) {
                if (carro.productos !== undefined) {
                    res.json(carro.productos)
                } else {
                    res.json({ error: 'El carrito fue eliminado' })
                }               
            } else {
                res.json({ error: 'Carrito no encontrado'}) 
            }
        } 
    } catch (err) {
        res.json({ error: 'Error de lectura: El archivo está vacío o no se encuentra' })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const content = fs.readFileSync('./data/carritos.json', 'utf-8')
        const carritos = (JSON.parse(content))
        const carro = carritos[(req.params.id)-1]
        if (isNaN(req.params.id)) {
            res.json({ error: 'El parámetro no es un número' })
        } else if (carro !== undefined) {
            carritos.splice((req.params.id-1), 1 , {})
            fs.writeFileSync('./data/carritos.json', JSON.stringify(carritos))
            res.json({ mensaje: 'el carrito fue eliminado exitosamente' })
        } else {
                res.json({ error: 'Carrito no encontrado'})
        }
    } catch (e) {
                res.json({ error: 'Error de lectura: El archivo está vacío o no se encuentra' })
    }
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    try {
        const content = fs.readFileSync('./data/carritos.json', 'utf-8')
        const carritos = JSON.parse(content)
        const carro = carritos[(req.params.id)-1]
        if (isNaN(req.params.id)) {
            res.json({ error: 'El parámetro id: carrito ingresado, no es un número' })
        } else {
            if (carro !== undefined) {
                try {
                    const contentProd = fs.readFileSync('./data/productos.json', 'utf-8')
                    const productos = JSON.parse(contentProd)                    
                    const product = productos[(req.params.id_prod)-1]
                    if (isNaN(req.params.id_prod)) {
                        res.json({ error: 'El parámetro id: producto ingresado, no es un número' })
                    } else {
                        if (product !== undefined) {
                            const arrayProds = carro.productos
                            const index = arrayProds.lastIndexOf(product)
                            arrayProds.splice((index), 1, {})
                            carro.productos = arrayProds
                            fs.writeFileSync('./data/carritos.json', JSON.stringify([...carritos,]))
                            res.json({ mensaje: 'el producto fue eliminado exitosamente del carrito' })
                        } else {       
                            res.json({ error: 'Producto no encontrado'})                  
                        }                        
                    }                    
                } catch(err) {
                    res.json({ error: 'Error de lectura: El archivo productos.json se encuentra vacío' })
                }              
            } else {
                res.json({ error: 'Carro no encontrado'})
            }           
        }        
    } catch (e) {       
        res.json({ error: 'Error de lectura: El archivo carritos.json se encuentra vacío' })
    }
})

//exportamos el router
module.exports = router