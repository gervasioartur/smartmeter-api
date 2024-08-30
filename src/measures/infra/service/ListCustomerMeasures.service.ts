import { ListCustomerMeasuresGateway } from '@/measures/application/gateway/ListCustomerMeasuresGateway';
import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';
import { Model } from 'mongoose';
import { ListCustomerMeasuresParams } from '@/measures/domain/model/models';
import { Injectable } from '@nestjs/common';
import { Measure } from '../mongo/Measure';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ListCustomerMeasuresService
  implements ListCustomerMeasuresGateway
{
  constructor(
    @InjectModel(Measure.name) private readonly measureModel: Model<Measure>,
  ) {}

  async list(params: ListCustomerMeasuresParams): Promise<MeasureEntity[]> {
    const filters = {
      customerCode: params.customerCode,
      ...(params.measureType && { measureType: params.measureType }),
    };
    const measures = await this.measureModel.find(filters).exec();
    return measures.map((measure) => this.maToMeasureEntity(measure));
  }

  private maToMeasureEntity(measure): MeasureEntity {
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
