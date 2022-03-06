import { PdfRequester } from "../PdfRequester/PdfRequester";
import { ScrapeDataGateway } from "./Gateways/ScrapedDataGateway/ScrapeDataGateway";
import { ScrappedData } from "./Gateways/ScrapedDataGateway/ScrappedData";
import { PdfBuilderFactory } from "./Domain/PdfBuilder/PdfBuilderFactory";
import { ImageDataGateway } from "./Gateways/ImageDataGateway/ImageDataGateway";
import { scan } from "rxjs";
import { PdfRequest } from "../PdfRequester/PdfRequester.boundary";

export class PdfGenerator implements PdfRequester {
    private scrappedDataGateway: ScrapeDataGateway;
    private pdfBuilderFactory: PdfBuilderFactory;
    private imageDataGateway: ImageDataGateway;

    constructor(scrappedDataGateway: ScrapeDataGateway,
                pdfBuilderFactory: PdfBuilderFactory,
                imageDataGateway: ImageDataGateway) {
        this.scrappedDataGateway = scrappedDataGateway;
        this.pdfBuilderFactory = pdfBuilderFactory;
        this.imageDataGateway = imageDataGateway;
    }

    async generatePdfFromWithPrice(request: PdfRequest): Promise<string> {
        const scrappedData: ScrappedData =
            await this.scrappedDataGateway.scrapeLink(request.link);
        const pathToMainImage: string = ""
            await this.imageDataGateway.saveToFileAndGetPath(scrappedData.mainPictureUrl);
        const pathsToOtherImages: string[] =
            await this.imageDataGateway.saveBatchToFileAndGetPath(scrappedData.otherImageUrls);
        return this.pdfBuilderFactory
            .create()
            .addTitlePage(
                request.title,
                pathToMainImage
            )
            .addDescriptionPages(
                scrappedData.table,
                scrappedData.description,
            )
            .addImageGridPages(pathsToOtherImages)
            .build();
    }
}