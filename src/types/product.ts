export interface ProductImage {
    url: string;
    isThumbnail: boolean;
    name: string;
    mimeType: string;
}

export interface Price {
    name: string;
    rate: number;
    currency: string;
}

export interface Product {
    title: string;
    description: string;
    marketingRomance: string;
    priceList: {
        [key: string]: Price;
    };
    imageList: ProductImage[];
    sizeRangeList: string[];
    descriptionList: string[];
    fabricContent: string;
    washingInstructions: string;
    gotsCertified: string;
    impactFairTradePeople: number;
    primaryColorList: string[];
    fitDetailList: string[];
}

