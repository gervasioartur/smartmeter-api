import { Body, Controller, Inject, Patch, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UploadMeasureRequest } from '../dto/UploadMeasureRequest';
import { BaseController } from './_BaseController';
import { Validator } from '../validation/validator/_Validator';
import { ValidationBuilder } from '../validation/ValidationBuilder';
import { ConfirmMeasure } from '@/measures/application/usecase/ConfirmMeasure';
import { ConfirmMeasureRequest } from '../dto/ConfirmMeasureRequest';
import { MeasureNotFoundError } from '@/measures/domain/error/MeasureNotFoundError';
import { ConfirmationDuplicatedError } from '@/measures/domain/error/ConfirmationDuplicatedError';
import { HttpError } from '../http/HttpError';

@ApiTags('Measures')
@Controller('confirm')
export class ConfirmMeasureController extends BaseController<ConfirmMeasureRequest> {
  constructor(@Inject() private usecase: ConfirmMeasure) {
    super();
  }

  @Patch()
  @ApiOperation({ summary: 'Confirm measure' })
  @ApiBody({
    description: 'Request body for confirm measure',
    type: ConfirmMeasureRequest,
  })
  @ApiResponse({ status: 200, description: 'Success message.' })
  @ApiResponse({ status: 400, description: 'Bad Request happened.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async perform(@Body() request: ConfirmMeasureRequest, @Res() res: Response) {
    try {
      const error = this.validate(request);
      if (error !== undefined)
        return res.status(400).send(new HttpError(error));

      const response = await this.usecase.confirm({
        measureUUid: request.measure_uuid,
        measureValue: request.confirmed_value,
      });
      res.status(200).send(response);
    } catch (error) {
      if (error instanceof MeasureNotFoundError)
        return res.status(404).send(new HttpError(error));
      else if (error instanceof ConfirmationDuplicatedError)
        return res.status(409).send(new HttpError(error));
      else return res.status(500).send(new HttpError(error));
    }
  }

  protected buildValidators(request: ConfirmMeasureRequest): Validator[] {
    return [
      ...ValidationBuilder.of({
        fieldValue: request.measure_uuid,
        fieldName: 'measure id',
      })
        .required()
        .build(),
      ...ValidationBuilder.of({
        fieldValue: request.confirmed_value,
        fieldName: 'measure value',
      })
        .required()
        .build(),
    ];
  }
}
