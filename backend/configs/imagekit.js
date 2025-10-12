import ImageKit from '@imagekit/nodejs';
import { ENV } from './ENV.js';

let imagekit = new ImageKit({
  privateKey: ENV.IMAGEKIT_PRIVATE_KEY,
  publicKey: ENV.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: ENV.IMAGEKIT_URL_ENDPOINT,
});



export default imagekit;