"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Hata yakalama fonksiyonu
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); //next uygulamanın çökmesini engelleyerek programın çalışmaya devam etmesini sağlar.
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map