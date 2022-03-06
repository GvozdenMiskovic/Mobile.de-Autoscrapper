import { Module } from "@nestjs/common";
import { PdfCreationController } from "./PdfCreation.controller";
import { PdfRequesterFactory } from "../../PdfRequester/PdfRequesterFactory";
import { PdfGeneratorFactory } from "../../app/PdfGenerator/PdfGeneratorFactory";

@Module({
    controllers: [PdfCreationController],
    providers: [
        {
            provide: PdfRequesterFactory,
            useClass: PdfGeneratorFactory
        }
    ]
})
export class PdfCreationModule {}