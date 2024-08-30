import {
  ConfirmMeasureModel,
  ConfirmMeasureParams,
} from '@/measures/domain/model/models';
import { Inject, Injectable } from '@nestjs/common';
import { FindMeasureById } from './FindMeasureById';
import { MeasureNotFoundError } from '@/measures/domain/error/MeasureNotFoundError';
import { ConfirmationDuplicatedError } from '@/measures/domain/error/ConfirmationDuplicatedError';
import { UpdateMeasure } from './UpdateMeasure';

@Injectable()
export class ConfirmMeasure {
  constructor(
    @Inject() private readonly findMeasureById: FindMeasureById,
    @Inject() private readonly updateMeasure: UpdateMeasure,
  ) {}

  async confirm(params: ConfirmMeasureParams): Promise<ConfirmMeasureModel> {
    const measure = await this.findMeasureById.find(params.measureUUid);
    if (measure === null) throw new MeasureNotFoundError();
    if (measure.getHasConfirmed()) throw new ConfirmationDuplicatedError();
    measure.setMeasureValue(params.measureValue);
    measure.setHasConfirmed(true);
    await this.updateMeasure.update({ id: params.measureUUid, measure });
    return { success: true };
  }
}
