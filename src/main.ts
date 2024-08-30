import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  SwaggerModule.setup('swagger-ui/index.html', app, document);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(process.env.PORT, () => {
    console.log(`Running on : http://${process.env.HOST}:${process.env.PORT}`);
    console.log(
      `Swagger available on : http://${process.env.HOST}:${process.env.PORT}/swagger-ui/index.html`,
    );
  });
}
bootstrap();
