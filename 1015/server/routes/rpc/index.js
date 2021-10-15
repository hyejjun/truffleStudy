const express = require('express')
const router = express.Router()
const contorller = require('./rpc.controller')

router.post('/set',contorller.set)
router.post('/setTx',contorller.setTx)

module.exports = router;