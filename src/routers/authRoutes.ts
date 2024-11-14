import { Router } from 'express';
import express from 'express'
import { login } from '../controllers/loginController'
import { register } from '../controllers/registerContoller'
import { updatePassword } from '../controllers/userController'
import asyncHandler from '../middlewares/asyncHandler';
import authValidations from '../middlewares/validations/authValidation'
import { tokenCheck } from '../middlewares/auth'

const router = Router();
const app = express();

router.route("/login").post(asyncHandler(authValidations.login), asyncHandler(login));

router.route('/register').post(asyncHandler(authValidations.register), asyncHandler(register)); //önce doğrulama işlemi, eğer doğrulama başarılıysa kayıt işlemine geç

router.route("/settings/updatePassword").patch(updatePassword);


//game sayfası
// router.route("/home/game").get(tokenCheck,game);

export default router;