import { ScrapeRequester } from "./ScrapeRequester";

export abstract class ScrapeRequesterFactory {
    abstract create(): ScrapeRequester;
}