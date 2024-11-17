const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const Role = require("../../models/role.model");
const md5 = require("md5");

//[GET] admin/accounts
module.exports.index = async (req,res) =>{
    const find = {
        deleted:false
    }
    const records = await Account.find(find).select("-password -token"); // loại trừ các trường như password, token để bảo mật dữ liệu
    
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted:false
    })
    record.role = role;
}
    
    res.render(`admin/pages/accounts/index`,{
        pageTitle:"Danh Sách Tài Khoản",
        accounts:records
    });
}

//[GET] admin/accounts/create
module.exports.create = async (req,res) =>{

    
    const roles = await Role.find({deleted:false});
    res.render(`admin/pages/accounts/create`,{
        pageTitle:"Danh Sách Tài Khoản",
        roles:roles
    });

}

//[POST] admin/accounts/create
module.exports.createPost = async (req,res) =>{
    const emailExist = await Account.findOne({
        deleted:false,
        email:req.body.email
    })
    if(emailExist)
    {
        req.flash("error",`Email ${req.body.email} đã tồn tại !!!!`);
        res.redirect("back");
    }
    else{
        req.body.password = md5(req.body.password); 
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }

}

//[GET] admin/account/edit/id
module.exports.edit = async(req,res)=>{
    
}