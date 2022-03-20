export interface TranslationDataGateway {
  /**
   * Translate the document at {@link path} and return the path
   * to the new, translated version
   * @param path
   */
  translate(description: string): Promise<string>;
}
