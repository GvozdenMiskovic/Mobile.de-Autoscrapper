import { PdfRequesterFactory } from "../PdfRequester/PdfRequesterFactory";
import { PdfRequester } from "../PdfRequester/PdfRequester";
import { PdfGenerator } from "./PdfGenerator";
import { PdfBuilderFactory } from "./Domain/PdfBuilder/PdfBuilderFactory";
import { ScrapeDataGatewayFactory } from "./Gateways/ScrapedDataGateway/ScrapeDataGatewayFactory";
import { ScrapeDataMapperFactory } from "./Mapper/ScrapeDataMapper/ScrapeDataMapperFactory";
import { PdfMakeBuilderFactory } from "./DomainImpl/PdfBuilderImpl/PdfMakeBuilderFactory";
import { ImageDataMapper } from "./Mapper/ImageDataMapper/ImageDataMapper";
import { Injectable } from "@nestjs/common";
import { TransaltionDataMapperFactory } from "./Mapper/TranslationDataMapper/TranslationDataMapperFactory";
import { TranslationServiceClient } from "@google-cloud/translate";


@Injectable()
export class PdfGeneratorFactory implements PdfRequesterFactory {
  private readonly projectId: string = "importy-garage-f-1647527251263";

  create(): PdfRequester {
            return new PdfGenerator(
            new ScrapeDataMapperFactory().create(),
            new PdfMakeBuilderFactory(),
            new ImageDataMapper(),
            new TransaltionDataMapperFactory(this.projectId, new TranslationServiceClient())
        );
    }
}
