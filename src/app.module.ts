import { Module } from "@nestjs/common";
import { PdfCreationModule } from "./api/PdfCreation/PdfCreation.module";
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path";

@Module({
    imports: [
        PdfCreationModule,
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '../src', 'client'),
          exclude: ['/api*'],
        }),
    ]
})
export class AppModule {}
