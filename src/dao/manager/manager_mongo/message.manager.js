import { messageModel } from "../../models/messages.model.js"

export class MessageManager{
    async getMessages(){
        try{
            const response = await messageModel.find()
            
            if(!response.length) return { status: 404, response: "Messages not found." }
            
            const messages = response.map(message => ({ id: message.id, user: message.user, message: message.message }))

            return { status: 200, response: messages }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async createMessage({ user, message }){
        try{
            await messageModel.create({ user, message })

            return { status: 201, response: "Message sent succesfully." }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async deleteMessage(id){
        try{
            const messageFound = await messageModel.findById(id)

            if(!messageFound) return { status: 404, response: "Message not found." }

           await messageModel.deleteOne({ _id: id })

            return { status: 200, response: "Message deleted." }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async deleteAllMessages(){
        try{
            await messageModel.deleteMany()

            return { status: 200, response: "All messages removed." }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }
}