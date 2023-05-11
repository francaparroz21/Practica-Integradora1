//Imports.
import express from "express";
import productsRouter from "./controllers/products.controller.js"
import cartsRouter from "./controllers/carts.controller.js";
import viewsRouter from "./controllers/views.controller.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import fs from 'fs'
import { PORT } from "./utils.js";
import { MessageManager } from "./dao/manager/manager_mongo/message.manager.js";

//Create express app and their ports.
const app = express();

//Listen '8080' ports.
const appServer = app.listen(PORT, () => {
    console.log(`Server started on ${PORT} ports.`)
})

const messageManager = new MessageManager()

//Server IO
export const socketServer = new Server(appServer)

socketServer.on('connection', async (socket) => {
    console.log('Usuario encontrado', socket.id)

    const messages = await messageManager.getMessages()

    socket.emit("loadingMessages", messages.response)

    
    socket.on("message", async (data) => {
        const { email, message } = data
        
        await messageManager.createMessage({ user: email, message })
        const messages = await messageManager.getMessages()
        
        socket.emit("new-message", messages.response)
    })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado', socket.id)
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

