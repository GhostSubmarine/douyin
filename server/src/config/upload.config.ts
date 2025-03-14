import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const uploadConfig = {
  dest: process.env.UPLOAD_DIR || './uploads',
  generateFilename: (file: Express.Multer.File) => 
    `${uuidv4()}${extname(file.originalname)}`,
  limits: {
    fileSize: 1024 * 1024 * 100, // 100MB
    files: 1
  },
  allowedMimetypes: [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo'
  ]
}
