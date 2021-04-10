// need to confirm 

const mongoose=require('mongoose');
const DoctorDetails=mongoose.Schema({
    DoctorId:{type:String},
    //md: Name -> FullName
    FullName:{type:String},
    //md: add password
    Password:{type:String},
    Mobile:{type:String},
    Qualification:{type:String},
    Expertise:{type:String},
    Experience:{type:String},
    Fees:{type:String}
});
module.exports =mongoose.model("DoctorDetails",DoctorDetails);