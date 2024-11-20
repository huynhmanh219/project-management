const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helper/createTree");

//[get] /
module.exports.index= async (req,res)=>{

    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
    });
}
