import { ImageDataGateway } from "../../Gateways/ImageDataGateway/ImageDataGateway";
import { request } from "http";
import * as fs from "fs";
import { randomUUID } from "crypto";

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

    saveToFileAndGetPath(url: string): Promise<string> {
        const path: string = __dirname + "/" + randomUUID();
        return new Promise((resolve) => {
            request(url, {
                protocol: 'http:',
                headers: {
                    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "max-age=0",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "sec-gpc": 1,
                    "upgrade-insecure-requests": 1,
                    "user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36"
                }
            }, res => {
                 res
                    .pipe(
                        fs.createWriteStream(path)
                    )
                    .on('finish', () => resolve(path));
            })
        });
    }
}