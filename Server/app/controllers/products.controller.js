const Products = require('../models/products');

const baseUrl = "website.com/"
module.exports = {

    //Create new Products
    createProducts: (req, res, next) => {
        if(!req.body.name){
            return res.send({
                success:false,
                message:"Products name required..!"
            })
        }
        const newProducts = new Products({
            name: req.body.name,
            parentCategories: req.params.categories,
            parentSubCategories:req.params.subCategories,
            url: baseUrl+req.params.categories.trim().toLowerCase()+"/"+req.params.subCategories.trim().toLowerCase()+"/"+req.body.name.trim().toLowerCase(),
            status: 1
        })
        Products.create(newProducts, (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    error: err,
                    message: 'Failed to create new Products'
                });
            } else {
                return res.send({
                    success: true,
                    id: data.id,
                    url:data.url,
                    message: 'New Products created successfully'
                });
            }
        })
    },

    // Get All Productss
    listProducts: async (req, res, next) => {
        let findObj={
            status: 1 
        }

        await Products.find(findObj).exec( (err, data) => {

            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "No Productss founded..!",
                    error: err ? err : "No active Productss data in db"
                })
            }

            let result = {
                data: data,
                success: true
            }
            res.send(result);
        })
    }
}