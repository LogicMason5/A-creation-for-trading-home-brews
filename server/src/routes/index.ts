import { Router } from 'express';
// import { TagRoutes } from './tag-routes';
import { UserRoutes } from './userRoutes';
// import { ProfilesRoutes } from './profiles-routes';
// import { ArticlesRoutes } from './articles-routes';


const router: Router = Router();


// router.use('/tags', TagRoutes);
router.use('/user', UserRoutes);
// router.use('/offers', OffersRoutes);
// router.use('/profiles', ProfilesRoutes);
// router.use('/articles', ArticlesRoutes);


export const MainRouter: Router = router;