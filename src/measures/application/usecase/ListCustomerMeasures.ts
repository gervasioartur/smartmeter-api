import { MeasuresNotFoundError } from '@/measures/domain/error/MeasuresNotFoundError';
import {
  ListCustomerMeasuresModel,
  ListCustomerMeasuresParams,
  MeasureModel,
} from '@/measures/domain/model/models';
import { ListCustomerMeasuresService } from '@/measures/infra/service/ListCustomerMeasures.service';
import { Inject, Injectable } from '@nestjs/common';
import { ListCustomerMeasuresGateway } from '../gateway/ListCustomerMeasuresGateway';
import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';

@Injectable()
export class ListCustomerMeasures {
  constructor(
    @Inject(ListCustomerMeasuresService)
    private readonly gateway: ListCustomerMeasuresGateway,
  ) {}
  async list(
    params: ListCustomerMeasuresParams,
  ): Promise<ListCustomerMeasuresModel> {
    const measures = await this.gateway.list(params);
    if (!measures.length) throw new MeasuresNotFoundError();

    return {
      customerCode: params.customerCode,
      measures: measures.map((measure) => this.mapToMeasureModel(measure)),
    };
  }

  private mapToMeasureModel(measure: MeasureEntity): MeasureModel {
    return {
      measureUuid: measure.getId(),
      measureDateTime: measure.getMeasureDateTime(),
      measureType: measure.getMeasureType(),
      measureValue: measure.getMeasureValue(),
      hasConfirmed: measure.getHasConfirmed(),
      imageUrl: `http://${process.env.HOST}:${process.env.PORT}/images/${measure.getImageUrl()}`,
    };
  }
}
