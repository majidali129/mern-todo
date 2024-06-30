import dotenv from 'dotenv';

import { app } from './app.js';
import { connectDB } from './db/index.js';

dotenv.config({
  path: './config.env',
});

connectDB()
  .then(() => {
    app.on('error', (err) => {
      console.log(err);
      throw err;
    });
  })
  .catch((err) => {
    console.log('Mongodb connection error', err);
  });

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
