export type ScrapeResponse = {
    title: string;
    mainPictureUrl: string;
    table: Map<string, string[]>;
    description?: string;
    price: number;
    otherImageUrls: string[];
}