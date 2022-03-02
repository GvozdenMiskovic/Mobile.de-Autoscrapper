export interface PdfBuilderInterface {
    addTitlePage(title: string, pathToMainImage: string): PdfBuilderInterface;
    addImageGridPages(imagePaths: string[]): PdfBuilderInterface;
    addDescriptionPages(tableInformation: Map<string, string>, description: string): PdfBuilderInterface;
    build(): string;
}
