import { PdfBuilderFactory } from "../../Domain/PdfBuilder/PdfBuilderFactory";
import { PdfMakeBuilder } from "./PdfMakeBuilder";
import { PdfBuilderInterface } from "../../Domain/PdfBuilder/PdfBuilderInterface";

export class PdfMakeBuilderFactory implements PdfBuilderFactory {
    create(): PdfBuilderInterface {
        return new PdfMakeBuilder();
    }
}