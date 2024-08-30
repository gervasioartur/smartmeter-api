import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('smartmeasure-api')
    .setDescription(
      `serviço que gerencia a leitura individualizada de
consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para
obter a medição através da foto de um medidor`,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();
