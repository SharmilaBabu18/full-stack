const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type : String,
        require:true
    },
    completed : {
        type : Boolean,
        default : false

    },
    addedOn:{
        type:String,
        default:Date.now()
    }
});


module.exports=mongoose.model("Todo",todoSchema)