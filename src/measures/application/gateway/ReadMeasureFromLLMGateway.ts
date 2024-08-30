import { ReadMeasureFromLLMModel } from 'src/domain/model/models';

export interface ReadMeasureFromLLMGateway {
  read(llmFileName: string): Promise<ReadMeasureFromLLMModel>;
}
