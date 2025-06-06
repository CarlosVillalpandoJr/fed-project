'use client';

import { ProductCarousel } from '@/components/ProductCarousel';
import { ProductDetails } from '@/components/ProductDetails';
import { AddToBagButton } from '@/components/AddToBagButton';
import { Product } from '@/models/product';
import { useState } from 'react';
import { getProductByColor } from '@/utils/productHelpers';
import type { Color } from '@/models/color';
import Head from 'next/head';

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

  const price = Object.values(product.priceList)[0]?.rate;
  const currency = Object.values(product.priceList)[0]?.currency;

  return (
    <>
      <Head>
        <title>{product.title} | PACT</title>
        <meta name="description" content={product.marketingRomance} />
        <meta name="keywords" content={`${product.category}, ${product.primaryColorList.join(', ')}`} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.marketingRomance} />
        <meta property="og:type" content="product" />
        <meta property="og:price:currency" content={currency} />
        <meta property="product:price:amount" content={price.toString()} />
        <meta property="product:price:currency" content={currency} />
        <meta property="product:category" content={product.category} />
        <meta property="product:color" content={product.primaryColorList.join(', ')} />
      </Head>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductCarousel
            product={product}
            selectedImageIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />

          <div className="flex flex-col gap-8 pb-24 lg:pb-0">
            <ProductDetails
              product={product}
              updateProductColor={updateProductColor}
              onImageSelect={setSelectedImageIndex}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 lg:static lg:p-0">
              <AddToBagButton
                selectedSize={selectedSize}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
