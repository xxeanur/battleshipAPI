"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../utils/errors");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.ClientSideException) {
        res.status(err.statusCode || 400)
            .json({
            success: false,
            message: err.message,
        });
    }
    //kullancıya 500 hataları yansıtılmaz. Bunu sadece console.log yapıcam.
    res.status(500)
        .json({
        success: false,
        message: "Sunucu hatası.",
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map