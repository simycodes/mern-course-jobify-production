// SET UP A COOKIE TO HOLD THE JWT
const attachCookies = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
   // secure: process.env.NODE_ENV - when hosted online process.env.NODE_ENV will be true
  // which will make secure to be true-meaning we send the cookie only on https protocol
  // httpOnly: true,  --  THIS ENSURES THAT ONLY THE BROWSER CAN ACCESS THE TOKEN BEING
  // CREATED - VERY IMPORTANT!
};

export default attachCookies;