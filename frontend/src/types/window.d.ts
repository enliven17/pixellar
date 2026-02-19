declare global {
    interface Window {
        freighter?: {
            getPublicKey: () => Promise<string>;
            signTransaction: (xdr: string, options: { networkPassphrase: string }) => Promise<string>;
        };
        starknet?: {
            enable: () => Promise<void>;
            selectedAddress: string;
            account: {
                execute: (calls: any[]) => Promise<{ transaction_hash: string }>;
            };
        };
    }
}

export {};
