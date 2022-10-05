const express = require('express');
const router = express.Router()
const eventController = require("../controllers/eventController");
const {eventCreate} = eventController;

router.post('/event/create',eventCreate )




module.exports = router;
