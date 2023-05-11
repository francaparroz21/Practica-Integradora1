import { cartModel } from "../../models/carts.model.js"
import { productModel } from "../../models/products.model.js"

export class CartManager{
    async getCarts(){
        try{
            const cartModel = await cartModel.find()
            
            if(!cartModel.length) return { status: 404, response: "Carts not found."}

            const carts = response.map(cart => ({ id: cart._id, products: cart.products }))

            return { status: 200, response: carts }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async getCartById(id){
        try{
            const cartFound = await cartModel.find({ _id: id })
            
            if(!cartFound) return { status: 404, response: "Cart not found" }

            return { status: 200, ok: true, response: mapped }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async createCart(){
        try{
            await cartModel.create({ products: []})
        
            return { status: 200, response: "Cart created." }
        }catch(error){
            console.log(`error: ${error}`)
        } 
    }

    async addProductToCart(cartId, productId){
        try{
            const cartFound = await cartModel.find({ _id: cartId})

            if(!cartFound) return { status: 404, response: "Cart not found." }

            const productFound = await productModel.find({ _id: productId })
            
            if(!productFound )return { status: 404, response: "Product not found." }
            
            const cartProducts = cartFound[0].products

            const productRepeated = cartProducts.find(cart => cart.id === productId)
            let updatedProducts

            if(!productRepeated) updatedProducts = [...cartProducts, { id: productId, quantity: 1}]
            if(productRepeated) updatedProducts = cartProducts.map(product => product.id === productId ? {...product, quantity: product.quantity + 1} : product)

            const updatedCart = {...cartFound, products: updatedProducts}

            await cartModel.updateOne({ _id: cartId}, updatedCart)

            return { status: 200, response: "Product added to cart." }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async deleteCart(id){
        try{
            const cartFound = await cartModel.find({ _id: id })

            if(!cartFound) return { status: 404, response: "Cart not found." }

            await cartModel.deleteOne({ _id: id })

            return { status: 200, response: "Cart deleted." }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }
}