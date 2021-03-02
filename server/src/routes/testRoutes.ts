import { Request, response, Response, Router } from 'express';
import { Offer } from '../models/offerModel';
import { User } from '../models/userModel';

const router: Router = Router();

router.post('/resetusers', async (_req: Request, res: Response) => {

  if (process.env.NODE_ENV !== 'test') return res.status(403);

  await User.deleteMany({});
  
  response.status(204);

});

router.post('/resetoffers', async (_req: Request, res: Response) => {

  if (process.env.NODE_ENV !== 'test') return res.status(403);

  await Offer.deleteMany({});

  response.status(204);

});





export const TestRoutes: Router = router;