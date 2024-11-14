import {Router} from 'express';
import express from 'express'
import {login, register, home, updatePassword, displaySettings, settings} from '../controllers/authController'
import asyncHandler from '../middlewares/asyncHandler';
import authValidations from '../middlewares/validations/authValidation'
import {tokenCheck} from '../middlewares/auth'

const router=Router();
const app=express();

router.route("/login").post(asyncHandler(authValidations.login),asyncHandler(login));

router.route('/register').post(asyncHandler(authValidations.register),asyncHandler(register)); //önce doğrulama işlemi, eğer doğrulama başarılıysa kayıt işlemine geç


router.route("/settings/updatePassword").patch(updatePassword);

router.route("/settings/displaySettings").get(tokenCheck,displaySettings);

router.route("/settings").get(tokenCheck,settings);


router.route("/home").get(tokenCheck,home);

//game sayfası
// router.route("/home/game").get(tokenCheck,game);

export default router;