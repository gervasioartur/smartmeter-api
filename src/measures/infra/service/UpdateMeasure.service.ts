import { UpdateMeasureGateway } from '@/measures/application/gateway/UpdateMeasureGateway';
import { Injectable } from '@nestjs/common';
import { Measure } from '../mongo/Measure';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMeasureParams } from '@/measures/domain/model/models';

@Injectable()
export class UpdateMeasureService implements UpdateMeasureGateway {
  constructor(
    @InjectModel(Measure.name) private readonly measureModel: Model<Measure>,
  ) {}

  async update(params: UpdateMeasureParams): Promise<void> {
    await this.measureModel.findOneAndUpdate(
      { _id: params.id },
      {
        imageUrl: params.measure.getImageUrl(),
        customerCode: params.measure.getCustomerCode(),
        measureDateTime: params.measure.getMeasureDateTime(),
        measureType: params.measure.getMeasureType(),
        measureValue: params.measure.getMeasureValue(),
        hasConfirmed: params.measure.getHasConfirmed(),
      },
    );
  }
}
