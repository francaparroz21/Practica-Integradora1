import { Router } from "express";
import fs from 'fs'

const router = Router()

router.get('/', async (req, res) => {
    const products = JSON.parse(await fs.promises.readFile('./src/files/products.json', 'utf-8'))
    res.render('home', {
        products,
        style: '/css/home.css'
    })
})


export default router;