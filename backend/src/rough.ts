import express, {Express, Request, Response} from 'express';

const app = express();

app.get('/', (req : Request, res : Response) => {
  // res.send({msg : 'Hello World', status: 200});
  res.status(400).json({msg: 'Hello World', status: 200});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});