import { UpdateMeasureParams } from '@/measures/domain/model/models';

export interface UpdateMeasureGateway {
  update(params: UpdateMeasureParams): Promise<void>;
}
