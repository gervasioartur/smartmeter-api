import { Inject, Injectable } from '@nestjs/common';
import { Measure } from 'src/domain/entity/Measure';
import { CreateMeasureService } from 'src/infra/service/CreateMeasure.service';
@Injectable()
export class CreateMeasure {
  constructor(
    @Inject(CreateMeasureService) private readonly gateway: CreateMeasure,
  ) {}

  async create(params: Measure): Promise<Measure> {
    return await this.create(params);
  }
}
