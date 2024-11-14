"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSideException = void 0;
//error classı oluşturduk
class ClientSideException extends Error {
    constructor(message, statusCode) {
        super(message); //üst sınıf constructırını çağırdık. 
        this.statusCode = statusCode || 400;
        this.message = message;
    }
}
exports.ClientSideException = ClientSideException;
//# sourceMappingURL=errors.js.map