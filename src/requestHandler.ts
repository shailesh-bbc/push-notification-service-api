import {createUser} from './user';

export const requestHandler = (req, res) => {
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