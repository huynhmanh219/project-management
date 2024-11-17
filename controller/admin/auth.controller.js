const Account = require("../../models/account.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");
//[GET] /admin/auth/login
module.exports.login = (req,res) => {
    res.render("admin/pages/auth/login",{
        pageTitle:"Đăng nhập"
    });
}

//[POST] /admin/auth/login
module.exports.loginPOST = async (req,res) => {
    const {email,password} = req.body;

    const user = await Account.findOne({
        email:email,
        deleted:false
    });
    if(!user){
        req.flash("error","Email này không tồn tại");
        res.redirect("back");
        return ;
    }
    if(md5(password) != user.password)
    {
        req.flash("error","Sai mật khẩu");
        res.redirect("back");
        return;
    }
    if(user.status != "active")
    {
        req.flash("error","Tài khoản đang bị khoá");
        res.redirect("back");
        return;
    }
    res.cookie("token",user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}