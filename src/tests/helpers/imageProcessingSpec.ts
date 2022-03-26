import imageProcessing from '../../helpers/imageProcessing';
import path from 'path';

describe('Testing ImageProcessing Func', () => {
  const fullPathFileName = path.join(
    __dirname,
    '../',
    '../',
    '../',
    'src',
    'images',
    'fjord.jpg'
  );
  const resizePathFileName = path.join(
    __dirname,
    '../',
    '../',
    '../',
    'src',
    'images',
    'thumbnails',
    'fjord_200_200.jpg'
  );

  it('should resolved all data is correct', async (): Promise<void> => {
    await expectAsync(
      imageProcessing({
        width: 200,
        height: 200,
        fullPathFileName,
        resizePathFileName,
      })
    ).toBeResolved();
  });
});
