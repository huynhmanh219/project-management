const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const validate = require("../../validates/admin/product.validate");
const createTreeHelper = require("../../helper/createTree");

//[get] admin/proucts-category
module.exports.index = async (req, res) => {
 
    const filterStatus = filterStatusHelper(req.query); 
    let find = {
        deleted: false
    };
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
    //end tính năng
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
    const record = await ProductCategory.find(find).sort(sort);
    const newRecord = createTreeHelper.tree(record);
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh Mục Sản Phẩm",
        records: newRecord,
        filterStatus:filterStatus,
        keyword:objSearch.keyword
    })
}

//[PATCH]/admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req,res)=>{
    console.log(req.params) //req.params là những gì sau dấu ?
    const status = req.params.status;
    const id = req.params.id;

    await ProductCategory.updateOne({_id:id},{status:status});

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
        await ProductCategory.updateMany({_id:{$in:ids}},{status:"active"});
        req.flash('success',`cập nhật trạng thái thành công ${ids.length} sản phẩm`);
        break;

    case "inactive":
        await ProductCategory.updateMany({_id:{$in:ids}},{status:"inactive"});
        req.flash('success',`cập nhật trạng thái thành công ${ids.length} sản phẩm`);
        break;

    case "delete-all":
        await ProductCategory.updateMany({_id:{$in:ids}},
            {deleted:true,
            deletedAt: new Date()         // xóa sản phẩm bằng cách ẩn "đặt deleted = true" vì đang set cho các sản phẩm hiển thị có deleted = false
            });
        req.flash('success',`đã xóa thành công ${ids.length} sản phẩm`);
        break;
    case "change-position":
        for (const item of ids) {
            let [id,pos] = item.split("-");
            pos = parseInt(pos);
            await ProductCategory.updateOne({_id: id},{position:pos})
        }
        req.flash('success',`đổi vị trí ${ids.length} sản phẩm thành công`);
        break;
    default:
        break;
   }   
    res.redirect("back");
}


//[DELETE]/admin/products/delete/:id xoá vĩnh viễn `
module.exports.deleteItem =  async (req,res)=>{
    const id = req.params.id;

    await ProductCategory.updateOne({_id: id},{
        deleted:true,
        deletedAt:new Date()});
    res.redirect('back');
}
//[get] admin/proucts-category/create
module.exports.create = async (req, res) => {
   
        let find = {
        deleted: false
    };

    const record = await ProductCategory.find(find).sort({
        position: "desc"
    });
    const newRecord = createTreeHelper.tree(record);
    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecord
    })

}

//[POST]/admin/products-category/create
module.exports.createPost = async (req, res) => {
    // const permission = res.locals.role.permission;
    // if(permission.includes("products-category_create"))
    // {
    //     console.log("có quyền");
    // }
    // else{
    //     res.send("403");
    //     return
    // }
    
    
    if (req.body.position == "") {
        const countPosition = await ProductCategory.countDocuments();
        req.body.position = countPosition + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

//[GET]/admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try{
    const id = req.params.id;

    const data = await ProductCategory.findOne({
        _id: id,
        deleted: false
    })

    const parentData = await ProductCategory.find({
        deleted: false
    })
    const newRecord = createTreeHelper.tree(parentData);
    res.render("admin/pages/products-category/edit", {
        pageTitle: "Sửa danh mục sản phẩm",
        data: data,
        records: newRecord
    });
    }
    catch(error)
    {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
}

//[PATCH]/admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
       
        const id = req.params.id;
        req.body.position = parseInt(req.body.position);
        await ProductCategory.updateOne({_id: id}, req.body);
        req.flash("success","cập nhật danh mục thành công");
    } 
    catch (error)
     {
        req.flash("error","cập nhật danh mục thất bại");
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

//[GET]/admin/products-category/detail
module.exports.detail = async (req,res)=>{
    const id = req.params.id;
    const data = await ProductCategory.findOne({_id:id});
    res.render("admin/pages/products-category/detail",{
        pageTitle:"Chi tiết Danh mục",
        data:data
    })
}