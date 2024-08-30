import { IsRegisteredParams } from '@/measures/domain/model/models';

export interface IsMeasureRegisteredGateway {
  isRegistered(params: IsRegisteredParams): Promise<boolean>;
}
