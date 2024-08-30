import { Module } from '@nestjs/common';
import { UploadMeasureController } from './api/controller/UploadMeasureController';
import { CreateMeasure } from './application/usecase/CreateMeasure';
import { IsMeasureRegistered } from './application/usecase/IsMeasureRegistered';
import { LLMUpload } from './application/usecase/LLMUpload';
import { LocalUpload } from './application/usecase/LocalUpload';
import { ReadMeasureFromLLM } from './application/usecase/ReadMeasureFromLLM';
import { UploadMeasure } from './application/usecase/UploadMeasure';
import { CreateMeasureService } from './infra/service/CreateMeasure.service';
import { IsMeasureRegisteredService } from './infra/service/IsMeasureRegistered.service';
import { LLMUploadService } from './infra/service/LLMUpload.service';
import { ReadMeasureFromLlmService } from './infra/service/ReadMeasureFromLlm.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Measure, MeasureSchema } from './infra/mongo/Measure';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Measure.name,
        schema: MeasureSchema,
      },
    ]),
  ],
  controllers: [UploadMeasureController],
  providers: [
    CreateMeasure,
    IsMeasureRegistered,
    LLMUpload,
    LocalUpload,
    ReadMeasureFromLLM,
    UploadMeasure,
    CreateMeasureService,
    IsMeasureRegisteredService,
    LLMUploadService,
    ReadMeasureFromLlmService,
  ],
})
export class MeasuresModule {}
