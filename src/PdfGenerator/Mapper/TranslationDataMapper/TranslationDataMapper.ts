import { TranslationServiceClient } from "@google-cloud/translate";
import { TranslationDataGateway } from "src/PdfGenerator/Gateways/TranslationDataGateway/TranslationDataGateway";

export class TranslationDataMapper implements TranslationDataGateway {

  constructor(
    private translationClient: TranslationServiceClient,
    private projectId: string
  ) {}

  public async translate(path: string): Promise<string> {
    const config = {
      gcsSource: {
        inputUri: path
      }
    };
    const request = {
      parent: this.translationClient.locationPath(this.projectId, 'global'),
      documentInputConfig: config,
      targetLanguageCode: 'es-ES'
    }
    const [response] = await this.translationClient.translateDocument(request);
    console.log(response);
    return Promise.resolve(undefined);
  }
}
