import { Router } from "express";
import fs from "fs"

const router = Router();

//Post - create a cart.
router.post('/', async (req, res) => {
    let carts = JSON.parse(await fs.promises.readFile('./src/files/carts.json', 'utf-8'))
    let generateId = (!carts) ? 0 : carts.length + 1
    let newCarts = [...carts, { id: generateId, products: [] }]
    await fs.promises.writeFile("./src/files/carts.json", JSON.stringify(newCarts, null, "\t"))
    res.send({ newCarts })
})

//Get cart by ID.
router.get('/:cid', async (req, res) => {
    let carts = JSON.parse(await fs.promises.readFile('./src/files/carts.json', 'utf-8'))
    let cid = req.params.cid
    let cart = carts.find(cart => cart.id == cid)

    if (!cart) return res.status(404).send({
        error: `Cart ID ${cid} incorrect, not found.`
    })

    res.send({ cart })
})

//Post a product in a specific cart.
router.post('/:cid/product/:pid', async (req, res) => {
    let carts = JSON.parse(await fs.promises.readFile('./src/files/carts.json', 'utf-8'))
    let products = JSON.parse(await fs.promises.readFile('./src/files/products.json', 'utf-8'))
    let cid = req.params.cid
    let pid = req.params.pid
    let cart = carts.find(cart => cart.id == cid)

    if (!cart) return res.status(404).send({
        error: `Cart ID ${cid} incorrect. not found`
    })

    let indexCart = carts.indexOf(cart)

    let product = products.find(product => product.id == pid)

    if (!product) return res.status(404).send({
        error: `Product ID ${pid} incorrect. not found`
    })

    let productInCart = [...cart.products].find(product => product.product == pid.toString())

    if (!productInCart) {
        cart.products.push({ product: pid, quantity: 1 })
        carts.splice(indexCart, 1, cart)
        await fs.promises.writeFile('./src/files/carts.json', JSON.stringify(carts, null, '\t'))
        return res.send({
            cart
        })
    }

    let indexProduct = [...cart.products].indexOf(productInCart)
    console.log(indexProduct)
    cart.products.splice(indexProduct, 1, { ...productInCart, quantity: productInCart.quantity + 1 })
    carts.splice(indexCart, 1, cart)

    await fs.promises.writeFile("./src/files/carts.json", JSON.stringify(carts, null, '\t'))
    res.send({
        cart
    })
})

export default router;