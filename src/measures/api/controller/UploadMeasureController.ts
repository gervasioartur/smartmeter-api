import { UploadMeasure } from '@/measures/application/usecase/UploadMeasure';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UploadMeasureRequest } from '../dto/UploadMeasureRequest';
import { UploadMeasureParams } from '@/measures/domain/model/models';
import { InvalidDataError } from '@/measures/domain/error/InvalidDataError';
import { DoubleReportError } from '@/measures/domain/error/DoubleReportError';
import { InvalidGeminiKeyError } from '@/measures/domain/error/InvalidGeminiKeyError';

@ApiTags('Measures')
@Controller('upload')
export class UploadMeasureController {
  constructor(@Inject(UploadMeasure) private usecase: UploadMeasure) {}

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
  async perform(@Body() params: UploadMeasureParams, @Res() res: Response) {
    try {
      const response = await this.usecase.upload(params);
      res.status(200).send(response);
    } catch (error) {
      if (
        error instanceof InvalidDataError ||
        error instanceof InvalidGeminiKeyError
      )
        return res.status(400).send(error.message);
      else if (error instanceof DoubleReportError)
        return res.status(409).send(error.message);
      else return res.status(500).send(error.message);
    }
  }
}
