const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    itemImage:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

const Item = mongoose.model('Item',ItemSchema);
module.exports = Item;