import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);


const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
