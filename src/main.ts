import { NestFactory } from "@nestjs/core";

async function bootstrap() {
    let AppModule;
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();