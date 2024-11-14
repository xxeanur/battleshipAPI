import { Request, Response, NextFunction } from 'express';

// Hata yakalama fonksiyonu
const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next); //next uygulamanın çökmesini engelleyerek programın çalışmaya devam etmesini sağlar.
};

export default asyncHandler;
