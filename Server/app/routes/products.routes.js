
module.exports = (app, methods) => {
    const Products = methods.loadController('products');
    Products.methods.get('list', Products.listProducts, { auth: false });
    Products.methods.post(':categories/:subCategories', Products.createProducts, { auth: false });
}