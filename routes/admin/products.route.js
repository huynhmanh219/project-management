const express = require('express');
const router = express.Router();

const multer = require('multer');//import de su dung luu hinh anh

// const storemulter = require('../../helper/storageMulter');
const upload = multer();        //{storage: storemulter()} đoạn code cấu hình lưu ảnh vào file upload
//config cloudinary
const uploadcloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product.validate");
const controller = require("../../controller/admin/product.controller");

router.get('/',controller.index);
router.patch('/change-status/:status/:id',controller.changeStatus);

router.patch('/change-multi',controller.changeMulti);
router.delete('/delete/:id',controller.deleteItem);

router.get('/create',controller.create);


router.post('/create',
    upload.single("thumbnail"),
    uploadcloud.upload,
    validate.createPost,
    controller.createPost)

router.get('/edit/:id',controller.edit);

router.get('/detail/:id',controller.detail);


router.patch('/edit/:id',
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch);

module.exports = router