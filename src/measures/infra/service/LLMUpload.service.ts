import { Injectable } from '@nestjs/common';
import { GEMINIAPIKEY } from '../utils/Key';
import { InvalidGeminiKeyError } from 'src/domain/error/InvalidGeminiKeyError';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { LLMUploadGateway } from 'src/application/gateway/LLMUploadGateway';
import { UploadImageParams } from 'src/domain/model/models';

@Injectable()
export class LLMUploadService implements LLMUploadGateway {
  async upload(params: UploadImageParams): Promise<string> {
    if (!GEMINIAPIKEY) throw new InvalidGeminiKeyError();

    const fileManager = new GoogleAIFileManager(GEMINIAPIKEY);
    const uploadResponse = await fileManager.uploadFile(params.filePath, {
      mimeType: 'image/jpeg',
      displayName: params.fileName,
    });

    return uploadResponse.file.name;
  }
}
