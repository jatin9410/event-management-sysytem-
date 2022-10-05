const express = require('express');
const router = express.Router()
const inviteController = require("../controllers/inviteController");
const {inviteCreate} = inviteController;

router.post('/invite/create',inviteCreate )




module.exports = router;