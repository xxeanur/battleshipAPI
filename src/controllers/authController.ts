import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
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

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;

    const connection = await conn(); // Bağlantıyı kur

    // E-posta kontrolü için 'filter' ve 'eq' kullanın
    const userCheckCursor = await db.table("users")
        .filter(db.row('email').eq(email)) // 'eq' metodu ile eşleşmeyi kontrol et eq içindeki email kullanıcının girdği email değişkeni req.bodyden geliyor
        .run(await connection);

    // Kullanıcıları diziye çevir
    const users = await userCheckCursor.toArray();

    // Kullanıcıyı kontrol et ve gerekli işlemleri yap
    if (users.length > 0)
        throw new ClientSideException("kullanıcı zaten mevcut", 400);


    // Yeni kullanıcı oluşturma işlemi
    req.body.password = await bcyript.hash(req.body.password, 10);
    // console.log("hash şifre:", req.body.password);

    const user = new userModel(req.body.username, req.body.password, req.body.email);
    await db.table('users').insert(user).run(await connection).then((user) => {
        return new response(user,"Kullanıcı başarıyla kaydedildi.").created(res)
    })

    // res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });


}


const home=async(req:Request,res:Response,next:NextFunction)=>{
    const userInfo = res.locals.userInfo;

    if (!userInfo) {
        throw new ClientSideException("Yetkisiz erişim", 401);
    }
}


const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, newPasswordAgain } = req.body;

    // Kullanıcı doğrulama işlemi için `res.locals.userInfo` kullanılır.
    const userInfo = res.locals.userInfo;

    if (!userInfo) {
        throw new ClientSideException("Yetkisiz erişim", 401);
    }

    // Yeni şifreler eşleşiyor mu kontrol et
    if (newPassword !== newPasswordAgain) {
        throw new ClientSideException("Yeni şifreler uyuşmuyor", 400);
    }

    const connection = await conn();

    // Kullanıcının mevcut şifresini doğrulama
    const isPasswordValid = await bcyript.compare(currentPassword, userInfo.password);
    if (!isPasswordValid) {
        throw new ClientSideException("Mevcut şifre yanlış", 400);
    }

    // Yeni şifreyi hash'leyip güncelle
    const hashedPassword = await bcyript.hash(newPassword, 10);
    await db.table('users')
        .get(userInfo.id)  // Kullanıcının ID'sini kullanarak güncelleme yapılır
        .update({ password: hashedPassword })
        .run(await connection)
        .then(() => {
            return new response(null, "Şifre başarıyla güncellendi.").success(res);
        })
        .catch((err) => {
            next(new ClientSideException("Şifre güncellenirken bir hata oluştu", 500));
        });
};


const displaySettings=async(req:Request,res:Response,next:NextFunction)=>{
    const userInfo = res.locals.userInfo;

    if (!userInfo) {
        throw new ClientSideException("Yetkisiz erişim", 401);
    }
} 

const settings=async(req:Request,res:Response,next:NextFunction)=>{
    const userInfo = res.locals.userInfo;

    if (!userInfo) {
        throw new ClientSideException("Yetkisiz erişim", 401);
    }

} 





export { login, register ,home, updatePassword, displaySettings,settings };
