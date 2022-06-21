import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './src/routes/index.js';

import session from 'express-session';
import { mySession } from './src/config/session.js';
import default_session from './src/config/session.js';

const app = express();

const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(mySession));
app.use(default_session);


app.use(router);


app.listen(PORT, () => {
   console.log(`Listening at http://localhost:${PORT}`);
});
