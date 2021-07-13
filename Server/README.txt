GET
http://localhost:5000/categories/list

POST
http://localhost:5000/categories/create

{
	name:""
}

PUT
http://localhost:5000/categories/update/:categories


GET
http://localhost:5001/subcategories/list

POST
http://localhost:5001/subcategories/:categories
{
	name:""
}

PUT
http://localhost:5001/subcategories/update/:categories/:subcategories
{
	name:""
}
if another sub category
	{
		name:"",
		subcategory:""
	}
	


GET
http://localhost:5002/products/list

POST
http://localhost:5002/products/:categories/:subCategories
{
	name:""
}