'use client';

import { useState } from 'react';
import { AddToBagButtonProps } from "@/models/interfaces";

export function AddToBagButton({ selectedSize }: AddToBagButtonProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 5000);
    };

    return (
        <button
            onClick={handleClick}
            disabled={!selectedSize}
            className={`w-full py-4 rounded-md text-white font-semibold transition-colors ${!selectedSize
                ? 'bg-gray-300 cursor-not-allowed'
                : isAdded
                    ? 'bg-green-600'
                    : 'bg-black hover:bg-gray-800'
                }`}
        >
            {!selectedSize
                ? 'Select a Size'
                : isAdded
                    ? 'Added to Bag'
                    : 'Add to Bag'}
        </button>
    );
} 