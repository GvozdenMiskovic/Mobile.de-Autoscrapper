import { ScrapeResponse } from "./Scrape.boundary";

export interface ScrapeRequester {
    scrapeLink(link: String, price: number): Promise<ScrapeResponse>;
}