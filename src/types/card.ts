export interface Card {
    id: string;
    title: string;
    keywords: string[];
    domain: string;
    thumbnail: string;
    full: string;
}

export interface CardPack {
    packName: string;
    cards: Card[];
}
