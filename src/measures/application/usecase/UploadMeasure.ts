import { Inject, Injectable } from '@nestjs/common';
import { LocalUpload } from './LocalUpload';
import { LLMUpload } from './LLMUpload';
import { ReadMeasureFromLLM } from './ReadMeasureFromLLM';
import { CreateMeasure } from './CreateMeasure';
import { IsMeasureRegistered } from './IsMeasureRegistered';
import {
  UploadMeasureParams,
  UploadModel,
} from '@/measures/domain/model/models';
import { DoubleReportError } from '@/measures/domain/error/DoubleReportError';
import { MeasureEntity } from '@/measures/domain/entities/MeasureEntity';

@Injectable()
export class UploadMeasure {
  constructor(
    @Inject(IsMeasureRegistered)
    private readonly isRegistered: IsMeasureRegistered,
    @Inject(LocalUpload) private readonly localUpload: LocalUpload,
    @Inject(LLMUpload) private readonly llmUpload: LLMUpload,
    @Inject(ReadMeasureFromLLM)
    private readonly readMeasureFromLLm: ReadMeasureFromLLM,
    @Inject(CreateMeasure) private readonly createMeasure: CreateMeasure,
  ) {}
  async upload(params: UploadMeasureParams): Promise<UploadModel> {
    const isRegistered = await this.isRegistered.isRegistered(params);
    if (isRegistered) throw new DoubleReportError();

    const localFileResult = this.localUpload.upload({
      measureType: params.measureType,
      base64Image: params.image,
      costumerCode: params.costumerCode,
      measureDateTime: params.measureDateTime,
    });
    const llmFileName = await this.llmUpload.upload(localFileResult);
    const result = await this.readMeasureFromLLm.read(llmFileName);

    let measure = new MeasureEntity(
      localFileResult.fileName,
      params.costumerCode,
      params.measureDateTime,
      params.measureType,
      result.measureValue,
      false,
    );

    measure = await this.createMeasure.create(measure);
    return {
      imageUrl: `http://${process.env.HOST}:${process.env.PORT}/images/${measure.getImageUrl()}`,
      measureValue: measure.getMeasureValue(),
      measureUUid: measure.getId(),
    };
  }
}
