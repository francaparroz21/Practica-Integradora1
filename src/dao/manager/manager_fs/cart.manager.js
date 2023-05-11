import fs from "fs"

export class MessageManager{
    constructor(path){
        this.path = `${process.cwd()}/src/json/${path}`
    }

    async getMessages(){

        try{
            const messages = JSON.parse(await fs.promises.readFile(this.path))
            
            if(!messages) return { status: 404, response: "The messages folder are empty." }
            
            return { status: 200, response: messages }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async createMessage(user, message){
        try{
            const response = JSON.parse(await fs.promises.readFile(this.path))
            const newMessage = { id: response.length + 1, user, message }

            if(!response.length){
                await fs.promises.writeFile(this.path, JSON.stringify([newMessage], null, "\t"))
                
                return { status: 200, response: "Message sent." }
            }

            const data = JSON.parse(response)
            const messages = [...data, newMessage]

            await fs.promises.writeFile(this.path, JSON.stringify(messages, null, "\t"))

            return { status: 200, response: "Message sent." }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }

    async deleteMessage(id){

        try{
            const response = await fs.promises.readFile(this.path)

            if(!response.length) return { status: 404, ok: false, response: "No messages." }

            const data = JSON.parse(response) 
            const messageFound = data.find(message => message.id === id)

            if(!messageFound) return { status: 404, ok: false, response: "Message not found." }

            const updatedMessages = [...data].filter(message => message.id !== id && message)

            await fs.promises.writeFile(this.path, JSON.stringify(updatedMessages, null, "\t"))

            return { status: 200,response: "Message deleted." }
        }catch(error){
            console.log(`error: ${error}`)
        }
    }
}