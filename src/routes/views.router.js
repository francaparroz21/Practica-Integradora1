import { Router } from "express";
import fs from 'fs'

const router = Router()

router.get('/', async (req, res) => {
    const products = JSON.parse(await fs.promises.readFile('./src/files/products.json', 'utf-8'))
    res.render('home', {
        products,
        styles: ['/css/home.css']
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = JSON.parse(await fs.promises.readFile('./src/files/products.json', 'utf-8'))
    res.render('realTimeProducts', {
        products,
        styles: ['/css/home.css','/css/realtimeproducts.css']
    })
})

export default router;