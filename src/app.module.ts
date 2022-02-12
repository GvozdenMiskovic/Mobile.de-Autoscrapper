import { Module } from "@nestjs/common";
import { PdfCreationModule } from "./api/Scraping/PdfCreation.module";

@Module({
    imports: [
        PdfCreationModule
    ]
})
export class AppModule {}