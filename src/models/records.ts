import type { Color } from '@/models/color';

export const colorData: Record<Color, {
    hex: string;
    name: string;
    code: string;
    basicColor: string;
}> = {
    'Black': {
        hex: '#000000',
        name: 'Black',
        code: 'black',
        basicColor: 'Black'
    },
    'French Navy': {
        hex: '#1B365D',
        name: 'French Navy',
        code: 'blue',
        basicColor: 'Blue'
    },
    'Kumquat': {
        hex: '#FF9D4D',
        name: 'Kumquat',
        code: 'red',
        basicColor: 'Red'
    },
    'Lavender Haze': {
        hex: '#E6E6FA',
        name: 'Lavender Haze',
        code: 'purple',
        basicColor: 'Purple'
    },
    'Sea Salt': {
        hex: '#F5F5F5',
        name: 'Sea Salt',
        code: 'white',
        basicColor: 'White'
    }
};

