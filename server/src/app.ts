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
import cors from 'cors';
import path from 'path';



const app: Application = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
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

app.use(express.static('build'));

const buildPath = path.resolve(__dirname, '../build');

app.get('/*', function (_req, res) {
  res.sendFile('index.html', { root: buildPath });
});

loadErrorHandlers(app);

console.log('logging key')
console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
console.log('logging key lengths')
console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY.length)


export default app;