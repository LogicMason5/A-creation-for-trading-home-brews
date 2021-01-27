import passport from 'passport';
import User from '../models/userModel';
import  passportLocal from 'passport-local';


const LocalStrategy = passportLocal.Strategy;


passport.use(new LocalStrategy({

    // Strategy is based on username & password.  Substitute email for username.
    usernameField: 'user[email]',
    passwordField: 'user[password]'
  },

  (email, password, done) => {

    User
      .findOne({email})
      .then((user: { validPassword: (arg0: string) => any; }) => {
        if (!user) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (!user.validPassword(password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
      })
      .catch(done);
  }));
