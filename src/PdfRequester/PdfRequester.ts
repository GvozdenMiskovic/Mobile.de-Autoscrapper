import { PdfRequest } from "./PdfRequester.boundary";

export interface PdfRequester {
    generatePdfFromWithPrice(request: PdfRequest): Promise<string>;
}