import { TranslationDataGateway } from "./TranslationDataGateway";

export interface TranslationDataGatewayFactory {
  create(): TranslationDataGateway;
}
