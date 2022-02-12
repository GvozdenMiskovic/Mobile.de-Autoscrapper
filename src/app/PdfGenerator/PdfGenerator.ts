import { PdfRequester } from "../../PdfRequester/PdfRequester";
import { ScrapeDataGateway } from "./ScrapedDataGateway/ScrapeDataGateway";
import { ScrappedData } from "./ScrapedDataGateway/ScrappedData";
import { PdfBuilderFactory } from "./PdfBuilder/PdfBuilderFactory";
import { ImageDataGateway } from "./ImageDataGateway/ImageDataGateway";
import { scan } from "rxjs";

export class PdfGenerator implements PdfRequester {
    private scrappedDataGateway: ScrapeDataGateway;
    private pdfBuilderFactory: PdfBuilderFactory;
    private imageDataGateway: ImageDataGateway;

    async generatePdfFromWithPrice(link: string, price: number): Promise<string> {
        const scrappedData: ScrappedData = await this.scrappedDataGateway.scrapeLink(link);
        const pathToMainImage: string =
            await this.imageDataGateway.saveToFileAndGetPath(scrappedData.mainPictureUrl);
        const pathsToOtherImages: string[] =
            await this.imageDataGateway.saveBatchToFileAndGetPath(scrappedData.otherImageUrls);
        return this.pdfBuilderFactory
            .create()
            .addTitlePage(
                scrappedData.title,
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