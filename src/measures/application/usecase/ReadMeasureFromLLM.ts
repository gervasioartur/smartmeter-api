import { ReadMeasureFromLlmService } from 'src/measures/infra/service/ReadMeasureFromLlm.service';
import { ReadMeasureFromLLMGateway } from '../gateway/ReadMeasureFromLLMGateway';
import { Inject, Injectable } from '@nestjs/common';
import { ReadMeasureFromLLMModel } from 'src/measures/domain/model/models';

@Injectable()
export class ReadMeasureFromLLM {
  constructor(
    @Inject(ReadMeasureFromLlmService)
    private readonly gateway: ReadMeasureFromLLMGateway,
  ) {}

  async read(llmFileName: string): Promise<ReadMeasureFromLLMModel> {
    return await this.gateway.read(llmFileName);
  }
}
