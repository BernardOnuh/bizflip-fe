import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const CustomWallet = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button className="connect-button" onClick={openConnectModal} type="button">
                                        Connect Wallet
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button className="connect-button" onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <div className="wallet-container">
                                    <button
                                        className="chain-button"
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </button>
                                    <button className="account-button" onClick={openAccountModal} type="button">
                                        {account.displayName}
                                        <span className="account-balance">
                                            {account.displayBalance
                                                ? ` (${account.displayBalance})`
                                                : ''}
                                        </span>
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default CustomWallet;
