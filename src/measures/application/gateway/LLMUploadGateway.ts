import { UploadImageParams } from 'src/domain/model/models';

export interface LLMUploadGateway {
  upload(params: UploadImageParams): Promise<string>;
}
