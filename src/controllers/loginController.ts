import express, { NextFunction, Request, Response} from 'express';
import * as db from 'rethinkdb'; // RethinkDB'yi içe aktarın
import { conn } from '../database/databaseConnection';
import bcyript from 'bcrypt';
import { userModel } from '../models/userModel'
import 'express-async-errors';
import { ClientSideException } from '../utils/errors';
import response from '../utils/response'
import {createToken} from '../middlewares/auth'


const login = async (req: Request, res: Response,next:NextFunction) => {
   const {username,password}=req.body;

   const connection=await conn(); 

   //kullanıcı adını veritabanında var mı diye arayacağım
   const userInfo=await db.table("users")
   .filter(db.row('username').eq(username))
   .run(await connection);
   //eğer varsa diye diziye çevireceğim
   const user= await userInfo.toArray(); //dizi bir tane elemana sahip olunca doğru kabul edeceğim

   if(user.length===0){
        throw new ClientSideException("Email ya da şifre hatalıdır",401);
   }
//    console.log(user[0]);

   //hash lediğimiz şifreyi çözümlüyoruz
   const comparePassword=await bcyript.compare(password,user[0].password);
   console.log(comparePassword); //true ya da false döner

   if (!comparePassword) {
    throw new ClientSideException("Kullanıcı adı veya şifre hatalıdır", 401);
}
// res.json({ message: "Giriş başarılı!" });
createToken(user[0],res);

}


export { login};
