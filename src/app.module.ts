import { Module } from "@nestjs/common";
import { ScrapeModule } from "./api/Scrape.module";

@Module({
    imports: [
        ScrapeModule
    ]
})
export class AppModule {}