import { Request, Response, Router } from 'express';
import { authentication } from '../utils/authentication';
import Offer, { IOfferModel } from '../models/offerModel';

const router: Router = Router();


router.get('/', function (req: Request, res: Response, next) {
  const offers = Offer.find({})
  console.log(offers[0])
});




router.post('/', function (req: Request, res: Response, next) {

  console.log('post offer received')

  const offer = new Offer(req.body)

  return offer.save()
    .then(() => {
      return res.json({ offer: offer.toJSON })
    })
    .catch(next)

});



// // delete Offer
// router.delete('/:Offer', authentication.required, function (req: Request, res: Response, next) {
//   User.findById(req.payload.id).then(function (user) {
//     if (!user) {
//       return res.sendStatus(401);
//     }

//     if (req.Offer.author._id.toString() === req.payload.id.toString()) {
//       return req.Offer.remove().then(function () {
//         return res.sendStatus(204);
//       });
//     } else {
//       return res.sendStatus(403);
//     }
//   }).catch(next);
// });

// // Favorite an Offer
// router.post('/:Offer/favorite', authentication.required, function (req: Request, res: Response, next) {
//   const OfferId = req.Offer._id;

//   User.findById(req.payload.id).then(function (user) {
//     if (!user) {
//       return res.sendStatus(401);
//     }

//     return user.favorite(OfferId).then(function () {
//       return req.Offer.updateFavoriteCount().then(function (Offer) {
//         return res.json({Offer: Offer.toJSONFor(user)});
//       });
//     });
//   }).catch(next);
// });

// // Unfavorite an Offer
// router.delete('/:Offer/favorite', authentication.required, function (req: Request, res: Response, next) {
//   const OfferId = req.Offer._id;

//   User.findById(req.payload.id).then(function (user) {
//     if (!user) {
//       return res.sendStatus(401);
//     }

//     return user.unfavorite(OfferId).then(function () {
//       return req.Offer.updateFavoriteCount().then(function (Offer) {
//         return res.json({Offer: Offer.toJSONFor(user)});
//       });
//     });
//   }).catch(next);
// });

// // return an Offer's comments
// router.get('/:Offer/comments', authentication.optional, function (req: Request, res: Response, next) {
//   Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
//     return req.Offer.populate({
//       path    : 'comments',
//       populate: {
//         path: 'author'
//       },
//       options : {
//         sort: {
//           createdAt: 'desc'
//         }
//       }
//     }).execPopulate().then(function (Offer) {
//       return res.json({
//         comments: req.Offer.comments.map(function (comment) {
//           return comment.toJSONFor(user);
//         })
//       });
//     });
//   }).catch(next);
// });

// // create a new comment
// router.post('/:Offer/comments', authentication.required, function (req: Request, res: Response, next) {
//   User.findById(req.payload.id)
//     // @ts-ignore
//     .then(function (user) {
//       if (!user) {
//         return res.sendStatus(401);
//       }

//       const comment     = new Comment(req.body.comment);
//       comment.Offer = req.Offer;
//       comment.author  = user;

//       return comment.save().then(function () {
//         req.Offer.comments.push(comment);

//         return req.Offer.save().then(function (Offer) {
//           res.json({comment: comment.toJSONFor(user)});
//         });
//       });
//     }).catch(next);
// });

// router.delete('/:Offer/comments/:comment', authentication.required, function (req: Request, res: Response, next) {
//   if (req.comment.author.toString() === req.payload.id.toString()) {
//     // @ts-ignore
//     req.Offer.comments.remove(req.comment._id);
//     req.Offer.save()
//       .then(() => Comment.find({_id: req.comment._id}).remove().exec())
//       .then(function () {
//         res.sendStatus(204);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });


export const OfferRoutes: Router = router;
