import { config } from "dotenv";
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
import express from 'express';
import {conn} from './src/database/databaseConnection'
import router from './src/routers'
import errorHandler from './src/middlewares/errorHandler'
import  "express-async-errors" ;
import cors from 'cors'

//dotenv yapılandırması
dotenv.config();

const app=express();
app.use(express.json());
const connection=conn();
//middleware

app.use(cors({
    origin: "*"//tüm sitelere yönlendirme sıfır güvenlik çok ii:)
}));

const port=process.env.PORT||5000;


//apiyi kaldırdım:)
app.use("/",router)


// app.all("*",async(req:Request,res:Response,next:NextFunction)=>{
//     throw new Error("yakala")
// })


//hata yakalama
app.use(errorHandler);

app.listen(port,()=>{
console.log(`Server http://localhost:${port} çalışıyor`)
})