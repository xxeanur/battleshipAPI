"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
const app = (0, express_2.default)();
//router.post("/login",asyncHandler(login) );
router.route('/register').post((0, asyncHandler_1.default)(authController_1.register));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map