import { ScrapeDataGateway } from "../ScrapedDataGateway/ScrapeDataGateway";
import { ScrappedData } from "../ScrapedDataGateway/ScrappedData";
import { WebElement, Builder, By } from "selenium-webdriver";

export class ScrapeDataMapper implements ScrapeDataGateway {

  public async scrapeLink(link: string): Promise<ScrappedData> {
    const driver = await new Builder().forBrowser('chrome').build();
    const keys = ["Primer registro", "Kilometraje", "Potencia", "Combustible"];

    try {
      await driver.get(link);

      const description: string = await driver.findElement(By.className('description-text.js-original-description')).getText();

      const attr_box: Array<WebElement> = await driver.findElement(By.className('attributes-box')).findElements(By.className('g-row'));
      const attributes: WebElement[][] = await Promise.all(attr_box.map(attr => attr.findElements(By.css('span'))));
      let table: Map <string, string>;

      attributes.forEach(async attr => {
        const key = await attr[0].getText();
        const value = await attr[1].getText();
        if (keys.includes(key)){
          table.set(key, value);
        }
      });

      let images: WebElement[] = await driver.findElements(By.className('js-gallery.img'));
      const imagesUrls : string[] = await Promise.all(images.map((element: WebElement, index: Number) => {
        if (index === 0){
          return null;
        } else if (index === 1){
            return element.getAttribute('src');
        } else {
            return element.getAttribute('data-src');
        }
      }
      ).filter(element => element === null ));

      return {
        mainPictureUrl: imagesUrls.shift(),
        description: description,
        table: table,
        otherImageUrls: imagesUrls
      };
    } finally {
        await driver.quit();
    }
  }
}
