import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/userModel';
import { SENDGRID_KEY } from "../utils/secrets";

import passport from 'passport';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_KEY)

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

    console.log(req.body);

    const user = await User.findById(req.body.recipient);

    console.log(user.email)

    const msg = {
      to: user.email, // Change to your recipient
      from: 'noreply@homebrewswap.app', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail
      .send(msg)
      .then(() => {
        return res.json({ message: 'success' })
      })
      .catch(next)
  
  });
  
  
  export const UserRoutes: Router = router;