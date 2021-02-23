import { NextFunction, Request, Response, Router } from 'express';
require('express-async-errors');
import { User } from '../models/userModel';
import passport from 'passport';
import { SENDGRID_KEY } from "../utils/secrets";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_KEY);


const router: Router = Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {

    const user = new User();
  
    user.username = req.body.displayName;
    user.email    = req.body.email;
    user.setPassword(req.body.password);

    return user.save()
    .then(() => {
      return res.json(user.toAuthJSON());
    })
    .catch(next);
  
  });


router.post('/login', (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.email) {
      return res.status(422).json({errors: {email: "Can't be blank"}});
    }
  
    if (!req.body.password) {
      return res.status(422).json({errors: {password: "Can't be blank"}});
    }
  
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (user) {
        return res.json(user.toAuthJSON());
  
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  
  });

  router.post('/message', async (req: Request, res: Response, next: NextFunction) => {

    const message = req.body;
    const user = await User.findById(req.body.recipient);

    const msg = {
      to: user.email,
      from: 'noreply@homebrewswap.app',
      templateId: 'd-2eb440b5ecd34d3783575e69b2610256',
      dynamicTemplateData: {
        beerName: message.beerName,
        message: message.message,
        contactDetails: message.contactDetails,
        brewer: user.username
      },
    };

    const emailResponse = await sgMail.send(msg)
    return res.json(emailResponse);
  
  });

  router.post('/resetpw', async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.email) {
      return res.status(422).json({ errors: { email: "not found" } });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.sendStatus(404).json({ errors: { user: "not found" } })

    const token = user.getResetToken();

    console.log(token)

    const msg = {
      to: user.email,
      from: 'noreply@homebrewswap.app',
      templateId: 'd-f181b99cf4cc48158830db768b550b15',
      dynamicTemplateData: {
        userId: user.id,
        token: token,
        brewer: user.username
      },
    };

    const emailResponse = await sgMail.send(msg);

    return res.json(emailResponse);

    // const resetToken = user.toAuthJSON();

    // console.log(resetToken);
  
  });
  
  
  export const UserRoutes: Router = router;