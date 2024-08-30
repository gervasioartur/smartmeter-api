import { FindMeasureByIdGateway } from '../gateway/FindMeasureByIdGateway';
import { Inject, Injectable } from '@nestjs/common';
import { FindMeasureByIdService } from '@/measures/infra/service/FindMeasureById.service';
import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';

@Injectable()
export class FindMeasureById {
  constructor(
    @Inject(FindMeasureByIdService)
    private readonly gateway: FindMeasureByIdGateway,
  ) {}

  async find(id: string): Promise<MeasureEntity | null> {
    return await this.gateway.find(id);
  }
}
