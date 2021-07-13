
module.exports = (app, methods) => {
    
    const subCategories = methods.loadController('subcategories');

    subCategories.methods.get('list', subCategories.listSubCategories, { auth: false });
    subCategories.methods.put(':categories/:subcategories', subCategories.updateSubCategories, { auth: false });
    subCategories.methods.post(':categories', subCategories.createSubCategories, { auth: false });
  
}