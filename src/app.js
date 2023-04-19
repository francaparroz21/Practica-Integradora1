//Imports.
import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import fs from 'fs'

//Create express app and their ports.
const app = express();
const PORT = 8080;

//Handlebars.
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Listen '8080' ports.
const appServer = app.listen(PORT, () => {
    console.log(`Server started on ${PORT} ports.`)
})

//Server IO
const socketServer = new Server(appServer)

socketServer.on('connection',(socket) =>{
    console.log('Usuario encontrado', socket.id)

    socket.on('disconnect',()=>{
        console.log('Usuario desconectado')
    })

    socket.on('newProd', async ({title, description, category, price, thumbnails = "null", code, stock})=> {
        const products = await fs.promises.readFile('./src/files/products.json', 'utf-8')
        products.push({title, description, category, price, thumbnails: "null", code, stock})
        await fs.promises.writeFile('./src/files/products.json', JSON.stringify(products, null, "\t"))
        socketServer.emit('addedProducts', products);
      })


})

//static(public directory), urlencoded & json.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

//Routes 'products' & 'carts'.
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/',viewsRouter)

