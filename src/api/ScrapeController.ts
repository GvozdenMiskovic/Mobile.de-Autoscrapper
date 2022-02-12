import { Controller, Get, Param } from "@nestjs/common";
import { ScrapeResponse } from "../ScrapeRequester/Scrape.boundary";
import { ScrapeRequesterFactory } from "../ScrapeRequester/ScrapeRequesterFactory";

@Controller("/scrape")
export class ScrapeController {
    private requesterFactory: ScrapeRequesterFactory;

    constructor(requesterFactory: ScrapeRequesterFactory) {
        this.requesterFactory = requesterFactory;
    }

    @Get()
    public async getRawLinkData(@Param('link') link: string): Promise<ScrapeResponse> {
        return undefined;
    }
}