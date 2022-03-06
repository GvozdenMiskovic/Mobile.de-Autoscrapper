import { ScrapeDataMapper } from "./ScrapeDataMapper";
import { ScrapeDataGatewayFactory } from "../../Gateways/ScrapedDataGateway/ScrapeDataGatewayFactory";
import { ScrapeDataGateway } from "../../Gateways/ScrapedDataGateway/ScrapeDataGateway";

export class ScrapeDataMapperFactory implements ScrapeDataGatewayFactory{
  create(): ScrapeDataGateway {
    return new ScrapeDataMapper();
  }
}
