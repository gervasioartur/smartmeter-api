import { Inject, Injectable } from '@nestjs/common';
import { LocalUpload } from './LocalUpload';
import { LLMUpload } from './LLMUpload';
import { ReadMeasureFromLLM } from './ReadMeasureFromLLM';
import { CreateMeasure } from './CreateMeasure';
import { IsMeasureRegistered } from './IsMeasureRegistered';
import { DoubleReportError } from 'src/measures/domain/error/DoubleReportError';
import { Measure } from 'src/measures/domain/entities/Measure';
import {
  UploadMeasureParams,
  UploadModel,
} from 'src/measures/domain/model/models';

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
    const localFileResult = this.localUpload.upload(params.image);
    const llmFileName = await this.llmUpload.upload(localFileResult);
    const result = await this.readMeasureFromLLm.read(llmFileName);

    let measure = new Measure(
      result.imageUrl,
      params.costumerCode,
      params.measureDateTime,
      params.measureType,
      result.measureValue,
      false,
    );

    measure = await this.createMeasure.create(measure);
    return {
      imageUrl: measure.getImageUrl(),
      measureValue: measure.getMeasureValue(),
      measureUUid: measure.getMeasureUUId(),
    };
  }
}
