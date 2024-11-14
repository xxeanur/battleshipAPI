"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const _router = (0, express_1.Router)();
_router.use(authRoutes_1.default);
exports.default = _router;
//# sourceMappingURL=index.js.map