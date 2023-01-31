import { Request } from 'crawlee';
import { BASE_URL, COUNTRIES, Labels } from './constants.js';
import { getMockStartUrls } from './debug.js';

export const getStartUrls = (useMockStartRequests: boolean | undefined): Request[] => {
    if (useMockStartRequests) return getMockStartUrls();

    return getProductionStartUrls();
};

export const getProductionStartUrls = (): Request[] => {
    return COUNTRIES.map((country) => {
        return new Request({
            url: `${BASE_URL}/${country.code}/apis/navigation/v1/nav-data.json`,
            userData: {
                label: Labels.NAVIGATION,
                country,
            },
        });
    });
};

export const isCodeEnglish = (code: string): boolean => code.startsWith('en_');

export const getMainImageFromMiniature = (imageUrl: string) => {
    const fullImage = imageUrl.replace('miniature', 'main');
    return `https:${fullImage}`;
};

export const getBaseProductId = (productUrl: string) => {
    const productId = productUrl.split('productpage.')[1].split('.html')[0];
    return productId.slice(0, productId.length - 3);
};
