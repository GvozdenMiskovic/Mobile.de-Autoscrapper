import { PdfBuilderFactory } from "../PdfGenerator/PdfBuilder/PdfBuilderFactory";
import { PdfMakeBuilder } from "./PdfMakeBuilder";
import { PdfBuilderInterface } from "../PdfGenerator/PdfBuilder/PdfBuilderInterface";

export class PdfMakeBuilderFactory implements PdfBuilderFactory {
    create(): PdfBuilderInterface {
        return new PdfMakeBuilder();
    }
}