import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes';
import { loadErrorHandlers } from './utils/errorHandler';
import session from 'express-session';
import helmet from "helmet";
import compression from "compression";
import { SESSION_SECRET } from "./utils/secrets";
import './db'; // initialize database
import './utils/passport';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');



const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 60000
    },
    resave           : false,
    saveUninitialized: false
  }
));
app.use('/api', MainRouter);

loadErrorHandlers(app);


export default app;