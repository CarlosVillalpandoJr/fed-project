'use client';

import { Product } from '@/types/product';
import Image from 'next/image';

const productData = require('../../data/product.json');

export default function Home() {
  const product = productData.data[0] as Product;
  console.log('product: ', product)

  const fullSizeImages = product.imageList.filter(image => !image.isThumbnail);
  const thumbnailImages = product.imageList.filter(image => image.isThumbnail);

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <div>
        {fullSizeImages.map((image) => (
          <Image
            src={image.url}
            alt={product.title}
            width={500}
            height={500}
          />
        ))}
      </div>
    </main>
  );
}
