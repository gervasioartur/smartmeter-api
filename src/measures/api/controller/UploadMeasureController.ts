import { UploadMeasure } from '@/measures/application/usecase/UploadMeasure';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UploadMeasureRequest } from '../dto/UploadMeasureRequest';
import { InvalidDataError } from '@/measures/domain/error/InvalidDataError';
import { DoubleReportError } from '@/measures/domain/error/DoubleReportError';
import { InvalidGeminiKeyError } from '@/measures/domain/error/InvalidGeminiKeyError';
import { BaseController } from './_BaseController';
import { Validator } from '../validation/validator/_Validator';
import { ValidationBuilder } from '../validation/ValidationBuilder';
import { UploadMeasureResponse } from '../dto/UploadMeasureResponse';
import { HttpError } from '../http/HttpError';

@ApiTags('Measures')
@Controller('upload')
export class UploadMeasureController extends BaseController<UploadMeasureRequest> {
  constructor(@Inject() private usecase: UploadMeasure) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Uploads measure' })
  @ApiBody({
    description: 'Request body for uploading measure',
    type: UploadMeasureRequest,
  })
  @ApiResponse({ status: 200, description: 'Success message.' })
  @ApiResponse({ status: 400, description: 'Bad Request happened.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async perform(@Body() request: UploadMeasureRequest, @Res() res: Response) {
    try {
      const error = this.validate(request);
      if (error !== undefined)
        return res.status(400).send(new HttpError(error));

      const result = await this.usecase.upload({
        image: request.image,
        costumerCode: request.costumer_code,
        measureDateTime: request.measure_dateTime,
        measureType: request.measure_type,
      });

      const response: UploadMeasureResponse = {
        image_url: result.imageUrl,
        measure_value: result.measureValue,
        measure_uuid: result.measureUUid,
      };
      res.status(200).send(response);
    } catch (error) {
      if (
        error instanceof InvalidDataError ||
        error instanceof InvalidGeminiKeyError
      )
        return res.status(400).send(new HttpError(error));
      else if (error instanceof DoubleReportError)
        return res.status(409).send(new HttpError(error));
      else return res.status(500).send(new HttpError(error));
    }
  }

  protected buildValidators(request: UploadMeasureRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ fieldValue: request.image, fieldName: 'image' })
        .required()
        .base64()
        .build(),
      ...ValidationBuilder.of({
        fieldValue: request.costumer_code,
        fieldName: 'customer code',
      })
        .required()
        .build(),
      ...ValidationBuilder.of({
        fieldValue: request.measure_dateTime,
        fieldName: 'Measure datetime',
      })
        .required()
        .build(),
      ...ValidationBuilder.of({
        fieldValue: request.measure_type,
        fieldName: 'Measure type',
      })
        .required()
        .measureType()
        .build(),
    ];
  }
}
