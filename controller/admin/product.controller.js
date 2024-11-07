const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helper/filterStatus")
const searchHelper = require("../../helper/search")
const paginationHelper = require("../../helper/pagination")
const validate = require("../../validates/admin/product.validate");
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../helper/createTree");
const ProductCategory = require("../../models/product-category.model");


//[GET] /admin/products
module.exports.index = async (req,res)=>{
    // tính năng bộ lọc
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted:false
    }
    
    if(req.query.status)
    {
        find.status = req.query.status;
    }
    //tính năng tìm kiếm sản phẩm
    const objSearch = searchHelper(req.query);
    if(objSearch.regex)
     {
        find.title = objSearch.regex
     }
    //tính năng phân trang
    const countProduct = await Product.countDocuments(find);
     let objectPagination = paginationHelper(
     {
        currentPage:1,
        limitItems:4
     },
     req.query, 
     countProduct
    );
    //end tính năng phân trang
    //sort
    const sort ={};
    if(req.query.sortKey && req.query.sortValue)
    {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort.position = "desc";
    }
    //end sort


    
    const products = await Product
    .find(find)
    .limit(objectPagination.limitItems)
    .skip( objectPagination.skip)
    .sort(sort)

                    
    res.render("admin/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        products:products,
        filterStatus:filterStatus,
        keyword:objSearch.keyword,
        pagination:objectPagination
    })
}

//[PATCH]/admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res)=>{
    console.log(req.params) //req.params là những gì sau dấu ?
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id:id},{status:status});

    req.flash('success','Cập nhật trạng thái thành công!')
    res.redirect("back")
}

//[PATCH]/admin/products/change-multi
module.exports.changeMulti = async (req,res)=>{
    //phải cài đặt thư viện body parser , gói này sẽ convert lại body mới lấy được thuộc tính trong req.body
   const type = req.body.type;
   const ids = req.body.ids.split(", ");
    console.log(type);
    

   switch (type) {
    case "active":
        await Product.updateMany({_id:{$in:ids}},{status:"active"});
        req.flash('success',`cập nhật trạng thái thành công ${ids.length} sản phẩm`);
        break;

    case "inactive":
        await Product.updateMany({_id:{$in:ids}},{status:"inactive"});
        req.flash('success',`cập nhật trạng thái thành công ${ids.length} sản phẩm`);
        break;

    case "delete-all":
        await Product.updateMany({_id:{$in:ids}},
            {deleted:true,
            deletedAt: new Date()         // xóa sản phẩm bằng cách ẩn "đặt deleted = true" vì đang set cho các sản phẩm hiển thị có deleted = false
            });
        req.flash('success',`đã xóa thành công ${ids.length} sản phẩm`);
        break;
    case "change-position":
        for (const item of ids) {
            let [id,pos] = item.split("-");
            pos = parseInt(pos);
            await Product.updateOne({_id: id},{position:pos})
        }
        req.flash('success',`đổi vị trí ${ids.length} sản phẩm thành công`);
        break;
    default:
        break;
   }   
    res.redirect("back");
}

//[DELETE]/admin/products/delete/:id 
module.exports.deleteItem =  async (req,res)=>{
    const id = req.params.id;

    await Product.updateOne({_id: id},{
        deleted:true,
        deletedAt:new Date()});
    res.redirect('back');
}

//[GET]/admin/products/create
module.exports.create = async(req,res)=>{
    let find = {
        deleted: false
    }
    const category = await ProductCategory.find(find);
    const newCategory = createTreeHelper.tree(category);

    res.render("admin/pages/products/create",{
        pageTitle:"Thêm mới sản phẩm",
        category:newCategory
    })
}

//[POST]/admin/products/create
module.exports.createPost = async(req,res)=>{
    console.log(req.file);
    console.log(req.body[req.file.fieldname]);
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    
    if(req.body.position == "")
    {
        const countProducts =  await Product.countDocuments();
        req.body.position =  countProducts + 1;
        req.body.position = parseInt(req.body.position);
        console.log(countProducts);
    }
    else 
    {
        req.body.position = parseInt(req.body.position);
    }
    // console.log(req.body);
    //upload file local    
    // if(req.file) 
    // {
    // req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }
    const product = new Product(req.body);
    console.log(req.body)
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}


//[GET]/admin/products/edit/:id
module.exports.edit = async(req,res)=>{
    try{
    console.log(req.params.id);
    const find = {
        deleted:false,
        _id:req.params.id
    }
    const product= await Product.findOne(find);
    console.log(product);
    
    const category = await ProductCategory.find({
        deleted: false
    });
    const newCategory = createTreeHelper.tree(category);

    res.render("admin/pages/products/edit",{
        pageTitle:"Sửa sản phẩm",
        product: product,
        category:newCategory
    })
}
    catch(err)
    {
        req.flash("error","Không tồn tại sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}


//[PATCH]/admin/products/edit/:id
module.exports.editPatch = async(req,res)=>{
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position);

    // if(req.file)
    // {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // } 
    try
    {
        await Product.updateOne({ _id: id},req.body);
        req.flash("success","Cập nhật thành công");
    }
    catch(error)
    {
        req.flash("error","Cập nhật thất bại");
    }
    res.redirect("back")
}



//[GET]/admin/products/detail/:id
module.exports.detail = async(req,res)=>{
    try{
    const find = {
        deleted:false,
        _id:req.params.id
    }
    const product= await Product.findOne(find);
    console.log(product);
    
    res.render("admin/pages/products/detail",{
        pageTitle:product.title,
        product: product
    })
}
    catch(err)
    {
        req.flash("error","Không tồn tại sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

