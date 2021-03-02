import { Router } from 'express';
import { UserRoutes } from './userRoutes';
import { OfferRoutes } from './offerRoutes';
import { TestRoutes } from './testRoutes';

const router: Router = Router();


router.use('/user', UserRoutes);
router.use('/offers', OfferRoutes);
if (process.env.NODE_ENV === 'test') router.use('/test', TestRoutes);



export const MainRouter: Router = router;