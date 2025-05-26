const mongoose = require('mongoose')
const {randomUUID } = require('crypto')
const { type } = require('os')
 
const Schema = mongoose.Schema

const chatSchema = new Schema({
    id: {
        type: String,
        default:randomUUID(),
    },
   
    message: {
        type: String,
    },
    chatresponse:{
        type:String 
    }
})

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    chats:[chatSchema]
})

module.exports = mongoose.model("User",userSchema)