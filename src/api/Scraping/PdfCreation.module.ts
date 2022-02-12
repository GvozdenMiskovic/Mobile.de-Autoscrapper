import { Module } from "@nestjs/common";
import { PdfCreationController } from "./PdfCreation.controller";

@Module({
    controllers: [PdfCreationController],
})
export class ScrapeModule {}