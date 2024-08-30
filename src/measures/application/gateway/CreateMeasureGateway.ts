import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';

export interface CreateMeasureGateway {
  create(params: MeasureEntity): Promise<MeasureEntity>;
}
