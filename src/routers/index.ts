import {Router} from 'express';
import router from './authRoutes'
const _router=Router();

_router.use(router);

export default _router;