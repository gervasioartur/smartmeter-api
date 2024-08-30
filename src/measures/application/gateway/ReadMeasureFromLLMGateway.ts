export interface ReadMeasureFromLLMGateway {
  read(llmFileName: string): Promise<ReadMeasureFromLLMModel>;
}
