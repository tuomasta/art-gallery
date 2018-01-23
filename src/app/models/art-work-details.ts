export interface ArtWorkDetails {
    id: string;
    title: string;
    imageSrc: string;
    principalMakers: string[];
    description: string;
}

export interface LoadingModel {
    isLoading?: boolean;
}
