 const mongoose = require('mongoose')


 //User creation
 const  userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,

    },
    value:{
        type: String,
        defaultValue:0
    }

 })

 const User = mongoose.model("user", userSchema)

 module.exports = User