const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helper/product");
//[GET] /cart
module.exports.index = async(req,res)=>{
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id:cartId
    })
   if(cart.products.length>0)
   {
    for (const item of cart.products) {
        const productId = item.product_id;
        const productInfo = await Product.findOne({
            _id:productId
        }).select("title thumbnail slug price discountPercentage")
        productInfo.priceNew = productHelper.priceNewproduct(productInfo);
       
        item.productInfo = productInfo;
        item.totalPrice = productInfo.priceNew * item.quantity;
    } 
    cart.totalPrice = cart.products.reduce((sum,item)=> sum +  item.totalPrice,0);
   }
    res.render("client/pages/cart/index",{
        pageTitle:"Giỏ hàng",
        cartDetail:cart
    })
}



//[POST] /cart/add/:productId
module.exports.addPost = async(req,res)=>{
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;
    
    console.log(quantity);
    
    const cart = await Cart.findOne({
        _id:cartId
    })
    console.log(cart.products);
    
    const existProductInCart = cart.products.find(item => item.product_id == productId)// hàm find trong js not mongoose trả về 1 item trong mảng
    if(existProductInCart)
    {
        const quantityNew = quantity + existProductInCart.quantity;
        console.log(quantityNew);

        await Cart.updateOne(
        {
            _id:cartId,
            "products.product_id":productId
        },
        {
           $set:{
            "products.$.quantity":quantityNew
           }
        })
    }
    else{
        
        const objectCart= {
        product_id:productId,
        quantity:quantity
    };

    await Cart.updateOne({_id:cartId},{
        $push:{products:objectCart}
    });
    }
    req.flash("success","Thêm thành công vào giỏ hàng");
    res.redirect('back');
  
}

//[GET] /cart/delete/product_id
module.exports.delete = async(req,res)=>{
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;

    
    await Cart.updateOne({_id:cartId},{
        $pull:{
            "products" :{product_id:productId}
        }
    })

    req.flash("success","Xoá thành công sản phẩm trong giỏ hàng");
    res.redirect("back");
    
}

//[get] /cart/update/productId/quantity
module.exports.update = async (req,res)=>{
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    await Cart.updateOne(
        {
        _id:cartId,
        "products.product_id":productId
        },
        {
        $set:{
            "products.$.quantity": quantity
        }
        });
        req.flash("success","thay đổi thành công số lượng sản phẩm trong giỏ hàng");
        res.redirect("back");
}