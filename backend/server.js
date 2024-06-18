// Importing dependencies 
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import connectToDb from './db/connecToDb.js';
import jobPostRoutes from './routes/jobPost.routes.js';
import cookieParser from 'cookie-parser'

// Configuring the server ...
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
// middlewares ...
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes ...
// app.use('/', (req , res)=>{
//     res.send("Hello world !")
// });
app.use('/api/auth' , userRoutes)
app.use('/api/jobpost',jobPostRoutes )



app.listen(PORT ,()=>{
    connectToDb();
    console.log(`Server is live on ${PORT}`);
} );

