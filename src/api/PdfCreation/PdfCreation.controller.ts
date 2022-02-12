import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { PdfRequesterFactory } from "../../PdfRequester/PdfRequesterFactory";
import { createReadStream } from "fs";

@Controller("/scrape")
export class PdfCreationController {
    private requesterFactory: PdfRequesterFactory;

    constructor(requesterFactory: PdfRequesterFactory) {
        this.requesterFactory = requesterFactory;
    }

    @Get()
    public async generatePdf(@Res() res: Response,
                             @Param('link') link: string,
                             @Param('price') price: number): Promise<StreamableFile> {
        const pathToFile = await this.requesterFactory.create().generatePdfFromWithPrice(link, price);
        res.headers.set('Content-Type', 'image/pdf');
        const file = createReadStream(pathToFile);
        return new StreamableFile(file);
    }
}