import jwt, { Secret } from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import { userModel } from '../models/userModel';
import { ClientSideException } from '../utils/errors';
import { env } from 'process';
import { conn } from '../database/databaseConnection'
import * as db from 'rethinkdb';
import { string } from 'joi';

interface User {
    id: string;
    username: string;
    email: string;
}

interface SuccessResponse {
    succes: boolean;
    token: string;
    message: string;
}

const createToken = async (user: User, res: Response) => {
    const payload = {
        sub: user.id,
        name: user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as Secret, {
        algorithm: "HS512",
        //token süresi
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

    return res.status(201).json({
        succes: true,
        token,
        message: "başarılı"
    })

}


const tokenCheck = async (req: Request, res: Response, next: NextFunction) => {
    //token üç parçadır, header payload ve secretKey kısmı
    //header kısmı var mı diye kontrol edicem //başında bearer var mı?
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");//bearer taşıyıcı, kimlik doğrulama tokenı olduğunu belirtir.

    //eğer headerToken yoksa geçersiz oturum döndür
    if (!headerToken) {
        throw new ClientSideException("Geçersiz Oturum Lütfen Oturum Açın", 401);
    }

    const token = req.headers.authorization!.split(" ")[1]; // "Bearer " kısmını çıkarır ve sadece token'ı alır. bearer den sonra boşluk koymamızın sebebi budur. bir boşluktan sonraki değerleri al.
    // console.log(token);

    //jwt doğrulaması yapacağım, şifrelediğim tokeni çözücem
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret) as jwt.JwtPayload;

    if (!decoded.sub || typeof decoded.sub !== 'string') {
        throw new ClientSideException("Geçersiz Token", 401);
    }

    //kullancııyı veitabanında bulacağım
    const connection = await conn();
    const userInfo = await db.table("users").get(decoded.sub).run(connection);

    if (!userInfo) {
        throw new ClientSideException("Geçersiz Token", 401);
    }

    req.body.userInfo = userInfo;
    next();
}


export { createToken, tokenCheck }