import { ScrapeDataMapper } from "./ScrapeDataMapper";
import { ScrapeDataGatewayFactory } from "../ScrapedDataGateway/ScrapeDataGatewayFactory";
import { ScrapeDataGateway } from "../ScrapedDataGateway/ScrapeDataGateway";

export class ScrapeDataMapperFactory implements ScrapeDataGatewayFactory{
  create(): ScrapeDataGateway {
    return new ScrapeDataMapper();
  }
}
