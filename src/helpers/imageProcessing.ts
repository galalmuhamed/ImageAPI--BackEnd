import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

interface ResizeInfo {
  width: number;
  height: number;
  fullPathFileName: string;
  resizePathFileName: string;
}

const imageProcessing = async ({
  width,
  height,
  fullPathFileName,
  resizePathFileName,
}: ResizeInfo): Promise<Buffer | undefined> => {
  try {
    const dataFullImg = await fsPromises.readFile(fullPathFileName);
    const resizeImg = await sharp(dataFullImg).resize(width, height).toBuffer();
    await fsPromises.writeFile(resizePathFileName, resizeImg);
    return resizeImg;
  } catch (err) {
    console.log(err);
  }
};

export default imageProcessing;
