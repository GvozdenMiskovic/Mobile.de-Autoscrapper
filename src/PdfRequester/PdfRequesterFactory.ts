import { PdfRequester } from "./PdfRequester";

export abstract class PdfRequesterFactory {
    abstract create(): PdfRequester;
}