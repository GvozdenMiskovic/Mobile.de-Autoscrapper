import { PdfBuilderInterface } from "../../Domain/PdfBuilder/PdfBuilderInterface";
import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import { randomUUID } from "crypto";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";

export class PdfMakeBuilder implements PdfBuilderInterface {
    private readonly docDefinition: Content[];

    constructor() {
        this.docDefinition = [];
    }

    addDescriptionPages(tableInformation: Map<string, string>, description: string): PdfBuilderInterface {
        this.docDefinition.push({
            table: {
                body: [
                    [...tableInformation.keys()],
                    [...tableInformation.values()]
                ]
            }
        });
        this.docDefinition.push({
            text: description,
            pageBreak: "after"
        });
        return this;
    }

    addImageGridPages(imagePaths: string[]): PdfBuilderInterface {
        return this;
    }

    addTitlePage(title: string, pathToMainImage: string): PdfBuilderInterface {
        this.docDefinition.push({
            text: title,
            style: 'header',
            pageBreak: "after"
        });
        // this.docDefinition.push({
        //     image: pathToMainImage,
        //     pageBreak: "after"
        // })
        return this;
    }

    async build(): Promise<string> {
        const path: string = __dirname + "/" + randomUUID();
        const printer = new PdfPrinter({
            Roboto: {
                normal: './fonts/Roboto-Regular.ttf',
                bold: './fonts/Roboto-Medium.ttf',
                italics: './fonts/Roboto-Italic.ttf',
                bolditalics: './fonts/Roboto-MediumItalic.ttf'
            }
        });
        const doc = printer.createPdfKitDocument({
            content: this.docDefinition
        });
        const val: Promise<string> = new Promise((resolve) => {
            doc.pipe(
                createWriteStream(path)
            )
                .on('finish', () => resolve(path))
        });
        doc.end();
        return val;
    }
}