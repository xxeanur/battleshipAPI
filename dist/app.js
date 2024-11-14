"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const databaseConnection_1 = require("./src/database/databaseConnection");
const routers_1 = __importDefault(require("./src/routers"));
const errorHandler_1 = __importDefault(require("./src/middlewares/errorHandler"));
require("express-async-errors");
//dotenv yapılandırması
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const connection = (0, databaseConnection_1.conn)();
//middleware
const port = process.env.PORT || 5000;
//apiyi kaldırdım:)
app.use("/", routers_1.default);
// app.all("*",async(req:Request,res:Response,next:NextFunction)=>{
//     throw new Error("yakala")
// })
//hata yakalama
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Server http://localhost:${port} çalışıyor`);
});
//# sourceMappingURL=app.js.map