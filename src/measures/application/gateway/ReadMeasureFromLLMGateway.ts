import { ReadMeasureFromLLMModel } from '@/measures/domain/model/models';

export interface ReadMeasureFromLLMGateway {
  read(llmFileName: string): Promise<ReadMeasureFromLLMModel>;
}
