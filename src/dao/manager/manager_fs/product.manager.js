import fs from "fs"

//Clase Product Manager
class ProductManager {

    //Funcion constructora para la creacion.
    constructor(path) {
        this.path = path
    }

    //id que solo se incrementa cuando se añade un producto.
    generateId = async () => {
        try {
            const products = await this.getProducts()
            return products.length + 1
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Metodo para eliminar un producto por su ID
    deleteProduct = async id => {
        const products = await this.getProducts()
        const newArray = products.filter(product => product.id !== id)
        await this.writeFile(newArray)
    }

    //Metodo para actualizar un producto.
    updateProduct = async (id, obj) => {
        const products = await this.getProducts()
        const product = await this.getProductById(id)
        const newProduct = { ...product, ...obj }
        products.splice(products.indexOf(product), 1, newProduct)
        await this.writeFile(products)
    }

    //Metodo que recibe data y escribe en el path de cada product manager.
    writeFile = async data => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data))
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Metodo añadir producto
    addProduct = async product => {
        const products = await this.getProducts()
        try {
            let newProduct = { id: await this.generateId(), ...product }
            products.push(newProduct)
            await this.writeFile(products)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Metodo para obtener todos los productos
    getProducts = async () => {
        try {
            const products = await fs.promises.readFile(this.path, "utf-8")
            if(!products) return []
            return JSON.parse(products)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Metodo para obtener un producto por el id.
    getProductById = async id => {
        try {
            const products = await this.getProducts()
            let productFounded = products.find(p => p.id === id)
            return productFounded ? productFounded : null
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Metodo para borrar todos los productos.
    deleteAllProducts = async () => {
        await this.writeFile([])
    }
}

//Usamos module.exports para poder usarlo en el archivo 'script.js'
module.exports = ProductManager