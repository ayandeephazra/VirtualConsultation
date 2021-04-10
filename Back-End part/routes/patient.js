const express = require('express');
const router = express.Router();
const PatientDetails=require('../models/PatientDetails');

//md: by Rashid
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

//token
const generateToken = patient => {
    return jwt.sign({ PatientId: patient.PatientId, Password: patient.Password, Mobile:patient.Mobile }, 'SUPERSECRET123');
}
/*
User Story 1188
Patient Registration
*/
// router.use("", require("../crud")(PatientDetails));

/*
User Story 1188
Patient Registration
*/
//md: modified the validation and hash password
router.post('/registerPatient', validate, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const patientMobileExist =  await PatientDetails.findOne({Mobile: req.body.Mobile});
    if (patientMobileExist) return res.status(400).send('Phone Number already exisits');

    var post = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(post.Password, salt);

    //generate patient id
    var patientId;

    const obj = new PatientDetails({
        DateOfBirth: post.DateOfBirth,
        Gender: post.Gender,
        Email: post.Email,
        PatientId: patientId,
        FullName: post.FullName,
        DateOfBirth: post.DateOfBirth,
        Gender: post.Gender,
        Mobile: post.Mobile,
        Email: post.Email,
        Password: hashPassword
    })
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();

})

/*
Patient Login
*/
//md:
router.post('/loginPatient', async (req, res) => {
    // check if full name exist
    const patient = await PatientDetails.findOne({Mobile: req.body.Mobile});
    if (!patient) return res.status(404).send('Patient is not registerd');

    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.Password, patient.Password); 
    if (!validPassword) return res.status(405).send('Invalid Full Name or Password');

    //create and assign a token
    const token = generateToken(patient);
    res.header('auth-token', token).send({message:'Logged in successfully', token});
})

module.exports = router;
