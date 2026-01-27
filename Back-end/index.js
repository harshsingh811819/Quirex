import express from 'express';
import {dbConnect} from './config/db.js'
import router from './route/userRoute.js';
import fileUpload from 'express-fileupload';

const PORT = 9000;
const app = express();
app.use(express.json());//enable json
app.use(fileUpload());//enable file upload
dbConnect();

app.use('/api',router);

app.listen(PORT,()=>{
    console.log("Server is running...");
})