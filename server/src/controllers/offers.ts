import express from 'express';
import offerService from '../services/offersService';
import { Offer } from '../type';
import { toNewOffer } from '../utils';

const router = express.Router();

// router.get('/', (_req, res) => {
//   const offerData = offerService.getOffers();
//   res.send(offerData);
// });

// router.get('/:id', (_req, res) => {
//   const offer: offer | undefined = offerService.getById(_req.params.id);
//   res.send(offer);
// });

router.post('/api/offers', (req, res) => {
  try {
    console.log('post req received')
    console.log(req.body)
    const newOffer:Omit<Offer, "id"> = toNewOffer(req.body);
    const addedOffer = offerService.addOffer(newOffer);
    res.json(addedOffer);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  } 
});

// router.post('/:id/entries', (req, res) => {
//   try {
//     const newEntry: Entry = toNewEntry(req.body);
//     const offerId: string = req.params.id;
//     const offer: offer  = offerService.addEntryToId(newEntry, offerId);
//     res.json(offer);
//   } catch (e) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     res.status(400).send(e.message);
//   } 
// });

export default router;