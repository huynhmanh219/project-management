const mongoose  = require("mongoose");
const slug = require('mongoose-slug-updater'); // import de lay slug tren thanh url ung voi title
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default:false
    },
    deletedAt: Date,
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