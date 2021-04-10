const express = require('express');
const router = express.Router();
const AppointmentDetails=require('../models/AppointmentDetails');

/*
User Story 1170
Appointment info(Backend)
*/

router.use("", require("../crud")(AppointmentDetails));

module.exports = router;
