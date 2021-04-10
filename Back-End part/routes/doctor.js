const express = require('express');
const router = express.Router();
const DoctorDetails = require('../models/DoctorDetails');
const AppointmentDetails = require('../models/AppointmentDetails');
//md: 
const jwt = require('jsonwebtoken');
//md: hash password
const bcrypt = require('bcryptjs');
//md: check the validation
const { check, validationResult } = require('express-validator');
const validate = [
    check('FullName')
        .isLength({ min: 2 })
        .withMessage('Your full name is required'),

    check('Password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
]
// router.use("", require("../crud")(DoctorDetails));

/*
User Story 
Doctor Registration (backend)
*/
//md: rewrite the registerDoctor post
router.post('/registerDoctor', validate, async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const doctorMobileExist = await DoctorDetails.findOne({ Mobile: req.body.Mobile });
    if (doctorMobileExist) return res.status(400).send('Phone Number already exisits');

    var post = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(post.Password, salt);
    //generate doctor id
    // var doctorId;

    const obj = new DoctorDetails({
        DoctorId: post.DoctorId,
        FullName: post.FullName,
        Password: hashPassword,
        Mobile: post.Mobile,
        Qualification: post.Qualification,
        Expertise: post.Expertise,
        Experience: post.Experience
    })
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();
});

/*
Doctor Login
*/
//md:
router.post('/loginDoctor', async (req, res, next) => {
    // check if full name exist
    const doctor = await DoctorDetails.findOne({ FullName: req.body.FullName });
    if (!doctor) return res.status(404).send('Doctor is not registerd');

    // check if password is correct
    const validPassword = bcrypt.compareSync(req.body.Password, doctor.Password); // true
    if (!validPassword) return res.status(405).send('Invalid Full Name or Password');
    //create and assign a token
    const token = jwt.sign({ _id: doctor._id, Mobile: doctor.Mobile }, 'SUPERSECRET123');
    res.header('auth-token', token).send({ message: 'Logged in successfullt', token });
})

/*
User Story 1021
form having disease description (backend)
*/
router.post('/findDoctors', async (req, res, next) => {
    //find Doctor based upon the experience
    const findDoc = await DoctorDetails.find({ 'Experience': post.Experience });
    if (findDoc.length === 0) return res.status(404).send('No Doctor Found');
    //check how many doctors out of these are free at this time 

    const ids = [];
    for (i = 0; i < findDoc.length; i++) {
        ids.push(findDoc[i].DoctorId);
    }

    const docAppointm = await AppointmentDetails.find({ 'DoctorId': { $in: ids } });
    // 'TimeOfAppointment': { $nin: post.TimeOfAppointment}

    const noTime = [];
    for (i = 0; i < docAppointm.length; i++) {
        if (docAppointm[i].TimeOfAppointment === post.TimeOfAppointment) {
            noTime.push(docAppointm[i].DoctorId)
        }
    }
    const hasDoc = [];
    console.log(noTime)
    for (i = 0; i < docAppointm.length; i++) {
        if (!noTime.includes(docAppointm[i].DoctorId)) {
            hasDoc.push(docAppointm[i])
        }
    }

    if (hasDoc.length === 0) {
        res.status(405).json({
            message: 'No Doctor is Free'
        });
        res.send();
    }
    else {
        res.status(200).json({
            message: 'doctors found',
            doctor: hasDoc
        });
        res.send();
    }

});


module.exports = router;

