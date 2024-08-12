// src/cloudinary.js
import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({
  cloud_name: 'YOUR_CLOUD_NAME',
  secure: true
});

export default cloudinary;
