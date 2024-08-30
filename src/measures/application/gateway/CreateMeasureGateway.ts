import { Measure } from 'src/domain/entity/Measure';

export interface CreateMeasureGateway {
  create(params: Measure): Promise<Measure>;
}
