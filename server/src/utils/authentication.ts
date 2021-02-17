import { Request } from 'express';
const jwt =  require('express-jwt');
import { JWT_SECRET } from "./secrets";


function getTokenFromHeader(req: Request): string | null {

  console.log('printing req.header in getTokenFromHeader')
  console.log(req.headers)

  const headerAuth: string | string[] = req.headers.authorization;

  if (headerAuth !== undefined && headerAuth !== null) {

    if (Array.isArray(headerAuth)) {
      return splitToken(headerAuth[0]);
    } else {
      return splitToken(headerAuth);
    }

  } else {

    return null;
  }
}


function splitToken(authString: string) {

  if (authString.split(' ')[0] === 'Token') {
    return authString.split(' ')[1];

  } else {
    return null;
  }
}


const auth = {
  required: jwt({
    credentialsRequired: true,
    secret             : JWT_SECRET,
    getToken           : getTokenFromHeader,
    userProperty       : 'body.authUser',
    algorithms         : ['HS256']
  }),

  optional: jwt({
    credentialsRequired: false,
    secret             : JWT_SECRET,
    getToken           : getTokenFromHeader,
    userProperty       : 'body.authUser',
    algorithms         : ['HS256']
  })
};

export const authentication = auth;