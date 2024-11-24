const productHelper = require("../../helper/product");
const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const { all } = require("../../routes/client/product.route");
const ProductCategoryHelper = require("../../helper/productCategory");

//[get] product
module.exports.index = async(req,res)=>{
    
    const product = await Product.find({
        deleted:"false"
    }).sort({position:"desc"});
    // console.log(product);

    const newproduct = productHelper.priceNewproduct(product);

    res.render("client/pages/products/index",{
        pageTitle:"Trang sản phẩm",
        products:newproduct 
    });
}
//[get] product/slugCategory
module.exports.category = async(req,res)=>{
    const category = await ProductCategory.findOne({
        slug:req.params.slugCategory,
        deleted:false,
        status:"active"
    })

    const listSubCategory = await ProductCategoryHelper.getSubCategory(category.id)
    const listSubCategoryId = listSubCategory.map(item => item.id);
   
    const products = await Product.find({
        product_category_id: {$in: [category._id,...listSubCategoryId]},
        deleted:false
    }).sort({position:"desc"})

    const newproduct = productHelper.priceNewproduct(products);
   
    res.render("client/pages/products/index",{
        pageTitle:category.title,
        products:newproduct 
    });
}

module.exports.create = (req,res)=>{
    res.render("client/pages/products/index")
}

module.exports.edit = (req,res)=>{
    res.render("client/pages/products/index")
}

