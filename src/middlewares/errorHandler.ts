import { NextFunction, Request, Response } from 'express';
import { ClientSideException } from '../utils/errors';
const errorHandler = (err: ClientSideException, req: Request, res: Response, next: NextFunction) => {//instanceof bir objenin sınıfa ait olup olmadığını kontrol eder
    if (err instanceof ClientSideException) {
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

export default errorHandler;


