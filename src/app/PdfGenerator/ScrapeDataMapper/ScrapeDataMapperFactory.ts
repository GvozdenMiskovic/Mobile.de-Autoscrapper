import { ScrapeDataMapper } from "./ScrapeDataMapper";

export abstract class ScrapeDataMapperFactory {
  abstract create(): ScrapeDataMapper;
}
