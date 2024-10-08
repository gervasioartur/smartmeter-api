import { Inject, Injectable } from '@nestjs/common';
import { IsMeasureRegisteredGateway } from '../gateway/IsMeasureRegisteredGateway';
import { IsMeasureRegisteredService } from '@/measures/infra/service/IsMeasureRegistered.service';
import { IsRegisteredParams } from '@/measures/domain/model/models';

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
