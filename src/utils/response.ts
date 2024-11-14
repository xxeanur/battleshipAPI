//cevabı res.status veya res.json yazmama gerek kalmayacak bu yapı ile.

import { Response as ExpressResponse } from 'express'; //class olan response'la karışmaması için  Response'u ExpressREsponse olarak çağırıcam

//data'da kullanıcı bilgilerini içeren obje var.

class Response {
    data: any;
    message: string | null;

    constructor(data: any = null, message: string | null = null) {
        this.data = data;
        this.message = message;
    }

    success(res: ExpressResponse) {//İstek başarılı alınmış ve cevap başarılı verilmiştir
        return res.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı" //eğer message null gelirse işlem başarılıyı atar.
        });
    }

    created(res: ExpressResponse) {//istek oluşturuldu ve sunucuda yeni bir kaynak oluşturuldu
        return res.status(201).json({ 
            success: true,
            data: this.data,
            message: this.message ?? "İşlem Başarılı"
        });
    }

    //bu cliente gönderilmemeli console.log olmalı sadece
    error500(res: ExpressResponse) {
        return res.status(500).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız !"
        });
    }

    error400(res: ExpressResponse) {//İstek hatalı (isteğin yapısı hatalı) olduğu belirtilir.
        return res.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız !"
        });
    }

    error401(res: ExpressResponse) {
        return res.status(401).json({//istek için kimlik doğrulaması gerekiyor.
            success: false,
            data: this.data,
            message: this.message ?? "Lütfen Oturum Açın !"
        });
    }

    error404(res: ExpressResponse) {//İstek yapılan kaynağın (veya sayfanın) bulunamadığını belirtir.
        return res.status(404).json({
            success: false,
            data: this.data,
            message: this.message ?? "İşlem Başarısız !"
        });
    }

    error429(res: ExpressResponse) {
        return res.status(429).json({
            success: false,
            data: this.data,
            message: this.message ?? "Çok Fazla İstek Atıldı !"
        });
    }
}

export default Response;
