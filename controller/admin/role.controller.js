const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

//[GET] admin/roles
module.exports.index = async(req,res)=>{
    let find={
        deleted:false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/index",{
        pageTitle:"Nhóm quyền",
        records:records
    })
}

 
//[GET] admin/roles/create
module.exports.create = async(req,res)=>{
    res.render("admin/pages/roles/create",{
        pageTitle:"Nhóm quyền"
    })
}

 
//[POST] admin/roles/create
module.exports.createPost = async(req,res)=>{
    const records = new Role(req.body);
    await records.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//[GET] admin/roles/edit/id
module.exports.edit = async(req,res)=>{
    let find={
        deleted:false
    }
    const id = req.params.id;
    const records = await Role.findOne({_id:id},find);
    res.render("admin/pages/roles/edit",{
        pageTitle:"Nhóm quyền",
        records:records
    })
}


//[PATCH] admin/roles/edit/id
module.exports.editPatch = async(req,res)=>{

    const id = req.params.id;
    await Role.updateOne({_id:id},req.body);
    
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//[DELETE] admin/roles/delete/id
module.exports.delete = async(req,res)=>{
    const id = req.params.id;
    
    await Role.updateOne({_id: id},{
        deleted:true,
        deletedAt:new Date()});
    res.redirect('back');
}

//[GET] admin/roles/permissions
module.exports.permissions = async(req,res)=>{
    let find={
        deleted:false,
    }
    const records = await Role.find(find);

    res.render("admin/pages/roles/permissions",{
        pageTitle:"Phân quyền",
        records:records
    })
}

//[Patch] admin/roles/permissions
module.exports.permissionsPatch = async(req,res)=>{
    try{
        const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        await Role.updateMany({_id:item.id},{permission:item.permissions});
    }
    req.flash("success","cập nhật phân quyền thành công");   
}
    catch(error)
    {
        req.flash("error","Cập nhật quyền thất bại");
    }
res.redirect("back");
}
