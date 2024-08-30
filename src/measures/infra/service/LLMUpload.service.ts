import { Injectable } from '@nestjs/common';
import { GEMINIAPIKEY } from '../utils/Key';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { LLMUploadGateway } from 'src/measures/application/gateway/LLMUploadGateway';
import { UploadImageParams } from 'src/measures/domain/model/models';
import { InvalidGeminiKeyError } from 'src/measures/domain/error/InvalidGeminiKeyError';

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
