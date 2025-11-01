import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'https://emily-hrdz.github.io',
      'http://localhost:4200',
      'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
  });
  
  app.useGlobalPipes(new ValidationPipe());

  // DEBUG DE RUTAS
  const server = app.getHttpServer();
  const router = server._events.request._router;
  
  const availableRoutes = router.stack
    .map(layer => {
      if (layer.route) {
        return {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        };
      }
    })
    .filter(item => item !== undefined);
  
  console.log('🛣️  RUTAS REGISTRADAS:');
  availableRoutes.forEach(route => {
    console.log(`${route.method.toUpperCase()} ${route.path}`);
  });

  //const config = new DocumentBuilder()
   // .setTitle('OrbitFit API')
    //.setDescription('Sistema de gestión deportiva')
    //.setVersion('1.0')
    //.addBearerAuth()
    //.build();
  
  //const document = SwaggerModule.createDocument(app, config);
  //SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 Application is running on: http://localhost:3000');
}
bootstrap();