import { ExpandableSection } from "./ExpandableSection";
import type { Color } from "@/models/color";
import { ProductDetailsProps } from "@/models/interfaces";
import { colorData } from "@/models/records";

export function ProductDetails({
    product,
    updateProductColor,
    onImageSelect,
    selectedSize,
    onSizeSelect,
    selectedColor,
    onColorSelect
}: ProductDetailsProps) {
    const [{ rate: price, currency }] = Object.values(product.priceList);

    const displayColor = Object.entries(colorData).find(([_, data]) =>
        data.basicColor === product.primaryColorList[0]
    )?.[1].name || product.primaryColorList[0];

    const handleColorSelect = (color: Color) => {
        onColorSelect(color);
        updateProductColor(color);
        onImageSelect(0);
    };

    return (
        <div className="flex flex-col gap-4" role="complementary" aria-label="Product details">
            <div className="text-sm text-gray-600" aria-label="Product category">
                {product.category}
            </div>

            <h1 className="text-xl font-semibold">{product.title}</h1>

            <p className="text-xl font-semibold" aria-label={`Price: ${currency} ${price}`}>
                {currency} {price}
            </p>

            <p className="text-sm text-gray-600" aria-label={`Available colors: ${displayColor}`}>
                {displayColor}
            </p>

            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold" id="color-selector">Color</h2>

                <div className="flex gap-2" role="radiogroup" aria-labelledby="color-selector">
                    {Object.entries(colorData).map(([color, { hex, name }]) => (
                        <button
                            key={color}
                            onClick={() => handleColorSelect(color as Color)}
                            className={`w-8 h-8 rounded-md border transition-colors ${selectedColor === color
                                ? 'border-black ring-2 ring-black ring-offset-2'
                                : 'border-gray-300 hover:border-gray-900'
                                }`}
                            style={{ backgroundColor: hex }}
                            role="radio"
                            aria-checked={selectedColor === color}
                            aria-label={`Select ${name} color`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold" id="size-selector">Size</h2>

                <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="size-selector">
                    {product.sizeRangeList
                        .filter(size => size !== 'XX')
                        .map((size) => (
                            <button
                                key={size}
                                onClick={() => onSizeSelect(size)}
                                className={`px-4 py-2 border rounded-md transition-colors ${selectedSize === size
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                                    }`}
                                role="radio"
                                aria-checked={selectedSize === size}
                                aria-label={`Select size ${size}`}
                            >
                                {size}
                            </button>
                        ))}
                </div>
            </div>

            <ExpandableSection title="Why You'll Love It">
                <p className="text-sm text-gray-700">{product.marketingRomance}</p>
            </ExpandableSection>

            <ExpandableSection title="The Fit">
                <p className="text-sm text-gray-700">{product.sizeDetailList[0]}</p>
                <p className="text-sm text-gray-700">{product.sizeDetailList[1]}</p>
            </ExpandableSection>

            <ExpandableSection title="Wear & Care">
                <p className="text-sm text-gray-700 mb-4">{product.fabricContentDetailList[0]}</p>
                <p className="text-sm text-gray-700 mb-4">{product.washingInstructions}</p>
                <p className="text-sm text-gray-700 mb-4">{product.descriptionList[4]}</p>
            </ExpandableSection>
        </div>
    );
}