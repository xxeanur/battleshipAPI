import express, { Request, Response,NextFunction } from 'express';
import * as db from 'rethinkdb'; // RethinkDB'yi içe aktarın
import { conn } from '../database/databaseConnection';
import bcyript from 'bcrypt';
import { userModel } from '../models/userModel'
import 'express-async-errors';
import { ClientSideException } from '../utils/errors';
import response from '../utils/response'


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


}




export {register};