const router = require("express").Router()
const { pdfController } = require('../controller/pdfController')

router.get('/downloadSignedPdf', pdfController)

module.exports = router