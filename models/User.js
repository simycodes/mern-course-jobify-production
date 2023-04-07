// IMPORT MONGOOSE AND VALIDATOR PACKAGES
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please Provide Your Name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please Provide Your Email'],
        unique: true, 
        validate : { // THIS IS CUSTOM VALIDATOR FUNCTION(reference used) ADDED AS PROPERTY-OBJECT
            validator: validator.isEmail, // validator.Email checks if email is valid -validator: is coming from library,its not user defined
            message: 'Please provide a valid email',
        }
    },
    password: {
        type: String,
        required: [true, 'Please Provide Your Password'],
        minlength: 6,
        select: false, // this prevents the password from being returned to the user
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'Your Last Name',
        
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'Your City',
    }
});

// SET UP THE MIDDLEWARE - THE pre CALLS THE MIDDLEWARE TO PROCESS THE USER OBJECT/DOCUMENT
// BEFORE IT IS SAVED - SOME OF THESE MIDDLEWARE REFEREED AS pre HERE ARE User.findOne()
UserSchema.pre('save', async function(){
    // console.log(this.modifiedPaths()); // DISPLAY VALUES/PATH/FIELD BEING UPDATED IN THE UPDATE ROUTE
    // console.log(this.isModified('name')); // checks if a given path/field is being updated - in this case is name of user being updated
    if(!this.isModified('password')) return 
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);  
});

// CREATING CUSTOM MONGOOSE MIDDLEWARE FOR CREATING JWT - .methods is a key word/property
// createJWT IS A USER DEFINED NAME FOR THE CUSTOM MIDDLEWARE
UserSchema.methods.createJWT = function () {
    // console.log(this); // THIS PRINTS THE NEWLY CREATED USER OBJECT WITH ENTERED USER DETAILS 
    // USER ID,THE JWT SECRET KEY CODE AND THE EXPIRY TIME USED TO CREATE A JWT TOKEN
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME  });
}

// FUNCTION TO COMPARE USER PASSWORD TO DATABASE PASSWORD ON LOGIN
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// NOTE:
// When the authorization is granted, the authorization server returns an access token to 
// the application.
// The application uses the access token to access a protected resource (like an API).

// use function defined with function not arrow function when using mongoose middleware we 
// can interact or refer to the file being processed and saved using this key word.

export default mongoose.model('User', UserSchema);
