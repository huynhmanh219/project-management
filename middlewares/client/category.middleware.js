const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helper/createTree");
module.exports.category = async (req,res,next)=>{
    const find = {
        deleted:false
    };
    const records = await ProductCategory.find(find);
    const newproductCategory = createTreeHelper.tree(records);
    
    res.locals.layoutProductCategory = newproductCategory;
    next();
}