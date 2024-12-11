const Account = require("../../models/account.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");



//[GET] /admin/auth/login
module.exports.login = async (req,res) => {
    const user = await Account.findOne();
 
    if(req.cookies.token)
    {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    }
    else{
        res.render("admin/pages/auth/login",{
            pageTitle:"Đăng nhập"
        });
    }
    
  
}

//[POST] /admin/auth/login
module.exports.loginPOST = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    const account = await Account.findOne({
        email:email,
        deleted:false
    });
    console.log(account);
    if(!account){
        req.flash("error","Email này không tồn tại");
        res.redirect("back");
        return ;
    }
    if(md5(password) != account.password)
    {
        req.flash("error","Sai mật khẩu");
        res.redirect("back");
        return;
    }
    if(account.status != "active")
    {
        req.flash("error","Tài khoản đang bị khoá");
        res.redirect("back");
        return;
    }
    
    res.cookie("token",account.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);

}

//[GET] /admin/auth/logout
module.exports.logout = (req,res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}
