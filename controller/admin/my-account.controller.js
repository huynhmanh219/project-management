const Account = require("../../models/account.model");
const md5 = require("md5");
//[GET] /admin/my-account
module.exports.index = (req,res) =>{
    res.render("admin/pages/my-account/index",{
        pageTitle:"Thông tin cá nhân"
    })

}


//[GET] /admin/my-account/edit
module.exports.edit = async (req,res) =>{
    res.render("admin/pages/my-account/edit",{
        pageTitle:"Chỉnh sửa thông tin cá nhân"
    })

}

//[Patch] /admin/my-account/edit
module.exports.editPatch = async (req,res) =>{
    const id = res.locals.user.id;
    const emailExist = await Account.findOne({
        _id:{$ne:id},// $ne =  not equal (những id không bằng id này)
        deleted:false,
        email:req.body.email
    })
   
    if(emailExist)
    {
        req.flash("error",`Email ${req.body.email} đã tồn tại !!!!`);
    }
    else{ 

        if(req.body.password) 
        {
            req.body.password = md5(req.body.password);
        }
        else{
            delete req.body.password; //xoá thuộc tính delete khi mà người dùng k muốn sửa lại password trong object(req.body)
        }
        await Account.updateOne({_id: id},req.body);  
        req.flash("success","Cập nhật tài khoản thành công");
    }
    res.redirect('back');
}