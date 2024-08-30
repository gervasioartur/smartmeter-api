import { UploadImageParams } from '@/measures/domain/model/models';

export interface LLMUploadGateway {
  upload(params: UploadImageParams): Promise<string>;
}
