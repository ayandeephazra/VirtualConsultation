const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const API = express();
const InsuranceDetails = require('./models/InsuranceDetails');
const DiseaseDescription = require('./models/DiseaseDescription');
const PatientDetails = require('./models/PatientDetails');
const AppointmentDetails = require('./models/AppointmentDetails');
const DoctorDetails = require('./models/DoctorDetails');
const NewsLetterSubscription = require('./models/NewsLetterSubscription');
const nodemailer = require('nodemailer');
const moment = require('moment');
const cron = require("node-cron");
const Prescription = require('./models/Prescription');
const FeedBack = require('./models/FeedBack');
const DoctorCalender = require('./models/DoctorCalender')
const Medication = require('./models/Medication');
const InsurancePolicy = require('./models/InsurancePolicy');
const InsuranceInstallmentAmountDue = require('./models/InsuranceInstallmentAmountDue');
const InsuranceInstallmentDetails = require('./models/InsuranceInstallmentDetails');
const PrescriptionMedicines = require('./models/PrescriptionMedicines');
const AppointmentType = require('./models/AppointmentType');
var schedule = require('node-schedule');
const ProcedueDetails = require('./models/ProcedureDetails');
const HealthDetails = require('./models/HealthDetails');
const Test = require('./models/Test');
const MyBill = require('./models/MyBill');
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

// old version: mongoose.connect('mongodb+srv://ismileTechnologies:VirtualConsultationIsmileTech@cluster0.ceonx.mongodb.net/actual?retryWrites=true&w=majority',{'useUnifiedTopology':true})
// old database is not working
// test database url:
mongoose.connect('mongodb+srv://svc-vc-mongodb:0cSUyhHjHzKrGZZq@cluster0.k9spq.mongodb.net/svc-vc-mongodb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database connected');
    })
    .catch(() => {
        console.log('database connectivity failed');
    });

API.use(cors());
API.use(bodyParser.json());
API.use(bodyParser.urlencoded({ extended: false }));

/*
Store Bill Item
*/
API.post('/storeBillItem', (req, res, next) => {
    var post = req, body;

    var obj = new MyBill({
        PatientId: post.PatientId,
        Type: post.Type,
        Cost: post.Cost,
        Status: post.Status,
        Description: post.Description
    })
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();
})


/*
User Story 1734
Bill estimate(backend)
*/
API.post('/getmybill', (req, res, next) => {
    var post = req.body;

    MyBill.findMany({ 'PatientId': post.PatientId, 'Status': 'Pending' }, function (err, data) {
        if (data.length == 0) {
            res.status(200).json({
                message: 'no bills due'
            });
            res.send();
        }
        else {
            res.status(200).json({
                message: 'success',
                information: data
            });
            res.send();
        }
    });
})


/*
User Story 1733
upcoming procedure (backend)
when fixing a procedure make call to this API
*/
API.post('/setUpcomingProcedure', (req, res, next) => {
    var post = req.body;

    var day = post.day, month = post.month, year = post.year, hour = post.hour, minute = post.minute; // convert input timestamp to day,month
    var TimeStampValue = "1020"; // convert time stamp to value

    var obj = new ProcedueDetails({
        'PatientId': post.PatientId,
        'DoctorId': post.DoctorId,
        'Place': post.Place,
        'Timestamp': post.Timestamp
    });
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'control.VirtualConsultation@gmail.com',
            pass: 'Virtual@paras'
        }
    });

    if (day == 1) {
        if (month == 1) {
            month = 12;
            year = year - 1;
        }
        else {
            month = month - 1;
        }
        day = new Date(year, month, 0).getDate();
    }
    else {
        day = day - 1;
    }

    obj.save();
    time = '0 ' + minute + ' ' + hour + ' ' + day + ' ' + month + ' *';
    var j = schedule.scheduleJob(time, function () {

        PatientDetails.findOne({ 'PatientId': post.PatientId }, function (r, d) {
            if (d != null) {

                var message = `<h1>Virtual Consultation</h1><br>Hi, This is the reminder for your procedure at ` + post.Place + ' on ';
                message = message + TimeStampValue;

                const mailOptions = {
                    from: 'control.VirtualConsultation@gmail.com', // sender address
                    to: d.Email, // list of receivers
                    subject: 'Reminder for Procedure', // Subject line
                    html: message // plain text body
                };

                mailTransporter.sendMail(mailOptions, function (err, d) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        ;
                    }
                });
            }
        })

    });
});


/*
User Story 1605
Health tracking(backend)

start
*/

// push updates
API.post('/pushHealthTrackDetails', (req, res, next) => {
    var post = req.body;

    var obj = new HealthDetails({
        'PatientId': post.PatientId,
        'Timestamp': post.Timestamp,
        'Weight': post.Weight,
        'BloodPressure': post.BloodPressure,
        'StepsWalk': post.StepsWalk,
        'StepsWalkFromTimestamp': post.StepsWalkFromTimestamp,
        'StepsWalkToTimestamp': post.StepsWalkToTimestamp
    });
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();
})

// generate report
API.post('/generateHealthTrackReport', (req, res, next) => {
    var post = req.body;

    HealthDetails.findMany({ "PatientId": post.PatientId }, function (err, data) {
        if (!err) {
            res.status(200).json({
                message: 'success',
                information: data
            });
            res.send();
        }
    })

})
/*
User Story 1605
Health tracking(backend)

end
*/


/*
User Story 1032
Fee payment(backend)
=>it validate the details

    {
        FirstName:
        LastName:
        InsuranceId: 
        PolicyNumber:
    }
*/
API.post('/validateInsuranceDetails', (req, res, next) => {
    var post = req.body;
    InsuranceDetails.findOne(
        {
            'FirstName': post.FirstName,
            'LastName': post.LastName,
            'InsuranceId': post.InsurancId,
            'PolicyNumber': post.PolicyNumber
        }, function (err, data) {
        if (err) {
            console.log('error occured in "/validateInsuranceDetails"');
        }
        else if (data == null) {
            res.status(200).json({
                message: 'Not Matched'
            });
            res.send();
        }
        else {
            res.status(200).json({
                message: 'Matched'
            });
            res.send();
        }
    }
    );
});

/* User Story 1187 
Track of Availability
    Given minimum and maximum dates for a desired appointment,
    This route returns all appointments of a specific doctor along with his / her regular calendar 
    Frontend can then work out availability of the time period they desire and disable double-booking
*/
/* request body must have the following:
    {
        min : earliest date-time of appointment, in javascript date type format,
        max : latest date-time of appointment, in javascript date type format
    }
*/
router.get('/appointments/:id', (req, res, next) => {
    AppointmentDetails.find({
        DoctorId: req.params.id,
        startTime: { $gte: req.body.min },
        endTime: { $gte: req.body.min }
    }).sort({ startTime: 1 }
    ).then(
        (appointments) => {
            DoctorDetails.findOne({
                DoctorId: req.params.id
            }).then(
                (doctor_cal) => {
                    res.status(200).json(
                        {
                            appointments: appointments,
                            doctor_cal: doctor_cal
                        }
                    );
                }
            )

        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

/*
User Story 1189
Acknowledgement confirmation
*/
API.post('acknowledgeConfirmation', (req, res, next) => {

    var post = req.body;

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'control.VirtualConsultation@gmail.com',
            pass: 'Virtual@paras'
        }
    });


    PatientDetails.findOne({ 'PatientId': post.PatientId }, function (err, data) {
        if (data != null) {
            AppointmentDetails.findOne({ 'AppointmentId': post.AppointmentId }, function (e, d) {

                if (d != null) {
                    var message = `<h1>Virtual Consultation</h1><br>`;// add Appointment details in this mail

                    const mailOptions = {
                        from: 'control.VirtualConsultation@gmail.com', // sender address
                        to: data.Email, // list of receivers
                        subject: 'Acknowledgement for Appointment Confirmation', // Subject line
                        html: message // plain text body
                    };

                    mailTransporter.sendMail(mailOptions, function (er, da) {
                        if (er) {
                            console.log(er);
                        }
                        else {
                            res.status(200).json({
                                message: 'success'
                            });
                            res.send();
                        }
                    });
                }
            });
        }
    })
});

/*
User Story 1586
health trends(backend)
*/
API.post('/getHealthTrends', (req, res, next) => {

    var post = req.body;
    HealthDetails.findMany({ 'PatientId': post.PatientId }, function (err, data) {
        if (data != null) {
            res.status(200).json({
                message: 'success',
                information: data
            });
            res.send();
        }
        else {
            res.status(200).json({
                message: 'no record found'
            });
            res.send();
        }
    })


})

/*
User Story 1584
test result(backend)
*/
API.post('/sendTestResultNotification', (req, res, next) => {
    var post = req.body;

    var obj = Test({
        PatientId: post.PatientId,
        Link: post.Link
    });
    obj.save();

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'control.VirtualConsultation@gmail.com',
            pass: 'Virtual@paras'
        }
    });

    var message = `<h1>Virtual Consultation</h1><br>
    Your test result is ready, kindly access it from the link`+ post.Link;


    PatientDetails.findOne({ 'PatientId': post.PatientId }, function (err, data) {
        if (data != null) {
            const mailOptions = {
                from: 'control.VirtualConsultation@gmail.com', // sender address
                to: data.Email, // list of receivers
                subject: 'Test Result Ready', // Subject line
                html: message // plain text body
            };

            mailTransporter.sendMail(mailOptions, function (er, da) {
                if (er) {
                    console.log(er);
                }
                else {
                    res.status(200).json({
                        message: 'success'
                    });
                    res.send();
                }
            });
        }
    })
})



/*
User Story 1188
Patient Registration
*/
//md: modified the validation and hash password
// API.post('/registerPatient', validate, async (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     const patientMobileExist =  await PatientDetails.findOne({Mobile: req.body.Mobile});
//     if (patientMobileExist) return res.status(400).send('Phone Number already exisits');

//     var post = req.body;

//     const salt = bcrypt.genSaltSync(10);
//     const hashPassword = bcrypt.hashSync(post.Password, salt);

//     //generate patient id
//     var patientId;

//     const obj = new PatientDetails({
//         DateOfBirth: post.DateOfBirth,
//         Gender: post.Gender,
//         Email: post.Email,
//         PatientId: patientId,
//         FullName: post.FullName,
//         DateOfBirth: post.DateOfBirth,
//         Gender: post.Gender,
//         Mobile: post.Mobile,
//         Email: post.Email,
//         Password: hashPassword
//     })
//     obj.save();
//     res.status(200).json({
//         message: 'success'
//     });
//     res.send();

// })

// /*
// Patient Login
// */
// //md:
// API.post('/patientLogin', async (req, res, next) => {
//     // check if full name exist
//     const patient = await PatientDetails.findOne({FullName: req.body.FullName});
//     if (!patient) return res.status(404).send('Patient is not registerd');
//     // check if password is correct
//     const validPassword = bcrypt.compareSync(req.body.Password, patient.Password); 
//     if (!validPassword) return res.status(404).send('Invalid Full Name or Password');
//     //create and assign a token
//     const token = jwt.sign({_id: patient._id, Mobile:patient.Mobile}, 'SUPERSECRET123')

//     res.header('auth-token', token).send({message:'Logged in successfullt', token});
// })

/*
User Story 1170
Appointment info(Backend)
*/
API.post('/getAppointmentInfo', (req, res, next) => {
    var post = req.body;
    AppointmentDetails.findOne({ 'AppointmentId': post.AppointmentId }, function (err, data) {
        if (data == null) {
            res.status(200).json({
                message: 'not found'
            });
            res.send();
        }
        else {
            res.status(200).json({
                message: 'success'
            });
            res.send(data);
        }
    });


});



/*
User Story 1021
form having disease description (backend)
*/
API.post('/addDiseaseDescription', (req, res, next) => {
    var post = req.body;
    const obj = new DiseaseDescription({
        SymptomName: post.SymptomName,
        SymptomSeverity: post.SymptomSeverity
    });
    console.log(obj);
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();

});


/*
User Story 1135
FeedBack (backend)
*/
API.post('/postFeedBack', (req, res, next) => {

    var post = req.body;
    const obj = new FeedBack({
        RatingForOverallSatisfaction: post.RatingForOverallSatisfaction,
        RatingForDoctor: post.RatingForDoctor,
        RatingForService: post.RatingForService,
        Comments: post.Comments
    });
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();
});


/*
User Story 668
Demographic info of patient form(Backend)
*/
API.post('/addPatientDetails', (req, res, next) => {

    var post = req.body;
    const obj = new PatientDetails
        ({
            FirstName: post.FirstName,
            LastName: post.LastName,
            DateOfBirth: post.DateOfBirth,
            Gender: post.Gender,
            Mobile: post.Mobile,
            Email: post.Email,
            Password: post.Password
        });

    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();
});


/*
User Story 681
Provide access to the patient document before VC
*/
API.post('/sendPatientDocumentToDoctor', (req, res, next) => {

    res.download(post.AppointmentId, 'PatientDocuments_AppointmentId_' + post.AppointmentId);
    res.status(200).json({
        messgae: 'success'
    });
    res.send();
});


/*
User Story 1092
Book an appointment
*/
API.post('/fixAnAppointment', (req, res, next) => {
    var post = req.body;
    var appointmentId // generate appointment id

    //search Doctor Name and find its id and save it with appointment

    var timestamp = 1594280700;


    var inverseOffset = moment(timestamp).utcOffset() * -1;
    timestamp = moment().utcOffset(inverseOffset);

    // This should give you the accurate UTC equivalent.
    console.log(timestamp.toISOString());

    var dateString = moment.unix(timestamp).format("MMMM DD YYYY, h:mm:ss a'");
    console.log(dateString);


    // convert momment timestamp to UTC string 


    cron.schedule("* * * * *", function () { // set time and date before 1 hour

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'control.VirtualConsultation@gmail.com',
                pass: 'Virtual@paras'
            }
        });
        var message = `<h1>Virtual Consultation</h1><br>`;// add doctor details and timing in this mail

        const mailOptions = {
            from: 'control.VirtualConsultation@gmail.com', // sender address
            to: data[i].email, // list of receivers
            subject: 'Your Appointment with the doctor in next 1 hour', // Subject line
            html: message // plain text body
        };

        mailTransporter.sendMail(mailOptions, function (err, d) {
            if (err) {
                console.log(err);
            }
        });
    });


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, appointmentId)
        }
    })

    var upload = multer({ storage: storage })

    const obj = new AppointmentDetails({
        AppointmentId: appointmentId, // change to appointmentId
        SymptomName: post.SymptomName,
        SymptomSeverity: post.SymptomSeverity,
        //UploadedDocument:post.UploadedDocument,
        TimeOfAppointment: post.TimeOfAppointment,
        DoctorId: post.DoctorId,
        PatientId: post.PatientId
    })

    obj.save();

    res.status(200).json(
        {
            messgae: 'success'
        });
    res.send();

});


/*
User Story 1021
form having disease description (backend)
*/
API.post('/findDoctors', (req, res, next) => {
    var post = req.body;

    // relate expertise, need not to be exact phrase
    DoctorDetails.findMany({ 'Expertise': post.Expertise }, { DoctorId: 1 }, function (err, data) {
        //find Doctor based upon the expertise and experience
        if (data.size() == 0) {
            res.status(200).json({
                messgae: 'No Doctor Found'
            });
            res.send();
        }
        else {
            //check how many doctors out of these are free at this time
            AppointmentDetails.findMany({ 'DoctorId': { $in: [data] }, 'TimeOfAppointment': { $nin: [post.Time] } }, function (e, d) {
                if (d.size() == 0) {
                    res.status(200).json({
                        messgae: 'No Doctor is Free'
                    });
                    res.send();
                }
                else {
                    res.status(200).json({
                        messga: 'doctors found',
                        doctor: d
                    });
                    res.send();
                }
            })
        }
    });
});


/*
User Story 1095
Newsletter subscription ( backend)
Activate Subscription
*/
API.post('/activateSubscription', (req, res, next) => {
    var post = req.body;
    var obj = new NewsLetterSubscription(
        {
            Email: post.Email,
            Phone: post.Phone
        }
    );
    NewsLetterSubscription.findOne({ $or: [{ 'Email': post.Email }, { 'Phone': post.Phone }] }, function (err, data) {
        if (data == null) {
            obj.save();
            res.status(200).json({
                message: 'successfully subscribed'
            });
            res.send();
        }
        else {
            res.status(200).json({
                message: 'already subscribed'
            });
            res.send();
        }
    })
});


/*
User Story 
Doctor Registration (backend)
*/
//md: rewrite the registerDoctor post
API.post('/registerDoctor', validate, async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var post = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(post.Password, salt);
    //generate doctor id
    // var doctorId;

    const obj = new DoctorDetails({
        DoctorId: post.DoctorId,
        FullName: post.FullName,
        Password: hashPassword,
        Qualification: post.Qualification,
        Expertise: post.Expertise,
        Experience: post.Experience
    })
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();

    // var post=req.body;
    // doctorId='0';
    // DoctorDetails.findOne({},{'DoctorId':1},{sort: {DoctorId: -1}, limit: 1},function(e,d)
    // {
    //     if(d==null)
    //     {
    //         console.log('assign new doctor id');
    //         doctorId="doctor_1000000";
    //     }
    //     else
    //     {
    //        var x=(d.DoctorId);
    //        var y= x.split('_')[1];
    //        var z=parseInt(y,10)+1;
    //        doctorId='doctor_'+z.toString();
    //     }

    //     var obj=new DoctorDetails({
    //         DoctorId:doctorId,
    //         Name:post.Name,
    //         //md - password
    //         Password = post.password,
    //         Qualification:post.Qualification,
    //         Expertise:post.Expertise,
    //         Experience:post.Experience
    //     });
    //     DoctorDetails.findOne({'Email':post.email},function(error,data){

    //         if(data==null)
    //         {
    //             obj.save();
    //             res.status(200).json({
    //                 message:'success'
    //             });
    //             res.send();
    //         }
    //         else
    //         {
    //             res.status(200).json({
    //                 message:'exists'
    //             });
    //             res.send();
    //         }
    //     });
    // });    
});

/*
Doctor Login
*/
//md:
API.post('/doctorLogin', async (req, res, next) => {
    // check if full name exist
    const doctor = await DoctorDetails.findOne({FullName: req.body.FullName});
    if (!doctor) return res.status(404).send('Doctor is not registerd');
    // check if password is correct
    const validPassword = bcrypt.compareSync(req.body.Password, doctor.Password); // true
    if (!validPassword) return res.status(404).send('Invalid Full Name or Password');
    //create and assign a token
    res.send('loged in');
})


/*
User Story 1095
Newsletter subscription ( backend)
Send Subscription Emails
*/
API.post('/provideSubscriptionUpdates', (req, res, next) => {
    var post = req.body;

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'control.VirtualConsultation@gmail.com',
            pass: 'Virtual@paras'
        }
    });

    NewsLetterSubscription.findMany({}, function (err, data) {
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                var message = `<h1>Virtual Consultation</h1><br>` + post.Message;
                const mailOptions = {
                    from: 'control.VirtualConsultation@gmail.com', // sender address
                    to: data[i].email, // list of receivers
                    subject: 'News Letter Subscription', // Subject line
                    html: message // plain text body
                };

                mailTransporter.sendMail(mailOptions, function (err, d) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            res.status(200).json({
                message: 'sent successfully'
            });
            res.send();
        }
    });
});


/* 
User Story 1097
Prescription(backend)
*/
API.post('/saveAndGivePrescription', (req, res, next) => {

    var post = req.body;
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'control.VirtualConsultation@gmail.com',
            pass: 'Virtual@paras'
        }
    });
    const obj = new Prescription({
        AppointmentId: post.AppointmentId,
        PrescriptionComments: post.PrescriptionComments
    })
    obj.save();
    AppointmentDetails.findOne({ AppointmentId: post.AppointmentId }, { PatientId: 1 }, function (err, data) {
        if (data == null) {
            res.status(200).json({
                message: 'Wrong Appointment Id'
            });
            res.send();
        }
        else {
            PatientDetails.findOne({ PatientId: data.PatientId }, { Email: 1 }, function (e, d) {
                if (d != null) {
                    var message = `<h1>Virtual Consultation</h1><br>` + post.PrescriptionComments; // Add prescription 
                    const mailOptions = {
                        from: 'control.VirtualConsultation@gmail.com', // sender address
                        to: d.email, // list of receivers
                        subject: 'Prescription for Appointment Id' + post.AppointmentId, // Subject line
                        html: message // plain text body
                    };

                    mailTransporter.sendMail(mailOptions, function (err, d) {
                        if (err) {
                            console.log(err);
                            res.status(200).json({
                                messgae: 'success'
                            });
                            res.send();
                        }
                    });
                }
            })
        }
    })
});


/*
User Story 1192
Doctor Calender
*/
API.post('/addDoctorSchedule', (req, res, next) => {

    var post = req.body;
    const obj = DoctorCalender({
        DoctorId: post.DoctorId,
        FromDate: post.FromDate,
        FromTime: post.FromTime,
        ToDate: post.ToDate,
        ToTime: post.ToTime
    });
    obj.save();
    res.status(200).json({
        message: 'success'
    });
    res.send();
})


/*
User Story 1590
Get a bill estimate from hospital(backend)

once appointment is fixed, bill will be generated for that appointment
*/

API.post('/getMyMedicationBill', (req, res, next) => {
    var post = req.body;

    Medication.findOne({ 'MedicationName': post.MedicationName }, function (err, data) {
        if (err) {
            res.status(200).json({
                message: 'error occured'
            });
            res.send();
        }
        else if (data == null) {
            res.status(200).json({
                message: 'no medication found'
            });
            res.send();
        }
        else {
            PatientDetails.findOne({ 'PatientId': post.PatientId }, function (e, d) {

                if (d != null) {
                    InsuranceInstallmentAmountDue.findOne({ 'PolicyNumber': d.PolicyNumber }, function (errr, dataa) {
                        if (dataa == null) {
                            // no amount due
                            InsurancePolicy.findOne({ 'PolicyNumber': d.PolicyNumber }, function (er, da) {
                                if (da != null) {
                                    InsuranceDetails.findOne({ 'InsuranceId': da.InsurancId }, function (ee, dd) {
                                        if (dd != null) {
                                            res.status(200).json({
                                                message: 'success',
                                                InsuranceClaimAmount: dd.ClaimAmount,
                                                CostOfCare: data.CostOfCare,
                                                DoctorsFee: data.DoctorsFee
                                            });
                                            res.send();

                                        }
                                        else {
                                            res.status(200).json({
                                                message: 'corrupted Insurance Id'
                                            });
                                            res.send();
                                        }
                                    })
                                }
                                else {
                                    res.status(200).json({
                                        message: 'corrupted policy number'
                                    });
                                    res.send();
                                }
                            });
                        }
                        else {
                            res.status(200).json({
                                message: 'insurance installment is due',
                                CostOfCare: data.CostOfCare,
                                DoctorsFee: data.DoctorsFee
                            });
                            res.send();
                        }
                    });
                }
                else {
                    res.status(200).json({
                        message: 'patient id is wrong'
                    });
                    res.send();
                }
            });
        }
    });
});

/*
UserStory 1483
medication reminder(backend)
*/
// after send prescription to the patient this is called to set alarm 
API.post('/medicationReminder', (req, res, next) => {

    var post = req.body;

    makeDateCorrect = function (day, month, year) {
        var noOfDaysInMonth = new Date(year, month, 0).getDate();
        if (day <= noOfDaysInMonth) {
            return { 'day': day, 'month': month, 'year': year };
        }
        else {
            day = 1;
            if (month == 12) {
                month = 1;
                year = year + 1;
            }
            else {
                month = month + 1;
            }
            return { 'day': day, 'month': month, 'year': year };
        }
    };

    convertTimeSlot = function (slot) {
        if (slot == 0) {
            return { 'hour': '9', 'minute': '0' }; // morning
        }
        else if (slot == 1) {
            return { 'hour': '2', 'minute': '0' } // afternoon
        }
        else if (slot == 2) {
            return { 'hour': '5', 'minute': '0' } // evening
        }
        else if (slot == 3) {
            return { 'hour': '9', 'minute': '0' } // night
        }
    };
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'control.VirtualConsultation@gmail.com',
            pass: 'Virtual@paras'
        }
    });

    Prescription.findOne({ 'PrescriptionId': post.PrescriptionId }, function (err, data) {
        if (data != null) {
            AppointmentDetails.findOne({ 'AppointmentId': data.AppointmentId }, function (er, da) {
                if (da != null) {
                    var time = da.TimeOfAppointment;  // this will be the time stamp


                    var day, month, year;
                    PrescriptionMedicines.findMany({ 'PrescriptionId': post.PrescriptionId }, function (errr, dataa) {
                        if (dataa.length != 0) {
                            for (var i = 0; i < dataa.length; i++) // for each medicine
                            {
                                var durationOfDays = dataa.DurationOfDays;
                                var medicineSlots = dataa.PartsOfDay;

                                for (var j = 1; j <= durationOfDays; j++) // for each day
                                {
                                    obj = makeDateCorrect(day + j, month, year);

                                    for (var k = 0; k < medicineSlots.length; k++) {
                                        slotObj = convertTimeSlot(medicineSlots[k]);
                                        time = '0 ' + slotObj.minute + ' ' + slotObj.hour + ' ' + day + ' ' + month + ' *';
                                        var j = schedule.scheduleJob(time, function () {

                                            PatientDetails.findOne({ 'PatientId': da.PatientId }, function (r, d) {
                                                if (d != null) {
                                                    var message = `<h1>Virtual Consultation</h1><br>Hi, Its time to take youe medicine ` + dataa.MedicationName;
                                                    message = message + ' dose amount should be ' + dataa.DoseAmount + ' and  Stomach status should be ' + dataa.StomachStatus;
                                                    message = message + ' <br>Please note its very important to take your medicines timely,<br>Thanks, Get well soon.'

                                                    const mailOptions = {
                                                        from: 'control.VirtualConsultation@gmail.com', // sender address
                                                        to: d.Email, // list of receivers
                                                        subject: 'Prescription for Appointment Id' + post.AppointmentId, // Subject line
                                                        html: message // plain text body
                                                    };

                                                    mailTransporter.sendMail(mailOptions, function (err, d) {
                                                        if (err) {
                                                            console.log(err);
                                                            res.status(200).json({
                                                                messgae: 'success'
                                                            });
                                                            res.send();
                                                        }
                                                    });
                                                }
                                            })

                                        });
                                    }
                                }
                            }
                        }
                    })
                }
            })
        }
    })


    /*
    UserStory 1598
    After visit summary(backend)
    */
    API.post('/medicationReminder', (req, res, next) => {

        var post = req.body;

        AppointmentDetails.findMany({ 'PatientId': post.PatientId }, function (err, data) {
            if (data.size == 0) {
                res.status(200).json({
                    message: 'no records found'
                });
                res.send();
            }
            else {
                res.status(200).json({
                    message: 'success',
                    records: data
                });
                res.send();
            }
        })
    });


    /*
    UserStory 1643
    total amount calculated ( backend)
    */
    API.post('/totalAmountCalculate', (req, res, next) => {

        var post = req.body;
        AppointmentDetails.findOne({ 'AppointmentId': post.AppointmentId }, function (err, data) {
            if (data != null) {
                AppointmentType.findOne({ 'AppointmentType': data.AppointmentType }, function (e, d) {
                    res.status(200).json({
                        message: 'success',
                        AppointmentType: d.AppointmentType,
                        Fee: d.Fee
                    });
                    res.send();
                })
            }
        })
    });


})
module.exports = API;