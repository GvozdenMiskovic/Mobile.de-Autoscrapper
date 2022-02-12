export interface PdfRequester {
    generatePdfFromWithPrice(link: string, price: number): Promise<string>;
}