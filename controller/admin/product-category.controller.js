const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");



//[get] admin/proucts-category
module.exports.index = async (req,res)=>{
    let find= {
        deleted:false
    };
    const record = await ProductCategory.find(find);
    res.render("admin/pages/products-category/index",{
        pageTitle:"Danh Mục Sản Phẩm",
        record:record
    })
}

//[get] admin/proucts-category/create
module.exports.create = (req,res)=>{
    res.render("admin/pages/products-category/create",{
        pageTitle:"Thêm mới danh mục sản phẩm",
    })
}

//[POST]/admin/products-category/create
module.exports.createPost = async(req,res)=>{
    if(req.body.position == "")
    {
        const countPosition = await ProductCategory.countDocuments();
        req.body.position = countPosition + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}