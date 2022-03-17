import { Body, Controller, Get, Headers, Param, Post, Res, StreamableFile } from "@nestjs/common";
import { PdfRequesterFactory } from "../../PdfRequester/PdfRequesterFactory";
import { createReadStream } from "fs";
import { PdfRequest } from "../../PdfRequester/PdfRequester.boundary";

@Controller("/scrape")
export class PdfCreationController {
    private requesterFactory: PdfRequesterFactory;

    constructor(requesterFactory: PdfRequesterFactory) {
        this.requesterFactory = requesterFactory;
    }

    @Post()
    public async generatePdf(@Headers() headers,
                             @Body() request: PdfRequest): Promise<StreamableFile> {
        const pathToFile = await this.requesterFactory
            .create()
            .generatePdfFromWithPrice(request);
        console.log(pathToFile);
        headers['Content-Type'] = 'image/pdf';
        const file = createReadStream(pathToFile);
        return new StreamableFile(file);
    }
}
