const mongoose  = require("mongoose");

const slug = require('mongoose-slug-updater'); // import de lay slug tren thanh url ung voi title
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id:{
        type:String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy:{
        account_id:String,
        createAt:{
            type: Date,
            default: Date.now
        }
    },
    deleted: {
        type: Boolean,
        default:false
    },
    // deletedAt: Date,
    deletedBy:{
        account_id:String,
        deleteAt:Date
    },
    updatedBy:[
    {
        account_id:String,
        updatedAt: Date
    },
    ],
    slug:{
        type:String,
        slug:"title", // = title:string
        unique:true
    }
},{
    timestamps:true
})

const Product = mongoose.model('Product',productSchema,"products")

module.exports = Product;