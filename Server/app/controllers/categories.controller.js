const Categories = require('../models/categories');
const SubCategories = require('../models/subCategories');
const baseUrl = "website.com/"
module.exports = {

    //Create new Categories
    createCategories: (req, res, next) => {
        if(!req.body.name){
            return res.send({
                success:false,
                message:"Category name required..!"
            })
        }
        const newCategories = new Categories({
            name: req.body.name,
            url: baseUrl+req.body.name.trim().toLowerCase(),
            status: 1
        })
        Categories.create(newCategories, (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    error: err,
                    message: 'Failed to create new Categories'
                });
            } else {
                return res.send({
                    success: true,
                    id: data.id,
                    url:data.url,
                    message: 'New Categories created successfully'
                });
            }
        })
    },

    // Get All Categoriess
    listCategories: async (req, res, next) => {
        let findObj={
            status: 1 
        }

        await Categories.find(findObj).exec( (err, data) => {

            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "No Categoriess founded..!",
                    error: err ? err : "No active Categoriess data in db"
                })
            }

            let result = {
                data: data,
                success: true
            }
            res.send(result);
        })
    },



    //Update Categories
   
  updateCategories: async (req, res, next) => {  
        let catName = req.params.categories;
        let update = {
            name:req.body.name,
            url:baseUrl+req.body.name.trim().toLowerCase()
        }
        await Categories.find({ "name": catName, "status": "1" },async (err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "Categories Not founded with this CategoriesName"
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
                            message: "Categories updation failed..!"
                        })
                    }
                    //Update in subCategory
                    await SubCategories.find({ "parentCategories": catName, "status": "1" },async (err, catData) => {
                        if (!err || catData.length == 0) {
                            console.log("no parent categories to update");
                            return res.send({
                                success: true,
                                message: "subCategories Not founded with this CategoriesName and updated Categories"
                            })
                        }
                        let subCatUpdate={
                            url:update.url+catData[0].name.trim().toLowerCase()
                        }
                       
                        await SubCategories.findByIdAndUpdate(catData[0].id,
                            {
                                $set: subCatUpdate
                            }, { new: true },
                            (err, subData) => {
                                if (err || !subData) {
                                    return res.send({
                                        success: false,
                                        message: "subCategories updation failed..!"
                                    })
                                }
                                    return res.send({
                                        success: true,
                                        message: "Categories updated successfully"
                            })
                        });
                })
            })
        })
    }

}