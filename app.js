const express = require('express')
const app = express()
const port = 4000
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
const fileUpload = require('express-fileupload')
const  cookieParser = require ('cookie-parser')
const cors = require("cors");

require("dotenv").config();

app.use(cookieParser())

//token get cookie
app.use(
    cors({
    origin: "http://localhost:5173", //your frontend domain
    credentials: true, //allow credentials (cookies)
    }));

//image upload 
app.use(fileUpload({
    useTempFiles: true,

}));

//connect db
connectDb()

app.use(express.json())



app.use('/api', web) //localhost:4000/api/
app.listen(process.env.PORT, console.log('server started at  ',port))
