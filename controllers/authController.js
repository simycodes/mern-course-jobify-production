// GET THE USER MODEL TO USE IN CONTROLLER WITH THE DB
import User from '../models/User.js'; // add .js extension when working with ES6 modules on
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import attachCookies from '../utils/attachCookies.js'

// ROUTE TO REGISTER A USER
const register = async (req, res) => {
    // VALIDATE VALUES (EMPTY) IN CONTROLLER COMING FROM THE USER
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        throw new BadRequestError('Please provide all values'); // WAY TO THROW ERROR IF express-async-errors package IS USED
        // IN ERROR MIDDLEWARE THIS BE DISPLAYED THROUGH - msg: err.message
        // next(err) - // WAY TO THROW ERROR IF express-async-errors package IS NOT USED
    }
    // VALIDATE IF EMAIL IS UNIQUE
    const userEmailAlreadyExists = await User.findOne({ email });
    if(userEmailAlreadyExists){
        throw new BadRequestError('The email is already in use. Please use another email');
    }
   
    // CREATE A NEW USER IN THE DATABASE - SAVING IS DONE WITH MIDDLEWARE IN User.js
    const user = await User.create({name, email, password});

    // CREATE JWT - FUNCTION IS IN User.js
    const token = user.createJWT();
    // SET UP A COOKIE TO HOLD THE JWT - NO NEED TO SEND THE TOKEN TO BACKEND ANYMORE IN
    // ORDER TO STORE IT LOCAL STORAGE AS STORAGE IS NOW DONE BY THE COOKIES IN THE BROWSER
    attachCookies({ res, token });

    // SENDING BACK RESPONSE - SENDING OBJECT PROPERTIES 'email: user.email' TO AVOID SENDING
    // BACK PASSWORD TO THE USER FROM THE DATABASE
    res.status(StatusCodes.CREATED).json({ 
        user: {
            email: user.email, 
            lastName: user.lastName,
            location: user.location,
            name: user.name
        }, 
        location: user.location, 
    });
}

// NOTE:
// When the authorization is granted, the authorization server returns an access token to 
// the application.
// The application uses the access token to access a protected resource (like an API).

// USING try and catch DIRECTLY AND PASSING ERROR TO USING next() TO THE ERROR HANDLER
// DIRECTLY -- NO PACKAGE try and catch and http-status-codes USED
// const register = async (req, res, next) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(200).json({user});
//     } catch (error) {
//         // next() LINKS A CONTROLLER TO MIDDLEWARE FUNCTIONS
//         // PASS ERROR TO ERROR HANDLER MIDDLEWARE FUNCTION - NO NEED TO IMPORT HERE
//         next(error);
//         // res.status(500).json({ msg: error.message}); - This shows the email error message
//     }
// }

// ROUTE TO LOGIN A USER
const login = async (req, res) => {
  // GET THE USER LOGIN DETAILS
  const { email, password } = req.body;

  // VALIDATE IF EMAIL AND PASSWORD IS NOT EMPTY
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  // GET THE USER FROM THE DATABASE USING THE EMAIL ENTERED -
  // .select('+password'); HELPS GET RETURN PWD FROM DB AS IT RESTRICTED BY DEFAULT +, SET BY select in user model
  const user = await User.findOne({ email }).select('+password');
  // CHECK IF THE USER EXISTS IN THE DATABASE (IS REGISTERED USER)
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  // COMPARE USER ENTERED PASSWORD WITH DB DATABASE - await user. PASSES DB PASSWORD TO 
  // FUNCTION comparePassword, password IS USER ENTERED PASSWORD
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  // CREATE SESSION USER TOKEN - user.createJWT(); CALLS UserSchema.methods.createJWT = function () {} IN user model
  const token = user.createJWT();
  // REMOVE THE PASSWORD FROM THE CLIENT SIDE AFTER COMPARING IS DONE
  user.password = undefined;
  // SET UP A COOKIE TO HOLD THE JWT
  attachCookies({ res, token });
 
  // SEND BACK THE REQUEST STATUS AND USER DATA TO THE FRONT END
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

// ROUTE TO UPDATE A USER
const updateUser = async (req, res) => {
  console.log("Shani apo!");
  console.log(req.user); // THIS NOW HOLDS USER ID - AFTER AUTHENTICATION WITH jwt.verify() - { userId: '63e69ee471eea96576349459' }
  // res.send("update user working");
  const { email, name, lastName, location } = req.body;
  // VALIDATE THAT ALL INCOMING DATA IS NOT EMPTY
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }
  // FIND THE USER IN THE DB USING HIS USER ID
  const user = await User.findOne({ _id: req.user.userId });
  // MAKE THE UPDATE TO THE USER DETAILS WITH NEW INCOMING DATA
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  // UPDATE THE NEW USER DETAILS - user.save(); CALLS UserSchema.pre('save',) middleware
  // that may cause some update errors, hence use of if(!this.isModified('password')) expression in the middleware
  await user.save(); 
  // CREATE NEW token 
  const token = user.createJWT();
  // SET UP A COOKIE TO HOLD THE JWT
  attachCookies({ res, token });
  // SEND BACK NEW UPDATED USER INFORMATION TO THE FRONTEND
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
}

// ROUTE TO GET CURRENT LOGGED USER AFTER A PAGE REFRESH
const getCurrentUser = async (req, res) => {
  // req.user.userId IS GENERATED BY const payload = jwt.verify(token, process.env.JWT_SECRET);
  // AND req.user = { userId: payload.userId, testUser }; - MAINLY USED JWT FROM COOKIE
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

// ROUTE TO LOG OUT THE USER( DESTROY THE JWT COOKIE)
const logout = async (req, res) => {
  res.cookie('token', 'logout', { // in making cookie - logout will hold actual token to be stored as cookie - here logout is just an empty string
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};


export { register, login, updateUser, getCurrentUser, logout };