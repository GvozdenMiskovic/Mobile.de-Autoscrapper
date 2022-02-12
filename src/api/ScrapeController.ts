import { Controller, Get, Param } from "@nestjs/common";
import { ScrapeResponse } from "../ScrapeRequester/Scrape.boundary";

@Controller("/scrape")
export class ScrapeController {
    @Get()
    public async getRawLinkData(@Param('link') link: string): Promise<ScrapeResponse> {
        return undefined;
    }
}