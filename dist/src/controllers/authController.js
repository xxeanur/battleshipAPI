"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const db = __importStar(require("rethinkdb")); // RethinkDB'yi içe aktarın
const databaseConnection_1 = require("../database/databaseConnection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
require("express-async-errors");
const errors_1 = require("../utils/errors");
const response_1 = __importDefault(require("../utils/response"));
const login = async (req, res) => {
    console.log(req.body);
};
exports.login = login;
const register = async (req, res, next) => {
    const { email, username, password } = req.body;
    const connection = await (0, databaseConnection_1.conn)(); // Bağlantıyı kur
    // E-posta kontrolü için 'filter' ve 'eq' kullanın
    const userCheckCursor = await db.table("users")
        .filter(db.row('email').eq(email)) // 'eq' metodu ile eşleşmeyi kontrol et
        .run(connection);
    // Kullanıcıları diziye çevir
    const users = await userCheckCursor.toArray();
    // Kullanıcıyı kontrol et ve gerekli işlemleri yap
    if (users.length > 0)
        throw new errors_1.ClientSideException("kullanıcı zaten mevcut", 400);
    // Yeni kullanıcı oluşturma işlemi
    req.body.password = await bcrypt_1.default.hash(req.body.password, 10);
    // console.log("hash şifre:", req.body.password);
    const user = new userModel_1.userModel(req.body.username, req.body.password, req.body.email);
    await db.table('users').insert(user).run(await connection).then((user) => {
        return new response_1.default(user, "Kullanıcı başarıyla kaydedildi.").created(res);
    });
    // res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
};
exports.register = register;
//# sourceMappingURL=authController.js.map