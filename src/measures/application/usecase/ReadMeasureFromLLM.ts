import { ReadMeasureFromLLMModel } from 'src/domain/model/models';
import { ReadMeasureFromLLMGateway } from '../gateway/ReadMeasureFromLLMGateway';
import { Inject, Injectable } from '@nestjs/common';
import { ReadMeasureFromLlmService } from 'src/infra/service/ReadMeasureFromLlm.service';

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
