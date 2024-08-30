import { Injectable } from '@nestjs/common';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ReadMeasureFromLLMGateway } from '@/measures/application/gateway/ReadMeasureFromLLMGateway';
import { ReadMeasureFromLLMModel } from '@/measures/domain/model/models';
import { InvalidGeminiKeyError } from '@/measures/domain/error/InvalidGeminiKeyError';
import { InvalidDataError } from '@/measures/domain/error/InvalidDataError';

@Injectable()
export class ReadMeasureFromLlmService implements ReadMeasureFromLLMGateway {
  private readonly GEMINIAPIKEY = process.env.GEMINI_API_KEY;

  async read(llmFileName: string): Promise<ReadMeasureFromLLMModel> {
    if (!this.GEMINIAPIKEY) throw new InvalidGeminiKeyError();

    const fileManager = new GoogleAIFileManager(this.GEMINIAPIKEY);
    const getResponse = await fileManager.getFile(llmFileName);
    const genAI = new GoogleGenerativeAI(this.GEMINIAPIKEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent([
      {
        text: 'Extract only the measure value with no text.',
      },
      {
        fileData: {
          mimeType: getResponse.mimeType,
          fileUri: getResponse.uri,
        },
      },
    ]);

    const measureValue = parseInt(result.response.text());
    if (Number.isNaN(measureValue))
      throw new InvalidDataError(
        'Measure value',
        `O Valor obtido não pode ser usado. Tente com imagem que contenha o valores numériocos. 
          Resultado obtido: ${result.response.text()}
        `,
      );

    return {
      imageUrl: getResponse.uri,
      measureValue,
    };
  }
}
