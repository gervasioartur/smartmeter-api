import { Controller, Get, Inject, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseController } from './_BaseController';
import { Validator } from '../validation/validator/_Validator';
import { ValidationBuilder } from '../validation/ValidationBuilder';
import { HttpError } from '../http/HttpError';
import { MeasuresNotFoundError } from '@/measures/domain/error/MeasuresNotFoundError';
import { ListCustomerMeasures } from '@/measures/application/usecase/ListCustomerMeasures';
import {
  ListCustomerMeasuresResponse,
  MeasureResponse,
} from '../dto/ListCustomerMeasuresResponse';
import { MeasureModel } from '@/measures/domain/model/models';

@ApiTags('Measures')
@Controller()
export class ListCustomerMeasuresController extends BaseController<string> {
  constructor(@Inject() private usecase: ListCustomerMeasures) {
    super();
  }

  @Get(':customer_code/list')
  @ApiOperation({ summary: 'List customer measures' })
  @ApiResponse({ status: 200, description: 'Success message.' })
  @ApiResponse({ status: 404, description: 'Conflict.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiQuery({
    name: 'measure_type',
    description: 'Type of the measure',
    required: false,
    type: String,
    example: 'WATER',
  })
  async perform(
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measure_type: string,
    @Res() res: Response,
  ) {
    try {
      const error = this.validate(measure_type);
      if (error !== undefined)
        return res.status(400).send(new HttpError(error));

      const result = await this.usecase.list({
        customerCode: customer_code,
        measureType: measure_type,
      });
      const response: ListCustomerMeasuresResponse = {
        customer_code: result.customerCode,
        measures: result.measures.map((measure) =>
          this.mapToMeasureResponse(measure),
        ),
      };
      res.status(200).send(response);
    } catch (error) {
      if (error instanceof MeasuresNotFoundError)
        return res.status(404).send(new HttpError(error));
      else return res.status(500).send(new HttpError(error));
    }
  }

  protected buildValidators(request: string): Validator[] {
    if (!request) return [];
    return [
      ...ValidationBuilder.of({
        fieldValue: request,
        fieldName: 'measure type',
      })
        .measureType()
        .build(),
    ];
  }

  private mapToMeasureResponse(response: MeasureModel): MeasureResponse {
    return {
      measure_uuid: response.measureUuid,
      measure_datetime: response.measureDateTime,
      measure_type: response.measureType,
      measure_value: response.measureValue,
      has_confirmed: response.hasConfirmed,
      imageUrl: response.imageUrl,
    };
  }
}
