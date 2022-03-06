import { PdfRequesterFactory } from "../PdfRequester/PdfRequesterFactory";
import { PdfRequester } from "../PdfRequester/PdfRequester";
import { PdfGenerator } from "./PdfGenerator";
import { PdfBuilderFactory } from "./Domain/PdfBuilder/PdfBuilderFactory";
import { ScrapeDataGatewayFactory } from "./Gateways/ScrapedDataGateway/ScrapeDataGatewayFactory";
import { ScrapeDataMapperFactory } from "./Mapper /ScrapeDataMapper/ScrapeDataMapperFactory";
import { PdfMakeBuilderFactory } from "./DomainImpl/PdfBuilderImpl/PdfMakeBuilderFactory";
import { ImageDataMapper } from "./Mapper /ImageDataMapper/ImageDataMapper";

export class PdfGeneratorFactory implements PdfRequesterFactory {
    create(): PdfRequester {
        return new PdfGenerator(
            new ScrapeDataMapperFactory().create(),
            new PdfMakeBuilderFactory(),
            new ImageDataMapper()
        );
    }
}