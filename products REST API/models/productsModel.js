const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : true ,

    } ,
    price : {
        type : Number ,
        require : [true , 'price is required']
    } ,
    featured : {
        type : Boolean ,
        default : false 
    } ,

    rating : {
        type : Number ,
         default : 4.9
    } , 
    createdAt : {
        type : Date ,
        default : Date.now()
    } , 
    company: {
        type: String,
        enum: {
            values: ['apple', 'samsung', 'dell', 'mi'],
            message: 'Company is not supported',
        },
    },

});

module.exports = mongoose.model('Product' , productsSchema);