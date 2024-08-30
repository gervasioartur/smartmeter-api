import { FindMeasureByIdGateway } from '@/measures/application/gateway/FindMeasureByIdGateway';
import { Injectable } from '@nestjs/common';
import { Measure } from '../mongo/Measure';
import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FindMeasureByIdService implements FindMeasureByIdGateway {
  constructor(
    @InjectModel(Measure.name) private readonly measureModel: Model<Measure>,
  ) {}

  async find(id: string): Promise<MeasureEntity | null> {
    const measure = await this.measureModel.findById(id).exec();
    if (measure === null) return null;

    const measureEntity = new MeasureEntity(
      measure.imageUrl,
      measure.customerCode,
      measure.measureDateTime,
      measure.measureType,
      measure.measureValue,
      measure.hasConfirmed,
    );
    measureEntity.setId(measure.id);
    return measureEntity;
  }
}
