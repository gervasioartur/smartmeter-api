import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeasureModel } from '../mongo/MeasureModel';
import { Model } from 'mongoose';
import { CreateMeasureGateway } from 'src/application/gateway/CreateMeasureGateway';
import { Measure } from 'src/domain/entity/Measure';
import { UUID } from 'crypto';

@Injectable()
export class CreateMeasureService implements CreateMeasureGateway {
  constructor(
    @InjectModel(MeasureModel.name)
    private readonly measureModel: Model<MeasureModel>,
  ) {}

  async create(params: Measure): Promise<Measure> {
    let measure = new this.measureModel(params);
    measure = await measure.save();
    params.setMeasureUUId(measure.measureUUId as UUID);
    return params;
  }
}
