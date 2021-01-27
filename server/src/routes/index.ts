import { Router } from 'express';
import { UserRoutes } from './userRoutes';
import { OfferRoutes } from './offerRoutes';

const router: Router = Router();


router.use('/user', UserRoutes);
router.use('/offers', OfferRoutes);



export const MainRouter: Router = router;