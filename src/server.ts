import express from 'express';
import bodyParser from 'body-parser';

const server = express();
const jsonParser = bodyParser.json();

server.get('/url', jsonParser, function (req, res) {
  console.log(req.body);
  res.send(req.body)
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});