import { Router } from 'express';
import express from 'express'
import { login } from '../controllers/loginController'
import { register } from '../controllers/registerContoller'
import { updatePassword } from '../controllers/userController'
import asyncHandler from '../middlewares/asyncHandler';
import authValidations from '../middlewares/validations/authValidation'
import { auth } from '../middlewares/auth'
import errorHandler from '../middlewares/errorHandler';
import { tokenVerifyController } from '../controllers/tokenVerifyController'
const router = Router();
const app = express();


router.route("/login").post(asyncHandler(authValidations.login), asyncHandler(login));

router.route('/register').post(asyncHandler(authValidations.register), asyncHandler(register)); //önce doğrulama işlemi, eğer doğrulama başarılıysa kayıt işlemine geç

router.route("/tokenVerify").get(auth, tokenVerifyController);

router.route("settings/updatePassword").patch(auth, asyncHandler(updatePassword));//önce token kontrolü sonra updatepassword


//game sayfası
// router.route("/home").get(tokenCheck,game);

export default router;