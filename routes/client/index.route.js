const productRoutes = require('./product.route') 
const homeRoutes = require('./home.route')
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes =require("./checkout.route");
const userRoutes = require("./user.route");
const chatRoutes = require('./chat.route');
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingGeneralMiddlware = require("../../middlewares/client/setting.middleware");
const authMiddlware = require("../../middlewares/client/auth.middleware");
// const authJWTMiddleware = require("../../middlewares/client/authjwt.middleware");
module.exports = (app)=>{ 
    app.use(cartMiddleware.cartId);
    app.use(categoryMiddleware.category);
    app.use(userMiddleware.infoUser);
    app.use(settingGeneralMiddlware.settingGeneral);
    
    app.use('/',homeRoutes);
    app.use("/products",productRoutes);
    app.use("/search",searchRoutes);
    app.use("/cart",cartRoutes);
    app.use("/checkout",checkoutRoutes);
    app.use("/user",userRoutes);
    app.use("/chat",authMiddlware.requireAuth,chatRoutes);
}

