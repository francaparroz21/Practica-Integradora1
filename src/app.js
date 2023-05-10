//Imports.
import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import fs from 'fs'
import { PORT } from "./utils.js";

//Create express app and their ports.
const app = express();

//Listen '8080' ports.
const appServer = app.listen(PORT, () => {
    console.log(`Server started on ${PORT} ports.`)
})

//Server IO
export const socketServer = new Server(appServer)

socketServer.on('connection', (socket) => {
    console.log('Usuario encontrado', socket.id)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

})
//Handlebars.
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//static(public directory), urlencoded & json.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

//Routes 'products' & 'carts'.
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

