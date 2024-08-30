import { Inject, Injectable } from '@nestjs/common';
import { LLMUploadGateway } from '../gateway/LLMUploadGateway';
import { UploadImageParams } from 'src/domain/model/models';
import { LLMUploadService } from 'src/infra/service/LLMUpload.service';

@Injectable()
export class LLMUpload {
  constructor(
    @Inject(LLMUploadService) private readonly gateway: LLMUploadGateway,
  ) {}
  async upload(params: UploadImageParams): Promise<string> {
    return await this.gateway.upload(params);
  }
}
