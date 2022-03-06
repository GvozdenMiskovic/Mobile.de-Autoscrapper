export interface ImageDataGateway {
    /**
     * Download an image from the provided url and save it to a file
     * returning the absolute path to the file
     * @param url The url of the image to download
     */
    saveToFileAndGetPath(url: string): Promise<string>;

    /**
     * Download an images from the provided urls and save them to a files
     * returning the absolute path to each file created
     * @param urls The urls of images to download
     */
    saveBatchToFileAndGetPath(urls: string[]): Promise<string[]>;
}