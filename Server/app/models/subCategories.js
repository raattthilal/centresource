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
// SubCategoriesSchema Schema
const SubCategoriesSchema = mongoose.Schema({
    name: String,
    parentCategories: String,
    url : String,
    status : {
        type:Boolean,
        default:1
    }
   
}, params);


const SubCategories = module.exports = mongoose.model('SubCategories', SubCategoriesSchema);



