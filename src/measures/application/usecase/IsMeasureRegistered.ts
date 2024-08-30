import { Inject, Injectable } from '@nestjs/common';
import { IsMeasureRegisteredGateway } from '../gateway/IsMeasureRegisteredGateway';
import { IsRegisteredParams } from 'src/domain/model/models';
import { IsMeasureRegisteredService } from 'src/infra/service/IsMeasureRegistered.service';

@Injectable()
export class IsMeasureRegistered {
  constructor(
    @Inject(IsMeasureRegisteredService)
    private readonly gateway: IsMeasureRegisteredGateway,
  ) {}

  async isRegistered(params: IsRegisteredParams) {
    return this.gateway.isRegistered(params);
  }
}
