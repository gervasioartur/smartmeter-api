import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeasureModel } from '../mongo/MeasureModel';
import { Model } from 'mongoose';
import { IsMeasureRegisteredGateway } from 'src/measures/application/gateway/IsMeasureRegisteredGateway';
import { IsRegisteredParams } from 'src/measures/domain/model/models';

@Injectable()
export class IsMeasureRegisteredService implements IsMeasureRegisteredGateway {
  constructor(
    @InjectModel(MeasureModel.name)
    private readonly measureModel: Model<MeasureModel>,
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
