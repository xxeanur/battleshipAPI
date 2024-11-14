//validasyon: verilerin doğruluğunu kontrol ediyorum
import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { ClientSideException } from '../../utils/errors'
import { join } from 'path';

//kullanıcı kaydı için gerekli veri validasyonu
class AuthValidation {
    constructor() { }
    //ortak alanaları tanımlayan yardımcı metod, login ve register için ortak alanlar.:)
    private static getCommonSchema() {
        return {
            //trim başta ve sonda boşluklar olmasın
            username: Joi.string().trim().min(4).max(20).required().messages({
                "string.base": "Kullancı adı normal metin olmalıdır.",
                "string.empty": "Kullancı adı boş olamaz.",
                "string.min": "Kullancı adı en az 4 karakter içermelidir.",
                "string.max": "Kullanıcı adı en fazla 20 karakter içermelidir.",
                "string.required": "Kullanıcı adı zorunludur."
            }),
            password: Joi.string().trim().min(6).max(20).required().messages({
                "string.base": "Şifre alanı normal metin olmalıdır.",
                "string.empty": "Şifre alanı boş olamaz.",
                "string.min": "Şifre alanı en az 6 karakter içermelidir.",
                "string.max": "Şifre alanı en fazla 20 karakterden oluşabilir.",
                "any.required": "Şifre alanı zorunludur."
            })

        };
    }

    //kayıt şeması
    static register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = await Joi.object({
                ...this.getCommonSchema(),
                email: Joi.string().email().trim().min(4).max(50).required().messages({
                    "string.base": "Email alanı normal metin şeklinde olmalıdır.",
                    "string.empty": "Email alanı boş olamaz.",
                    "string.min": "Email alanı en az 4 karakter içermelidir.",
                    "string.email": "Geçerli bir Email giriniz.",
                    "string.max": "Email alanı en fazla 50 karakterden oluşabilir.",
                    "any.required": "Email alanı zorunludur."
                }),
            }).validateAsync(req.body)
        } catch (error) {
            //details[0] ilk hata mesajını kullancıya gönderiyor, details hata objelerini dizi şeklinde tutuyor//instanceof operatörü, bir nesnenin belirli bir türden olup olmadığını kontrol eder
            if (error instanceof Joi.ValidationError && error?.details[0].message) {// soru işareti undefined olabilir anlamına geliyor tip tanımladık
                throw new ClientSideException(error.details[0].message, 400)
            } else {
                //eğer error joi.validasyon türünde değilse veya details kısmı undefined ise else girer 
                throw new ClientSideException("Lütfen validasyon kurallarına uyun", 400)
            }
        }
        next();
    };

    //login validasyonu 
    static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = await Joi.object(this.getCommonSchema()).validateAsync(req.body);
        } catch (error) {
            if (error instanceof Joi.ValidationError && error?.details[0].message) {
                throw new ClientSideException(error.details[0].message, 400);
            } else {
                throw new ClientSideException("Lütfen validasyon kurallarına uyun.", 400);
            }
        }
        next();
    };

}

export default AuthValidation;




