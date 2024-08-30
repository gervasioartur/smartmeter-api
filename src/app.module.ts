import { Module } from '@nestjs/common';
import { MeasuresModule } from './measures/measures.module';

@Module({
  imports: [MeasuresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
