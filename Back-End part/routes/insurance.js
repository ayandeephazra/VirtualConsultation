const express = require('express');
const router = express.Router();
const InsuranceDetails=require('../models/InsuranceDetails');

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
router.post('/validate',(req,res,next)=>{
    var post=req.body;
    InsuranceDetails.findOne(
                                {
                                    'FirstName':post.FirstName,
                                    'LastName':post.LastName,
                                    'InsuranceId':post.InsurancId,
                                    'PolicyNumber':post.PolicyNumber
                                },function(err,data)
                                {
                                    if(err)
                                    {
                                        console.log('error occured in "/validateInsuranceDetails"');
                                    }
                                    else if(data==null)
                                    {
                                        res.status(200).json({
                                            message:'Not Matched'
                                        });
                                        res.send();
                                    }
                                    else
                                    {
                                        res.status(200).json({
                                            message:'Matched'
                                        });
                                        res.send();
                                    }
                                }
                            );
});

module.exports = router;