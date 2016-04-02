import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import dotenv from 'dotenv';
import fs from 'fs';

let app = express();

//load environment vars if .env file is there
try {
  let envFile = fs.statSync('.env');
  if (envFile) {
    dotenv.load();
  }
} catch (e) {
  if (process.env.NODE_ENV !== 'test') {
    console.log('No .env file found, but Zapier token defined.');
  }
}

app.use(compress());
app.use(cookieParser());
app.use(bodyParser.json());

process.env.PWD = process.cwd();

app.use(express.static(`${process.env.PWD}/public`));

if (!module.parent) {
  let port = process.env.PORT || 3001;
  app.listen(port, (err) => {
    if (err) {
      console.log('ERROR on startup', err);
      process.exit(0);
    }
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Listening on port ${port} env is ${process.env.NODE_ENV}`);
    }
  });
}
