const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        default: ''
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    subscribedDate:{
        type:Date,
        default:''
    }
},
    { timestamps: true })
 const User=new mongoose.model('user',userSchema)

 module.exports=User