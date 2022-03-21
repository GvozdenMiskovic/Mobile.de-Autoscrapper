import { PdfBuilderInterface } from "../../Domain/PdfBuilder/PdfBuilderInterface";
import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import { randomUUID } from "crypto";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";
import { content } from "pdfkit/js/page";


export class PdfMakeBuilder implements PdfBuilderInterface {
    private readonly docDefinition: Content[];
    private readonly images: String[];

    constructor() {
        this.docDefinition = [];
    }

    addDescriptionPages(tableInformation: Map<string, string>, description: string, price: number): PdfBuilderInterface {
        this.docDefinition.push({
            columns: [
              { width: '*', text: '' },
              { width: "auto",
                table: {
                    body: [
                        [...Array.from(tableInformation.keys()).map(key => { return { text: key, fontSize: 17, color: "grey"}})],
                        [...Array.from(tableInformation.values()).map(value => { return { text: value, fontSize: 17} })],
                    ]
                },
                alignment: "center"
              },
              { width: '*', text: '' },
            ]
        });
        this.docDefinition.push({
          text: `\n\n${description}`,
        });
        this.docDefinition.push({
          text: `\n\n\nPrecio venta (matriculado y transferido).............................................${price}€`,
          bold: true,
          pageBreak: "after"
        });
        return this;
    }

    addImageGridPages(imagePaths: string[]): PdfBuilderInterface {
        const slicedPaths = imagePaths.slice(0, 16);
        const length = slicedPaths.length;

        for (let i = 0; i < length; i += 2) {
          this.docDefinition.push({
            columns: [
              { image: slicedPaths[i], fit: [210, 210] } ,
              [{ image: slicedPaths[i + 1], fit: [210, 210] }, (i * 2 + 1) % 3 && i !== length - 1 ? { text: "\n\n" } : { text: "", pageBreak: "after"} ]
            ],
            columnGap: 5,
            alignment: "center"
          })
        }

        return this;
    }

    addTitlePage(title: string, pathToMainImage: string): PdfBuilderInterface {
        this.docDefinition.push({
            text: `\n${title}\n\n\n`,
            style: 'header',
            alignment: "center",
            bold: true,
            fontSize: 20
        });
        this.docDefinition.push({
            image: pathToMainImage,
            fit: [400, 400],
            pageBreak: "after",
            alignment: "center"
        })
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
            pageMargins: [70, 200, 70, 50],
            header: {
                columns:
                  [
                      {
                        image: "logo.jpeg",
                        fit: [220, 220],
                        margin: [50, 50, 0, 0]
                      },
                      {
                        text: 'IMPORTY GARAGE\nAcercando tus sueños\n\n663 50 53 46\n931210233\ninfo@importygarage.com\nhttp://www.importygarage.com',
                        alignment: 'right',
                        margin: [0, 50, 50, 0]
                      }
                  ]
            },
            footer: function (currentPage, pageCount) { return {text: `Pagina ${currentPage.toString()} de ${pageCount}`, alignment: "center"}},
            content: this.docDefinition
        });
        return new Promise((resolve) => {

          doc.end();
          doc.pipe(
              createWriteStream(path)
          )
              .on('finish', () => resolve(path))
        });


    }
}
