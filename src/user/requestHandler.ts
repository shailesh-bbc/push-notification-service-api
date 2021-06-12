import {createUser} from './createUser';
import {Request, Response} from 'express';

export const requestHandler = (req: Request, res: Response): Response => {
  const {username} = req.body;
  const accessToken = req.headers.authorization;
  try {
    const user = createUser(username, accessToken);
    return res.send(user);
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      errorMessage: error.message,
    });
  }
}