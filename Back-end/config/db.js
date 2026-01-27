import mongoose from 'mongoose';
export const dbConnect = async() => {
   const conn = await mongoose.connect('mongodb://127.0.0.1:27017/project');
   if(conn){
    console.log("DB connected successfully.....");
   }
}