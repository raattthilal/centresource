
module.exports = (app, methods) => {
    
    const Categories = methods.loadController('categories');

    Categories.methods.get('list', Categories.listCategories, { auth: false });
    Categories.methods.put('update/:categories', Categories.updateCategories, { auth: false });
    Categories.methods.post('create', Categories.createCategories, { auth: false });
  
}