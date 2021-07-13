const mongoose = require('mongoose');

function transform(doc, ret) {
    var id = doc._id;
    delete ret._id;
    ret.id = id;
}
var params = {
    toObject: {
        transform: transform
    },
    toJSON: {
        transform: transform
    }
};
// ProductsSchema Schema
const ProductsSchema = mongoose.Schema({
    name: String,
    parentCategories: String,
    parentSubCategories: String,
    url : String,
    status : {
        type:Boolean,
        default:1
    }
   
}, params);


const Products = module.exports = mongoose.model('Products', ProductsSchema);



