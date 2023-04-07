import express from 'express';
const app = express();
import morgan from 'morgan';
// IMPORTS BELOW HELP IN DEPLOYING THE REACT APP(HELP USE THE REACT BUILD FOLDER CONTAINING STATIC FILES NEEDED TO DEPLOY THE FRONT END REACT APP)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
// GETTING SECURITY PACKAGES
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
// PARSE INCOMING COOKIES
import cookieParser from 'cookie-parser'; 

// GETTING THE express-async-errors PACKAGE - DOING THIS IS ENOUGH TO WORK - CAN SKIP 
// USING TRY AND CATCH BLOCKS AND ALL THE TRY AND CATCH WILL BE DONE AUTOMATICALLY
import 'express-async-errors';
// import cors from 'cors'; // proxy configuration is used
// app.use(cors());

// IMPORTING THE .env FILE SO ITS VALUES CAN BE ACCESSED AND USED
import dotenv from 'dotenv';
dotenv.config();

// GETTING DB CONNECTION FUNCTION, APP ROUTER(S),  AND MIDDLEWARE
import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js'

// MIDDLEWARE - INCLUDE .JS AT END OF not-found as this ES used in Node, to pure node JS
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js'


// APP ROUTES
// WHILE DEVELOPING THE APP USE MORGAN - IN PRODUCTION DON'T USE IT
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// CREATE THE __dirname, AS ES6 HAS NO IN BUILT FOR THIS WHEN USED ON BACKEND
const __dirname = dirname(fileURLToPath(import.meta.url));
// USE THE express.static() MIDDLE TO CONNECT REACT APP USING THE build FOLDER
app.use(express.static(path.resolve(__dirname, './client/build')));

// ALLOW RECEIVING AND PARSE INCOMING JSON AND COOKIES ON POST REQUESTS ETC
app.use(express.json());
app.use(cookieParser());
// USING SECURITY PACKAGES
app.use(helmet()); // secure incoming headers
app.use(xss()); // sanitize the incoming input from post etc - avoid script attacks
app.use(mongoSanitize()); // avoid mongodb operator injection(prevent unauthorized changes on db with incoming user db operator put in the incoming data)


app.get('/api/v1', (req, res) => {
  // throw new Error('Error');
  res.json({ msg: "API Working - Full stack is working boy!" });
});

app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/jobs/', authenticateUser ,jobsRouter);

// DIRECT ALL GET REQUESTS TO THE REACT FRONT END UP (index.html in client) - CHECK 
// THIS AFTER ALL THE API OWN DEFINED ROUTES(AFTER TRYING THE API MAIN TWO ROUTES ABOVE)
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// PAGE NOT FOUND ROUTE - HANDLES ALL REQUEST NOT DEFINED IN THE SERVER - NOT ERRORS
// -- NOT URL '/' IS EVEN DEFINED HERE BEFORE PLACING THE FUNCTION ARGUMENT
app.use(notFoundMiddleware);
// ROUTE TO HANDLE ERRORS THAT RESULT FROM USER REQUESTS - PUT AS LAST ROUTES SO IT CAN
// RECEIVE ERRORS PASSED USING next() BY CONTROLLERS
app.use(errorHandlerMiddleware);


// SET THE PORT VARIABLE
const port = process.env.PORT || 5000;

// RUN THE SERVER (AFTER CONNECTING TO THE DATABASE)
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

// CALL THE START CONNECT TO DB FUNCTION
start();