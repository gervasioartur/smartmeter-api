import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';
import { ListCustomerMeasuresParams } from '@/measures/domain/model/models';

export interface ListCustomerMeasuresGateway {
  list(params: ListCustomerMeasuresParams): Promise<MeasureEntity[]>;
}
