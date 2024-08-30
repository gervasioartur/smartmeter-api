import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMeasureGateway } from '@/measures/application/gateway/CreateMeasureGateway';
import { Measure } from '../mongo/Measure';
import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';

@Injectable()
export class CreateMeasureService implements CreateMeasureGateway {
  constructor(
    @InjectModel(Measure.name)
    private readonly measureModel: Model<Measure>,
  ) {}

  async create(params: MeasureEntity): Promise<MeasureEntity> {
    let measure = new this.measureModel(params);
    measure = await measure.save();
    params.setId(measure.id);
    return params;
  }
}
