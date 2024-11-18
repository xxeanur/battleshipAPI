import { Request, Response, NextFunction } from 'express';

import responseClass from '../utils/response'
import { ClientSideException } from '../utils/errors';

export const tokenVerifyController = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
};
