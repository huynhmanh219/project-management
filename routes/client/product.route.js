const express = require('express')
const router = express.Router();
const controller = require("../../controller/client/product.controller")

router.get('/',controller.index)
router.get('/:slug',controller.slug)
router.get('/create',controller.create)
router.get('/edit',controller.edit)

module.exports = router
