
const Categories = require('../models/categories');
const Products = require('../models/products');
const SubCategories = require('../models/subCategories');
const baseUrl = "website.com/"
module.exports = {

    //Create new subCategories
    createSubCategories: (req, res, next) => {
        if(!req.body.name){
            return res.send({
                success:false,
                message:"subCategory name required..!"
            })
        }
        
        if(!req.params.categories){
            return res.send({
                success:false,
                message:"Parent Category required..!"
            })
        }
        
        const newCategories = new Categories({
            name: req.body.name,
            parentCategories:req.params.categories,
            url: baseUrl+req.params.categories.trim().toLowerCase()+"/"+req.body.name.trim().toLowerCase(),
            status: 1
        })
        SubCategories.create(newCategories, (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    error: err,
                    message: 'Failed to create new subCategories'
                });
            } else {
                return res.send({
                    success: true,
                    id: data.id,
                    url:data.url,
                    message: 'New subCategories created successfully'
                });
            }
        })
    },

    // Get All Categoriess
    listSubCategories: async (req, res, next) => {
        let findObj={
            status: 1 
        }

        await SubCategories.find(findObj).exec( (err, data) => {

            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "No subCategoriess founded..!",
                    error: err ? err : "No active subCategoriess data in db"
                })
            }

            let result = {
                data: data,
                success: true
            }
            res.send(result);
        })
    },



    //Update subCategories
    
    updateSubCategories: async (req, res, next) => {  
        let catName = req.params.subcategories;
        let parentCatName = req.params.categories;
        let update = {
            name:req.body.name,
            url:baseUrl+parentCatName.trim().toLowerCase()+"/"+req.body.name.trim().toLowerCase()
        }
        if(req.body.subcategory){
            update.url=baseUrl+parentCatName.trim().toLowerCase()+"/"+req.body.name.trim().toLowerCase()+"/"+req.body.subcategory.trim().toLowerCase()
        }
        await SubCategories.find({ "name": catName, "status": "1" },async (err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "subCategories Not founded with this CategoriesName"
                })
            }
            await Categories.findByIdAndUpdate(data[0].id,
                {
                    $set: update
                }, { new: true },
                (err, data) => {
                    if (err || !data) {
                        return res.send({
                            success: false,
                            message: "subCategories updation failed..!"
                        })
                    }
                    return res.send({
                     success: true,
                      message: "subCategories updated successfully"
                       })
                });
                
            })
       
    }

}