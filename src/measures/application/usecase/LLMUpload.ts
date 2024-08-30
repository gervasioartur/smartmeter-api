import { Inject, Injectable } from '@nestjs/common';
import { LLMUploadGateway } from '../gateway/LLMUploadGateway';
import { LLMUploadService } from 'src/measures/infra/service/LLMUpload.service';
import { UploadImageParams } from 'src/measures/domain/model/models';

@Injectable()
export class LLMUpload {
  constructor(
    @Inject(LLMUploadService) private readonly gateway: LLMUploadGateway,
  ) {}
  async upload(params: UploadImageParams): Promise<string> {
    return await this.gateway.upload(params);
  }
}
