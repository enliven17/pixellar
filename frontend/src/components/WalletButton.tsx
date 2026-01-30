'use client';

import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

export default function WalletButton() {
    const account = useCurrentAccount();

    return (
        <ConnectButton
            connectText={account ? `${account.address.slice(0, 4)}...${account.address.slice(-4)}` : "Connect"}
            className="!bg-blue-600 !hover:bg-blue-700 !text-white !px-3 !py-1.5 !rounded-md !text-xs !font-medium !transition-colors"
        />
    );
}
