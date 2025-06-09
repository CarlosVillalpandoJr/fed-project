'use client';

import { ProductCarousel } from '@/components/ProductCarousel';
import { ProductDetails } from '@/components/ProductDetails';
import { AddToBagButton } from '@/components/AddToBagButton';
import { Product } from '@/models/product';
import { useState } from 'react';
import { getProductByColor } from '@/utils/productHelpers';
import type { Color } from '@/models/color';

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(() => getProductByColor('Black'));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color>(() => {
    const firstColor = product?.primaryColorList[0];
    return firstColor as Color || 'Black';
  });

  const updateProductColor = (color: Color) => {
    setProduct(getProductByColor(color));
    setSelectedImageIndex(0);
    setSelectedColor(color);
  }

  if (!product) return null;


  return (
    <main className="container mx-auto px-4 py-4 md:py-8" role="main" aria-label={`${product.title} product page`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-label="Product images">
          <ProductCarousel
            product={product}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />
        </section>

        <div className="flex flex-col gap-8 pb-24 lg:pb-0">
          <ProductDetails
            product={product}
            updateProductColor={updateProductColor}
            onImageSelect={setSelectedImageIndex}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
            selectedColor={selectedColor}
          />

          <div
            className="fixed bottom-0 left-0 right-0 bg-white p-4 pb-safe lg:static lg:p-0"
            role="complementary"
            aria-label="Add to bag section"
          >
            <AddToBagButton
              selectedSize={selectedSize}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
