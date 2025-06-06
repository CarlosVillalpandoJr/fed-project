import { Product, ProductImage } from '@/types/product';

export function parseProductData(rawData: any): Product {
    const product = rawData.data[0];

    return {
        title: product.title,
        description: product.description,
        marketingRomance: product.marketingRomance,
        priceList: product.priceList,
        imageList: product.imageList.filter((img: ProductImage) => !img.isThumbnail),
        sizeRangeList: product.sizeRangeList,
        descriptionList: product.descriptionList,
        fabricContent: product.fabricContent,
        washingInstructions: product.washingInstructions,
        gotsCertified: product.gotsCertified,
        impactFairTradePeople: product.impactFairTradePeople,
        primaryColorList: product.primaryColorList,
        fitDetailList: product.fitDetailList,
    };
} 