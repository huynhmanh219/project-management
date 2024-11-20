//[get] /products
const Product = require("../../models/product.model");
//[get] product
module.exports.index = async(req,res)=>{
    
    const product = await Product.find({
        deleted:"false"
    }).sort({position:"desc"});
    // console.log(product);

    const newproduct = product.map(item => {
        item.pricenew = item.price -(100 *item.discountPercentage)/100;
        return item;
    });

    res.render("client/pages/products/index",{
        pageTitle:"Trang sản phẩm",
        products:newproduct 
    });
}
//[get] product/slug
module.exports.slug = async(req,res)=>{
    try
    {const find = {
        deleted:"false",
        slug:req.params.slug,
        status:"active"
    }
    const product = await Product.findOne(find);
    res.render(`client/pages/products/detail`,{
        pageTitle:product.title,
        product: product 
    });
    }
    catch(error)
    {
        res.redirect(`/products`)
    }
}

module.exports.create = (req,res)=>{
    res.render("client/pages/products/index")
}
module.exports.edit = (req,res)=>{
    res.render("client/pages/products/index")
}

