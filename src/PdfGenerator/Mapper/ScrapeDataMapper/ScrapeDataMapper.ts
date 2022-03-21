import { ScrapeDataGateway } from "../../Gateways/ScrapedDataGateway/ScrapeDataGateway";
import { ScrappedData } from "../../Gateways/ScrapedDataGateway/ScrappedData";
import { WebElement, Builder, By, until } from "selenium-webdriver";

export class ScrapeDataMapper implements ScrapeDataGateway {

  public async scrapeLink(link: string): Promise<ScrappedData> {
    // const driver = await new Builder().forBrowser('chrome').build();
    const driver = await new Builder()
        .usingServer('http://selenium:4444/wd/hub')
        .forBrowser('chrome')
        .build();
    const keys = ["Primer registro", "Kilometraje", "Potencia", "Combustible"];

    try {
      await driver.get(link);
      // await driver.wait(until.elementLocated(By.className("description-text")), 60000);
      const description: string = (await driver.findElement(By.className("description-text"))?.getText()) ?? "";

      const attr_box: Array<WebElement> = await driver.findElement(By.className('attributes-box')).findElements(By.className('g-row')) ?? [];
      const attributes: WebElement[][] = await Promise.all(
          attr_box.map(attr => {
            return attr.findElements(By.css('span'))
          }));
      const table: Map <string, string> = new Map<string, string>();

      for (let i = 1; i < attributes.length; i++) {
        const key = await attributes[i][0].getText();
        let value = await attributes[i][1].getText();
        if (keys.includes(key)){
          if (key === "Potencia"){
            value = value.split("(")[1].split(")")[0];
          }
          table.set(key, value);
        }
      }

      let images: WebElement[] = await driver.findElements(By.className('js-gallery-img')) ?? [];
      const imagesUrls : string[] = (await Promise.all(images.map((element: WebElement, index: Number) => {
        if (index === 0){
          return null;
        } else if (index === 1){
            return element.getAttribute('src');
        } else {
            return element.getAttribute('data-src');
        }
      }
      ))).filter(element => element !== null );

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
