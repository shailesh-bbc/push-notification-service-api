import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {requestHandler as userRequestHandler} from './user/requestHandler';
import {requestHandler as pushRequestHandler} from './notification/requestHandler';
import {getRegisteredUsers} from './user/userDatabase';

const server = express();
const jsonParser = bodyParser.json();

server.post('/user', jsonParser, userRequestHandler);

server.get('/users', jsonParser, async (req: Request, res: Response) => {
  const registeredUsers = await getRegisteredUsers();
  res.send(registeredUsers);
});

server.post('/push', jsonParser, pushRequestHandler);

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
