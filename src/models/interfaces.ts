import type { Color } from '@/models/color';
import { Product } from '@/models/product';

export interface ProductDetailsProps {
    product: Product;
    updateProductColor: (color: Color) => void;
    onImageSelect: (index: number) => void;
    selectedSize: string | null;
    onSizeSelect: (size: string | null) => void;
    selectedColor: Color;
    onColorSelect: (color: Color) => void;
}

export interface ProductCarouselProps {
    product: Product;
    selectedImageIndex: number;
    onImageSelect: (index: number) => void;
}

export interface AddToBagButtonProps {
    selectedSize: string | null;
} 