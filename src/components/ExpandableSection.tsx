'use client';

import { useState } from 'react';

interface ExpandableSectionProps {
    title: string;
    children: React.ReactNode;
}

export function ExpandableSection({ title, children }: ExpandableSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="border-b border-gray-200">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex justify-between items-center py-4 text-left"
                aria-expanded={isExpanded}
            >
                <h3 className="text-xl font-medium text-gray-800">{title}</h3>

                <svg
                    className={`w-6 h-6 transform transition-transform duration-200 text-gray-700 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                aria-hidden={!isExpanded}
            >
                <div className="pb-4">
                    {children}
                </div>
            </div>
        </section>
    );
} 