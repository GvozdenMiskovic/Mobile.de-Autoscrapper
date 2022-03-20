import { TranslationServiceClient } from "@google-cloud/translate";
import { Translate } from "@google-cloud/translate/build/src/v2";
import { TranslationDataGateway } from "src/PdfGenerator/Gateways/TranslationDataGateway/TranslationDataGateway";

export class TranslationDataMapper implements TranslationDataGateway {

  constructor(
    private translationClient: TranslationServiceClient,
    private projectId: string
  ) {}

  public async translate(description: string): Promise<string> {
    const translate = new Translate();
    let [translation] = await translate.translate(description, "es")
    return Promise.resolve(translation);
  }
}
