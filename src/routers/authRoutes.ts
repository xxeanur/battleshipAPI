import {Router} from 'express';
import express from 'express'
import {login, register, home, updatePassword} from '../controllers/authController'
import asyncHandler from '../middlewares/asyncHandler';
import authValidations from '../middlewares/validations/authValidation'
import {tokenCheck} from '../middlewares/auth'

const router=Router();
const app=express();

router.route("/login").post(asyncHandler(authValidations.login),asyncHandler(login));

router.route('/register').post(asyncHandler(authValidations.register),asyncHandler(register)); //önce doğrulama işlemi, eğer doğrulama başarılıysa kayıt işlemine geç

router.patch('/settings/changePassword', updatePassword);


router.get("/home",tokenCheck,home)

export default router;