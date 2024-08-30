import { Inject, Injectable } from '@nestjs/common';
import { UpdateMeasureGateway } from '../gateway/UpdateMeasureGateway';
import { UpdateMeasureService } from '@/measures/infra/service/UpdateMeasure.service';
import { UpdateMeasureParams } from '@/measures/domain/model/models';

@Injectable()
export class UpdateMeasure {
  constructor(
    @Inject(UpdateMeasureService)
    private readonly gateway: UpdateMeasureGateway,
  ) {}

  async update(params: UpdateMeasureParams): Promise<void> {
    await this.gateway.update(params);
  }
}
