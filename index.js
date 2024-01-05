const express = require('express')

const router = require('./src/routes/index')
const { gatewayFunction } = require('./src/gateway/gateway')
const application = express()

application.use(express.json())
application.use(express.static('.'))

const server = application.listen(3000, async () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('\n\nserver running on :',server.address())
    try {
        console.log(" \n\t\t!... GateWay connection Initating ...!")
    }
    catch (e) {
        console.log("error message  : ", e.message)
    }
})

application.use('/api', ( req, res, next) => {
    next()
},router)