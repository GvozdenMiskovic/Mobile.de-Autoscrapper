import { TranslationServiceClient } from "@google-cloud/translate";
import { TranslationDataGateway } from "src/PdfGenerator/Gateways/TranslationDataGateway/TranslationDataGateway";
import { TranslationDataGatewayFactory } from "src/PdfGenerator/Gateways/TranslationDataGateway/TranslationDataGatewayFactory";
import { TranslationDataMapper } from "./TranslationDataMapper";

export class TransaltionDataMapperFactory implements TranslationDataGatewayFactory {
  constructor(private readonly projectId: string,
              private readonly client: TranslationServiceClient) {}

  create(): TranslationDataGateway {
    return new TranslationDataMapper(this.client, this.projectId);
  }
}
