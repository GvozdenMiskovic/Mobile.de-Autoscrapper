import { ScrapeDataGateway } from "./ScrapeDataGateway";

export abstract class ScrapeDataGatewayFactory {
    abstract create(): ScrapeDataGateway;
}