import { ScrappedData } from "./ScrappedData";

export interface ScrapeDataGateway {
    scrapeLink(link: String): Promise<ScrappedData>;
}