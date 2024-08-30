import { ReadMeasureFromLLMGateway } from '../gateway/ReadMeasureFromLLMGateway';
import { Inject, Injectable } from '@nestjs/common';
import { ReadMeasureFromLLMModel } from '@/measures/domain/model/models';
import { ReadMeasureFromLlmService } from '@/measures/infra/service/ReadMeasureFromLlm.service';

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
