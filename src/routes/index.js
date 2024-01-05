const router = require("express").Router()
const pdfRoutes = require('./pdfRoutes')

router.use('/signPdf', pdfRoutes)

module.exports = router