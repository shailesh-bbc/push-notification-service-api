import express from 'express';
import bodyParser from 'body-parser';
import {requestHandler} from './requestHandler'

const server = express();
const jsonParser = bodyParser.json();

server.post('/user', jsonParser, requestHandler);

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
