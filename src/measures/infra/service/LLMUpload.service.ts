import { Injectable } from '@nestjs/common';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { LLMUploadGateway } from '@/measures/application/gateway/LLMUploadGateway';
import { UploadImageParams } from '@/measures/domain/model/models';
import { InvalidGeminiKeyError } from '@/measures/domain/error/InvalidGeminiKeyError';

@Injectable()
export class LLMUploadService implements LLMUploadGateway {
  private readonly GEMINIAPIKEY = process.env.GEMINI_API_KEY;

  async upload(params: UploadImageParams): Promise<string> {
    if (!this.GEMINIAPIKEY) throw new InvalidGeminiKeyError();

    const fileManager = new GoogleAIFileManager(this.GEMINIAPIKEY);
    const uploadResponse = await fileManager.uploadFile(params.filePath, {
      mimeType: params.type,
      displayName: params.fileName,
    });

    return uploadResponse.file.name;
  }
}
