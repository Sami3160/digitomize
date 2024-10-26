const mongoose = require('mongoose')


const { Schema } = mongoose

const commentSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Comment=mongoose.model('Comment', commentSchema)
module.exports=Comment