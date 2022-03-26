import express from 'express';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import imageProcessing from '../../helpers/imageProcessing';

const imageResize = express.Router();

imageResize.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      // get all queries
      const fileName = req.query.filename;
      //i added as string because query produce type of parsedQs and parseint not accept only string
      const width = req.query.width
        ? parseInt(req.query.width as string)
        : null;
      const height = req.query.height
        ? parseInt(req.query.height as string)
        : null;

      //check url is correct
      if (!fileName || !width || !height) {
        res
          .status(404)
          .send(
            'you must write correct url /resize?filename=fjord&width=200&height=200'
          );
        return;
      }
      // full path for full Images and resized Images
      const fullPathFileName = path.join(
        __dirname,
        '../',
        '../',
        'images',
        `${fileName}.jpg`
      );
      const resizePathFileName = path.join(
        __dirname,
        '../',
        '../',
        'images',
        'thumbnails',
        `${fileName}_${width}_${height}.jpg`
      );
      // check if image exist
      if (fs.existsSync(fullPathFileName)) {
        // check if this image resized
        if (
          fs.existsSync(
            path.join(__dirname, '../', '../', 'images', 'thumbnails')
          ) &&
          fs.existsSync(resizePathFileName)
        ) {
          const dataThumbImg = await fsPromises.readFile(resizePathFileName);
          res.writeHead(200, { 'Content-Type': 'image/jpg' });
          res.end(dataThumbImg);
        } else {
          //check if there thumbnails folder
          if (
            !fs.existsSync(
              path.join(__dirname, '../', '../', 'images', 'thumbnails')
            )
          ) {
            await fsPromises.mkdir(
              path.join(__dirname, '../', '../', 'images', 'thumbnails')
            );
          }
          imageProcessing({
            width,
            height,
            fullPathFileName,
            resizePathFileName,
          }).then((resizeImg) => {
            res.status(200).contentType('jpg').send(resizeImg);
          });
        }
      } else {
        res.status(404).send('Image Does Not Exist!');
      }

      // check is full Images there or not
    } catch (err) {
      res.status(404).send('error processing image');
    }
  }
);

export default imageResize;
