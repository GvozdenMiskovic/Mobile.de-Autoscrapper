import { ImageDataGateway } from "../../Gateways/ImageDataGateway/ImageDataGateway";
import { request } from "http";
import * as fs from "fs";
import { randomUUID } from "crypto";
import download from "image-downloader";

export class ImageDataMapper implements ImageDataGateway {
    saveBatchToFileAndGetPath(urls: string[]): Promise<string[]> {
        const paths: Promise<string>[] = [];
        for (const url of urls) {
            paths.push(
                this.saveToFileAndGetPath(url)
            );
        }

        return Promise.all(paths);
      }

      async saveToFileAndGetPath(url: string): Promise<string> {
        const options = {
          url: url,
          dest: __dirname + "/" + randomUUID() + ".jpg"
        }

        await download.image(options)
        .then(({ filename }) => {
          console.log('Saved to', filename)
        })
        .catch((err) => console.error(err))
        return Promise.resolve(options.dest);
    }
}
