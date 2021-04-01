import { Request, Response, Router } from 'express';
import { Offer } from '../models/offerModel';
import { User } from '../models/userModel';

const router: Router = Router();

router.post('/resetusers', async (_req: Request, res: Response) => {

  if (process.env.NODE_ENV !== 'test') return res.status(403);

  await User.deleteMany({});
  
  res.status(204).json({});

});

router.post('/resetoffers', async (_req: Request, res: Response) => {

  if (process.env.NODE_ENV !== 'test') return res.status(403);

  await Offer.deleteMany({});

  res.status(204).json({});

});

router.post('/pwresettoken', async (req: Request, res: Response) => {

  if (process.env.NODE_ENV !== 'test') return res.status(403);

  const user = await User.findOne({ email: req.body.email });

  const token = user.getResetToken();

  return res.json({ token: token });
});

router.get('/health', (_req: Request, res: Response) => {
  res.json({ manualVersion: '16' });
});





export const TestRoutes: Router = router;