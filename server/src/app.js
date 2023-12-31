import {routes} from './routes/index.js'
import express from 'express'
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
  }));
app.use(routes);

export {app}