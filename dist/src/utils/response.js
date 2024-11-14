"use strict";
//cevabı res.status veya res.json yazmama gerek kalmayacak bu yapı ile.
Object.defineProperty(exports, "__esModule", { value: true });
//data'da kullanıcı bilgilerini içeren obje var.
class Response {
    constructor(data = null, message = null) {
        this.data = data;
        this.message = message;
    }
    success(res) {
        var _a;
        return res.status(200).json({
            success: true,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarılı" //eğer message null gelirse işlem başarılıyı atar.
        });
    }
    created(res) {
        var _a;
        return res.status(201).json({
            success: true,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarılı"
        });
    }
    //bu cliente gönderilmemeli console.log olmalı sadece
    error500(res) {
        var _a;
        return res.status(500).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarısız !"
        });
    }
    error400(res) {
        var _a;
        return res.status(400).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarısız !"
        });
    }
    error401(res) {
        var _a;
        return res.status(401).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Lütfen Oturum Açın !"
        });
    }
    error404(res) {
        var _a;
        return res.status(404).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "İşlem Başarısız !"
        });
    }
    error429(res) {
        var _a;
        return res.status(429).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Çok Fazla İstek Atıldı !"
        });
    }
}
exports.default = Response;
//# sourceMappingURL=response.js.map