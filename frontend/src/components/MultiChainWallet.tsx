'use client';

import { useState, useEffect } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { useCanvasStore } from '@/lib/store';
import { BlockchainType } from '@/lib/constants';
import { StellarWalletsKit, WalletNetwork, ISupportedWallet, XBULL_ID } from '@creit.tech/stellar-wallets-kit';

export default function MultiChainWallet() {
    const [stellarKit, setStellarKit] = useState<StellarWalletsKit | null>(null);
    const [stellarAddress, setStellarAddress] = useState<string | null>(null);
    const [starknetAddress, setStarknetAddress] = useState<string | null>(null);
    const suiAccount = useCurrentAccount();
    const { selectedBlockchain, setSelectedBlockchain, setWalletAddress } = useCanvasStore();

    // Initialize Stellar Wallets Kit
    useEffect(() => {
        const kit = new StellarWalletsKit({
            network: WalletNetwork.TESTNET,
            selectedWalletId: XBULL_ID,
            modules: []
        });
        setStellarKit(kit);
    }, []);

    // Update Sui wallet in store
    useEffect(() => {
        setWalletAddress('sui', suiAccount?.address || null);
    }, [suiAccount, setWalletAddress]);

    // Connect Stellar wallet
    const connectStellar = async () => {
        if (!stellarKit) return;
        
        try {
            await stellarKit.openModal({
                onWalletSelected: async (option: ISupportedWallet) => {
                    stellarKit.setWallet(option.id);
                    const publicKey = await stellarKit.getPublicKey();
                    setStellarAddress(publicKey);
                    setWalletAddress('stellar', publicKey);
                    setSelectedBlockchain('stellar');
                }
            });
        } catch (error) {
            console.error('Failed to connect Stellar wallet:', error);
        }
    };

    // Connect Starknet wallet
    const connectStarknet = async () => {
        try {
            if (!window.starknet) {
                alert('Please install ArgentX or Braavos wallet extension for Starknet');
                window.open('https://www.argent.xyz/argent-x/', '_blank');
                return;
            }

            await window.starknet.enable();
            const address = window.starknet.selectedAddress;
            setStarknetAddress(address);
            setWalletAddress('starknet', address);
            setSelectedBlockchain('starknet');
        } catch (error) {
            console.error('Failed to connect Starknet wallet:', error);
            alert('Failed to connect Starknet wallet. Please try again.');
        }
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const getChainIcon = (chain: BlockchainType) => {
        switch (chain) {
            case 'sui': return '🔵';
            case 'stellar': return '⭐';
            case 'starknet': return '🟠';
        }
    };

    return (
        <div className="space-y-4">
            {/* Blockchain Selection */}
            <div className="grid grid-cols-3 gap-3">
                <button
                    onClick={() => setSelectedBlockchain('sui')}
                    className={`relative p-4 rounded-xl transition-all duration-200 ${
                        selectedBlockchain === 'sui'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                    <div className="text-2xl mb-1">{getChainIcon('sui')}</div>
                    <div className="text-xs font-medium">Sui</div>
                    {selectedBlockchain === 'sui' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                </button>

                <button
                    onClick={() => setSelectedBlockchain('stellar')}
                    className={`relative p-4 rounded-xl transition-all duration-200 ${
                        selectedBlockchain === 'stellar'
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                    <div className="text-2xl mb-1">{getChainIcon('stellar')}</div>
                    <div className="text-xs font-medium">Stellar</div>
                    {selectedBlockchain === 'stellar' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                </button>

                <button
                    onClick={() => setSelectedBlockchain('starknet')}
                    className={`relative p-4 rounded-xl transition-all duration-200 ${
                        selectedBlockchain === 'starknet'
                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/50 scale-105'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                    <div className="text-2xl mb-1">{getChainIcon('starknet')}</div>
                    <div className="text-xs font-medium">Starknet</div>
                    {selectedBlockchain === 'starknet' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                </button>
            </div>

            {/* Wallet Connection */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                {selectedBlockchain === 'sui' && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Sui Wallet</span>
                            {suiAccount && (
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    Connected
                                </span>
                            )}
                        </div>
                        <ConnectButton
                            connectText={suiAccount ? formatAddress(suiAccount.address) : "Connect Sui Wallet"}
                            className="!w-full !bg-blue-600 !hover:bg-blue-700 !text-white !px-4 !py-3 !rounded-lg !text-sm !font-medium !transition-all !shadow-lg !shadow-blue-500/20"
                        />
                    </div>
                )}

                {selectedBlockchain === 'stellar' && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Stellar Wallet</span>
                            {stellarAddress && (
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    Connected
                                </span>
                            )}
                        </div>
                        {stellarAddress ? (
                            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg px-4 py-3 text-sm text-purple-300 font-mono">
                                {formatAddress(stellarAddress)}
                            </div>
                        ) : (
                            <button
                                onClick={connectStellar}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
                            >
                                Connect Stellar Wallet
                            </button>
                        )}
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Supports Freighter, xBull, Albedo & more
                        </p>
                    </div>
                )}

                {selectedBlockchain === 'starknet' && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Starknet Wallet</span>
                            {starknetAddress && (
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    Connected
                                </span>
                            )}
                        </div>
                        {starknetAddress ? (
                            <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg px-4 py-3 text-sm text-orange-300 font-mono">
                                {formatAddress(starknetAddress)}
                            </div>
                        ) : (
                            <button
                                onClick={connectStarknet}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all shadow-lg shadow-orange-500/20"
                            >
                                Connect Starknet Wallet
                            </button>
                        )}
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Supports ArgentX & Braavos
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
