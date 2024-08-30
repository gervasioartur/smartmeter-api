import { Measure } from 'src/measures/domain/entities/Measure';

export interface CreateMeasureGateway {
  create(params: Measure): Promise<Measure>;
}
