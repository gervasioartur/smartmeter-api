import { Injectable } from '@nestjs/common';
import { GEMINIAPIKEY } from '../utils/Key';
import { ReadMeasureFromLLMGateway } from 'src/application/gateway/ReadMeasureFromLLMGateway';
import { ReadMeasureFromLLMModel } from 'src/domain/model/models';
import { InvalidGeminiKeyError } from 'src/domain/error/InvalidGeminiKeyError';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ReadMeasureFromLlmService implements ReadMeasureFromLLMGateway {
  async read(llmFileName: string): Promise<ReadMeasureFromLLMModel> {
    if (!GEMINIAPIKEY) throw new InvalidGeminiKeyError();

    const fileManager = new GoogleAIFileManager(GEMINIAPIKEY);
    const getResponse = await fileManager.getFile(llmFileName);
    const genAI = new GoogleGenerativeAI(GEMINIAPIKEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: getResponse.mimeType,
          fileUri: getResponse.uri,
        },
      },
      { text: 'Get value measure value.' },
    ]);

    return {
      imageUrl: getResponse.uri,
      measureValue: parseInt(result.response.text()),
    };
  }
}
