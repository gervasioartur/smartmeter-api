import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';

export interface FindMeasureByIdGateway {
  find(id: string): Promise<MeasureEntity | null>;
}
