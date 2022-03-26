import express from 'express';
import imageResize from './api/imageResize';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('welcome to Image Processing Api');
});
routes.use('/resize', imageResize);

export default routes;
