const router = require('express').Router();
const controller = require("../../controller/admin/my-account.controller");
const authRequire= require("../../middlewares/admin/auth.middleware");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


router.get('/',authRequire.requireAuth,controller.index)

router.get('/edit',authRequire.requireAuth,
    controller.edit)

router.patch('/edit',authRequire.requireAuth,
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch)
module.exports = router