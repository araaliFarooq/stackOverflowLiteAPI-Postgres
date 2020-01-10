import express from 'express';
import logger from 'morgan';
import { json, urlencoded } from 'body-parser';
import { userRouter, questionRouter } from './server/routes';

// Set up the express app
const app = express();
const prefix = '/api/v1';

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(json());
app.use(urlencoded({ extended: false }));

// all routes shall be added here
app.use(`${prefix}/users`, userRouter);
app.use(`${prefix}/questions`, questionRouter);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  })
);

export default app;
