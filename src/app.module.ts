import { Module } from "@nestjs/common";
import { PdfCreationModule } from "./api/PdfCreation/PdfCreation.module";

@Module({
    imports: [
        PdfCreationModule
    ]
})
export class AppModule {}