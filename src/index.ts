import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {requestHandler} from './user/requestHandler';
import {getRegisteredUsers} from './user/userDatabase';

const server = express();
const jsonParser = bodyParser.json();

server.post('/user', jsonParser, requestHandler);

server.get('/users', jsonParser, (req: Request, res: Response) => {
  const registeredUsers = getRegisteredUsers();
  res.send(registeredUsers);
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
