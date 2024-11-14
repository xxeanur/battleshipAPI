import express, { Request, Response,NextFunction } from 'express';
import * as db from 'rethinkdb'; // RethinkDB'yi içe aktarın
import { conn } from '../database/databaseConnection';
import bcyript from 'bcrypt';
import { userModel } from '../models/userModel'
import 'express-async-errors';
import { ClientSideException } from '../utils/errors';
import response from '../utils/response'

const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, newPasswordAgain } = req.body;

    // Kullanıcı doğrulama işlemi için `res.locals.userInfo` kullanılır.
    // const userInfo = res.locals.userInfo;
    const userInfo = req.body.userInfo;

    if (!userInfo) {
        throw new ClientSideException("Yetkisiz erişim", 404);
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

export {updatePassword};