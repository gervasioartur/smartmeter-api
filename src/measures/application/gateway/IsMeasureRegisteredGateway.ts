import { IsRegisteredParams } from 'src/domain/model/models';

export interface IsMeasureRegisteredGateway {
  isRegistered(params: IsRegisteredParams): Promise<boolean>;
}
