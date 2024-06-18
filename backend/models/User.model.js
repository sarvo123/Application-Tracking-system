import mongoose from 'mongoose';

// User Schema 
const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , require : true},
    password : {type : String , required : true},
    role : {type : String , enum : ['Candidate' ,'Recruiter' , 'Coordinator' , 'Employer']},
},{timestamps : true});

const User =mongoose.model("User" , userSchema);

export default User;