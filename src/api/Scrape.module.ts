import { Module } from "@nestjs/common";
import { ScrapeController } from "./ScrapeController";

@Module({
    controllers: [ScrapeController],
})
export class ScrapeModule {}