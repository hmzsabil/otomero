
export interface ImageFilters {
    artist?: string;
    title?: string;
    year?: string;
}

export interface ResponseData {
    count: number;
    artObjects: ImageItem[];
}

export interface APIResponse {
    success: boolean;
    message: string;
    data: ResponseData | null;
}

export interface ImageItem {
    id: string;
    title: string;
    data: {
        url: string;
        width: number;
        height: number;
    }
}


export interface ImageDetails {
    title: string;
    artist: string;
    description: string;
    dating: string;
    placeOfCreation: string; 
    size_weight: string; 
}