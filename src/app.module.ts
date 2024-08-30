import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasuresModule } from './measures/measures.module';

@Module({
  imports: [MeasuresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
