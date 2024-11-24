const productHelper = require("../../helper/product");
const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");


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
    const Category = await ProductCategory.findOne({
        slug:req.params.slugCategory,
        deleted:false
    })
    
    res.send("ok");
}

module.exports.create = (req,res)=>{
    res.render("client/pages/products/index")
}
module.exports.edit = (req,res)=>{
    res.render("client/pages/products/index")
}

