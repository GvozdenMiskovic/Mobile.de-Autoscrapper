import { PdfRequester } from "../../PdfRequester/PdfRequester";
import { ScrapeRequester } from "../../ScrapeRequester/ScrapeRequester";
import { ScrapeResponse } from "../../ScrapeRequester/Scrape.boundary";
import { PdfBuilderFactory } from "./PdfBuilder/PdfBuilderFactory";
import { ImageDataGateway } from "./ImageDataGateway/ImageDataGateway";
import { scan } from "rxjs";

export class PdfGenerator implements PdfRequester {
    private scraper: ScrapeRequester;
    private pdfBuilderFactory: PdfBuilderFactory;
    private imageDataGateway: ImageDataGateway;

    async generatePdfFromWithPrice(link: string, price: number): Promise<string> {
        const scrappedData: ScrapeResponse = await this.scraper.scrapeLink(link);
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