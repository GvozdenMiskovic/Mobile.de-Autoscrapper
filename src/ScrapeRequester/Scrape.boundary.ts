export type ScrapeResponse = {
    title: string;
    mainPictureUrl: string;
    table: Map<string, string[]>;
    description?: string;
    otherImageUrls: string[];
}