import { ScrapeResponse } from "./Scrape.boundary";

export interface ScrapeRequester {
    scrapeLink(link: String): Promise<ScrapeResponse>;
}