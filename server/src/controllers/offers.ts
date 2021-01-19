const offersRouter = require('express').Router()
import { Offer } from '../type'
import { toNewOffer } from '../utils'
const OfferSchema = require('../models/offerSchema')

// router.get('/', (_req, res) => {
//   const offerData = offerService.getOffers();
//   res.send(offerData);
// });

// router.get('/:id', (_req, res) => {
//   const offer: offer | undefined = offerService.getById(_req.params.id);
//   res.send(offer);
// });

offersRouter.post('/', async (req: { body: any; }, res: { json: (arg0: Offer) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {

    console.log('post req received')
    console.log(req.body)
    const parsedOffer:Omit<Offer, "id"> = toNewOffer(req.body)
    const newOffer = new OfferSchema({
      ...parsedOffer
      //user id need to be handled separately later, check blogs
    })
    const savedOffer = await newOffer.save()
    res.json(savedOffer.toJSON())

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

module.exports = offersRouter