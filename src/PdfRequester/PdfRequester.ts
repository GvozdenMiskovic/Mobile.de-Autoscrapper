import { PdfRequest } from "./PdfRequester.boundar";

export interface PdfRequester {
    generatePdfFromWithPrice(request: PdfRequest): Promise<string>;
}