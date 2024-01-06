import mongoose, { Schema } from "mongoose";


const RegisterSchema = new Schema({
    name: {
        type: String,
        required:[true,'Please enter the name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter the email address'],
        unique:true,
    },
    password: {
        type: String,
        required: [true,'Please enter the password']
    }
    
}, {
    timestamps:true
})

const Signup = mongoose.models.Signup || mongoose.model('Signup', RegisterSchema);
export default Signup;