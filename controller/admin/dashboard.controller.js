const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
//[get] /admin/dashboard
module.exports.dashboard = async (req,res)=>{
    const statistics = {
        categoryProduct:{
            total:0,
            active:0,
            inactive:0
        },
        product:{
            total:0,
            active:0,
            inactive:0
        },
        admin:{
            total:0,
            active:0,
            inactive:0
        },
        client:{
            total:0,
            active:0,
            inactive:0
        },

    }

    statistics.categoryProduct.total = await ProductCategory.countDocuments({
        deleted:false
    })
    statistics.categoryProduct.active = await ProductCategory.countDocuments({
        status:"active"
    })
    statistics.categoryProduct.inactive = await ProductCategory.countDocuments({
        status:"inactive"
    })

    statistics.product.total = await Product.countDocuments({
        deleted:false
    })
    statistics.product.active = await Product.countDocuments({
        status:"active"
    })
    statistics.product.inactive = await Product.countDocuments({
        status:"inactive"
    })

    statistics.admin.total = await Account.countDocuments({
        deleted:false
    })
    statistics.admin.active = await Account.countDocuments({
        status:"active"
    })
    statistics.admin.inactive = await Account.countDocuments({
        status:"inactive"
    })

    statistics.client.total = await User.countDocuments({
        deleted:false
    })
    statistics.client.active = await User.countDocuments({
        status:"active"
    })
    statistics.client.inactive = await User.countDocuments({
        status:"inactive"
    })

    res.render("admin/pages/dashboard/index",{
        statistic:statistics
    })
}