const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productHelper = require("../../helper/product");

//[get] /
module.exports.index= async (req,res)=>{

    const productFeature = await Product.find({deleted:false,
        status:"active",
        featured:"1"
    }).limit(6)
    
    const productSoon = await Product.find({
        deleted:false,
        status:"active",
    }).sort({position: "desc"}).limit(6)

    const newproduct = productHelper.priceNewproducts(productFeature);
    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
        productFeatured:newproduct,
        productNew:productSoon   
    });
}
