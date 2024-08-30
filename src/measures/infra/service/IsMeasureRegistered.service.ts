import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measure } from '../mongo/Measure';
import { Model } from 'mongoose';
import { IsMeasureRegisteredGateway } from '@/measures/application/gateway/IsMeasureRegisteredGateway';
import { IsRegisteredParams } from '@/measures/domain/model/models';

@Injectable()
export class IsMeasureRegisteredService implements IsMeasureRegisteredGateway {
  constructor(
    @InjectModel(Measure.name)
    private readonly measureModel: Model<Measure>,
  ) {}

  async isRegistered(params: IsRegisteredParams): Promise<boolean> {
    const filter = {
      customerCode: params.costumerCode,
      measureDateTime: params.measureDateTime,
      measureType: params.measureType,
    };
    const measure = await this.measureModel.findOne(filter).exec();
    return measure !== null;
  }
}
