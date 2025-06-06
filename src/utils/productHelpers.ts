import productData from '../../data/product.json';
import type { Product } from '@/models/product';
import type { Color } from '@/models/color';
import { colorData } from '@/models/records';

export const transformProduct = (rawProduct: any): Product => ({
    id: rawProduct.externalId,
    title: rawProduct.title,
    price: Object.values(rawProduct.priceList as Record<string, { rate: number }>)[0].rate,
    marketingRomance: rawProduct.marketingRomance,
    imageList: rawProduct.imageList.map((img: any) => ({
        name: img.name,
        url: img.url,
        isThumbnail: img.isThumbnail,
        isVideo: img.isVideo,
        mimeType: img.mimeType,
        provider: img.provider,
        tagList: img.tagList,
        isSwatch: img.isSwatch || false
    })),
    priceList: rawProduct.priceList,
    primaryColorList: rawProduct.primaryColorList,
    sizeRangeList: rawProduct.sizeRangeList,
    descriptionList: rawProduct.descriptionList,
    fabricContent: rawProduct.fabricContent,
    washingInstructions: rawProduct.washingInstructions,
    sizeDetailList: rawProduct.sizeDetailList,
    fabricContentDetailList: rawProduct.fabricContentDetailList,
    category: rawProduct.categoryList?.[0] || ''
});

export const getProductByColor = (color: Color): Product | null => {
    const colorCode = colorData[color].code;
    if (!colorCode) return null;

    const product = productData.data.find(item =>
        item.tagList.some(tag => tag === colorCode)
    );

    if (!product) return null;

    return transformProduct(product);
};


