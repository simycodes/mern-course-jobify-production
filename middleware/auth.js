import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js'

// FUNCTION TO AUTHENTICATE EACH USER ACCESSING A PROTECTED ROUTE
const auth = async (req, res, next) => {
  // CHECK IF THE COOKIES HAVE JWT TOKEN
  console.log(req.cookies);
  const token = req.cookies.token; 
  if(!token) {
    throw new UnAuthenticatedError('Authentication invalid');
  }

  // BELOW CODE FOR GETTING TOKEN WHEN SENT IN THE AUTHORIZATION HEADER AND NOT VIA COOKIES
  // CHECK IF HEADERS HAVE THE BEAR WITH JWT TOKE
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new UnAuthenticatedError('Authentication invalid');
  // }
  // // SPLIT THE TOKEN INTO TWO(AN ARRAY) AND GET THE SECOND PART(THE ACTUAL TOKEN - LEAVE 'Bear' TEXT)
  // const token = authHeader.split(' ')[1];

  try {
    // jwt.verify() method returns a payload which holds userId()that is then used to 
    // modify the database,other returned values is when the token was initialized and when it will expire.
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload); 
    // TEST USER FUNCTIONALITY - CHECK IF ITS A TEST USER THAT IS LOGGED IN - IMPLEMENT READ ONLY
    const testUser = payload.userId === "64280b74e081ea51f24d41a8";
    // payload is: { userId: '63e69ee471eea96576349459', iat: 1676480115, exp: 1676566515 }
    // testUser will either be true or false if test user is logged in or not
    req.user = { userId: payload.userId, testUser };
    // USE JWT TOKEN TO AUTHENTICATE USER AND GET AND PASS THE USER ID IN THE req  TO USE
    // TO IDENTITY THE USER HENCE FORTH AND MANIPULATE THE DATABASE USING THIS USER ID

    next();
  } catch (error) {
    // IF THE JWT IN RECEIVED IS NOT VALID OR HAS EXPIRED-THROUGH UnAuthenticatedError()
    // WHICH THEN LOGS OUT THE USER VIA THE authFetch.interceptors.response.use() IN appContext.js
    throw new UnAuthenticatedError('Authentication invalid');
  }
};

export default auth;

// BASIC SETUP - FUNCTION TO AUTHENTICATE EACH USER ACCESSING A PROTECTED ROUTE
// const auth =  async(req, res, next) => {
//     // console.log('authenticate user');
//     // const headers = req.headers;
//     // console.log(headers);
//     const authHeader = req.headers.authorization;
//     // console.log(authHeader);
//     // CHECK IF USER IS AUTHORIZED TO ACCESS A ROUTE/RESOURCE
//     if(!authHeader) {
//         // THROW ERROR IS USER IS NOT AUTHORIZED
//         throw new UnAuthenticatedError('Authentication Invalid');
//     }
//     next();
// }

// export default auth;