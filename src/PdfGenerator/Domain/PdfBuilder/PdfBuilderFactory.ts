import { PdfBuilderInterface } from "./PdfBuilderInterface";

export abstract class PdfBuilderFactory {
    abstract create(): PdfBuilderInterface;
}