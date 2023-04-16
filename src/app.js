//Imports.
import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";

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

//static(public directory), urlencoded & json.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

//Routes 'products' & 'carts'.
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/',viewsRouter)

