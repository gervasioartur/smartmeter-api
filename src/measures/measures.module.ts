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
import { ConfirmMeasureController } from './api/controller/ConfirmMeasureController';
import { ConfirmMeasure } from './application/usecase/ConfirmMeasure';
import { FindMeasureById } from './application/usecase/FindMeasureById';
import { UpdateMeasure } from './application/usecase/UpdateMeasure';
import { FindMeasureByIdService } from './infra/service/FindMeasureById.service';
import { UpdateMeasureService } from './infra/service/UpdateMeasure.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Measure.name,
        schema: MeasureSchema,
      },
    ]),
  ],
  controllers: [UploadMeasureController, ConfirmMeasureController],
  providers: [
    CreateMeasure,
    IsMeasureRegistered,
    LLMUpload,
    LocalUpload,
    ReadMeasureFromLLM,
    UploadMeasure,
    ConfirmMeasure,
    FindMeasureById,
    UpdateMeasure,
    CreateMeasureService,
    IsMeasureRegisteredService,
    LLMUploadService,
    ReadMeasureFromLlmService,
    FindMeasureByIdService,
    UpdateMeasureService,
  ],
})
export class MeasuresModule {}
