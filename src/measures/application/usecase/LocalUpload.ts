import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import {
  LocalUploadParams,
  UploadImageParams,
} from '@/measures/domain/model/models';

@Injectable()
export class LocalUpload {
  upload(params: LocalUploadParams): UploadImageParams {
    const publicDirectory = path.join(process.cwd(), 'public/images');
    if (!fs.existsSync(publicDirectory)) {
      fs.mkdirSync(publicDirectory, { recursive: true });
    }

    const matches = params.base64Image.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/,
    );
    const type = matches[1];
    const date = new Date(params.measureDateTime);
    const fileName = `${params.measureType}${params.costumerCode}${date.getMonth() + 1}${date.getFullYear()}.${type.split('/')[1]}`;
    const filePath = path.join(publicDirectory, fileName);

    if (!fs.existsSync(filePath)) {
      const fileBuffer = Buffer.from(matches[2], 'base64');
      fs.writeFileSync(filePath, fileBuffer);
    }
    return { type, fileName, filePath };
  }
}
