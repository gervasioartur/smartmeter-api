import path from 'path';
import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UploadImageParams } from 'src/domain/model/models';

@Injectable()
export class LocalUpload {
  upload(base64Image: string): UploadImageParams {
    const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const type = matches[1];
    const fileBuffer = Buffer.from(matches[2], 'base64');

    const fileName = `${randomUUID()}.${type}`;
    const publicDirectory = path.join(__dirname, '../public');
    const tempFilePath = path.join(publicDirectory, fileName);
    fs.writeFileSync(tempFilePath, fileBuffer);
    return {
      fileName,
      filePath: tempFilePath,
    };
  }
}
