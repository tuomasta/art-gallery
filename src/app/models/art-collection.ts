export interface ArtWork {
    title: string;
    id: string;
    url: string;
    creator: string;
}

export interface ArtCollection {
    artworks: ArtWork[];
    totalNumberOfItems: number;
}

