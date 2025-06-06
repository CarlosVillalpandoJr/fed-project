'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import styles from './ProductCarousel.module.css';
import { useCallback, useEffect } from 'react';
import { ProductCarouselProps } from "@/models/interfaces";

export function ProductCarousel({
    product,
    selectedImageIndex,
    onImageSelect
}: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        containScroll: 'keepSnaps',
        slidesToScroll: 1,
        dragFree: false,
        align: 'center',
        breakpoints: {
            '(min-width: 1024px)': {
                slidesToScroll: 1,
                dragFree: false,
                align: 'center'
            },
            '(max-width: 1023px)': {
                slidesToScroll: 2,
                dragFree: true,
                align: 'start'
            }
        }
    });

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) {
            emblaApi.scrollTo(index);
            onImageSelect(index);
        }
    }, [emblaApi, onImageSelect]);

    // Sync with external selectedImageIndex
    useEffect(() => {
        if (emblaApi && selectedImageIndex !== undefined) {
            emblaApi.scrollTo(selectedImageIndex);
        }
    }, [emblaApi, selectedImageIndex]);

    // Update selected index when carousel moves
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            onImageSelect(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onImageSelect]);

    const thumbnailImages = product.imageList
        .filter(image => image.isThumbnail)
        .slice(0, 6);

    const heroImages = product.imageList
        .filter(image => !image.isThumbnail && !image.isSwatch && image.mimeType !== 'video/mp4')
        .slice(0, -2);


    return (
        <div className="lg:flex lg:gap-5" role="region" aria-label="Product images">
            <div className="hidden lg:flex flex-col gap-2" role="tablist" aria-label="Product thumbnails">
                {thumbnailImages.map((image, index) => (
                    <button
                        key={image.name}
                        onClick={() => scrollTo(index)}
                        className={`w-[60px] h-[60px] rounded-md overflow-hidden border-2 transition-all ${selectedImageIndex === index ? 'border-black' : 'border-transparent'
                            }`}
                        role="tab"
                        aria-selected={selectedImageIndex === index}
                        aria-label={`View ${product.title} image ${index + 1}`}
                        tabIndex={selectedImageIndex === index ? 0 : -1}
                    >
                        <Image
                            src={image.url}
                            alt={`${product.title} thumbnail ${index + 1}`}
                            width={60}
                            height={60}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            <div className="lg:w-[500px] relative">
                <div
                    className={`${styles.embla} h-full`}
                    ref={emblaRef}
                    role="tabpanel"
                    aria-label={`${product.title} image ${selectedImageIndex + 1} of ${heroImages.length}`}
                >
                    <div className={styles.embla__container}>
                        {heroImages.map((image, index) => (
                            <div
                                key={image.name}
                                className={styles.embla__slide}
                                role="tabpanel"
                                aria-hidden={selectedImageIndex !== index}
                            >
                                <Image
                                    src={image.url}
                                    alt={`${product.title} - ${index === selectedImageIndex ? 'Current view' : 'Additional view'}`}
                                    width={1024}
                                    height={1024}
                                    className="w-full h-full object-contain"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 