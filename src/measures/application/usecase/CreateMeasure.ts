import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';
import { CreateMeasureService } from '@/measures/infra/service/CreateMeasure.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateMeasure {
  constructor(
    @Inject(CreateMeasureService) private readonly gateway: CreateMeasure,
  ) {}

  async create(params: MeasureEntity): Promise<MeasureEntity> {
    return await this.gateway.create(params);
  }
}
