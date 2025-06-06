export interface Product {
    id: string;
    title: string;
    price: number;
    marketingRomance: string;
    imageList: ProductImage[];
    priceList: {
        [key: string]: {
            name: string;
            rate: number;
            currency: string;
        };
    };
    primaryColorList: string[];
    sizeRangeList: string[];
    descriptionList: string[];
    fabricContent: string;
    washingInstructions: string;
    sizeDetailList: string[];
    fabricContentDetailList: string[];
    category: string;
}

export interface ProductImage {
    name: string;
    url: string;
    isThumbnail: boolean;
    isVideo: boolean;
    mimeType: string;
    provider: string;
    tagList: string[];
    isSwatch?: boolean;
}

export interface Price {
    name: string;
    rate: number;
    currency: string;
}


