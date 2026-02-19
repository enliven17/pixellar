// Canvas Configuration
export const CANVAS_WIDTH = 50;
export const CANVAS_HEIGHT = 50;
export const PIXEL_SIZE = 2; // Display size of each pixel
export const COOLDOWN_MS = 10000; // 10 seconds

// Pixellar 16-color palette (Global colors with transparency)
export const COLORS = [
    '#FFFFFF', // 0 - White
    'rgba(200, 200, 200, 0.8)', // 1 - Light Gray (80% opacity)
    'rgba(255, 200, 200, 0.8)', // 2 - Light Pink (80% opacity)
    'rgba(255, 100, 100, 0.85)', // 3 - Red (85% opacity)
    'rgba(255, 150, 0, 0.85)', // 4 - Orange (85% opacity)
    'rgba(255, 220, 0, 0.8)', // 5 - Yellow (80% opacity)
    'rgba(100, 200, 100, 0.85)', // 6 - Light Green (85% opacity)
    'rgba(0, 180, 0, 0.9)', // 7 - Green (90% opacity)
    'rgba(100, 200, 255, 0.8)', // 8 - Light Blue (80% opacity)
    'rgba(0, 150, 255, 0.85)', // 9 - Blue (85% opacity)
    'rgba(100, 100, 255, 0.85)', // 10 - Dark Blue (85% opacity)
    'rgba(200, 100, 255, 0.85)', // 11 - Purple (85% opacity)
    'rgba(255, 100, 200, 0.85)', // 12 - Magenta (85% opacity)
    '#8B4513', // 13 - Brown
    '#404040', // 14 - Dark Gray
    '#000000', // 15 - Black
] as const;

export type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

// Sui Configuration
export const SUI_NETWORK = 'testnet' as const;
export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
export const CANVAS_OBJECT_ID = process.env.NEXT_PUBLIC_CANVAS_OBJECT_ID || '';

// Stellar Configuration
export const STELLAR_NETWORK = 'testnet' as const;
export const STELLAR_GAME_HUB_CONTRACT = 'CB4VZAT2U3UC6XFK3N23SKRF2NDCMP3QHJYMCHHFMZO7MRQO6DQ2EMYG';
export const STELLAR_CANVAS_CONTRACT = process.env.NEXT_PUBLIC_STELLAR_CONTRACT_ID || '';
export const STELLAR_HORIZON_URL = 'https://horizon-testnet.stellar.org';

// Starknet Configuration
export const STARKNET_NETWORK = 'sepolia' as const;
export const STARKNET_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_STARKNET_CONTRACT_ADDRESS || '';

// Blockchain types
export type BlockchainType = 'sui' | 'stellar' | 'starknet';
