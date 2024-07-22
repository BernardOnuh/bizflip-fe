// Update NETWORK_LABEL to use chain IDs directly
export const NETWORK_LABEL = {
  1: 'Ethereum',              // Mainnet
  4: 'Rinkeby',               // Rinkeby
  3: 'Ropsten',               // Ropsten
  5: 'Görli',                 // Görli
  42: 'Kovan',                // Kovan
  250: 'Fantom',              // Fantom
  4002: 'Fantom Testnet',     // Fantom Testnet
  137: 'Matic',               // Matic (Polygon)
  80001: 'Matic Testnet',     // Matic Testnet (Polygon Mumbai)
  100: 'xDai',                // xDai
  56: 'BSC',                  // Binance Smart Chain
  97: 'BSC Testnet',          // BSC Testnet
  1287: 'Moonbase',           // Moonbase Alpha
  43114: 'Avalanche',         // Avalanche
  43113: 'Fuji',              // Fuji Testnet
  128: 'HECO',                // HECO
  256: 'HECO Testnet',        // HECO Testnet
  1666600000: 'Harmony',      // Harmony
  1666700000: 'Harmony Testnet', // Harmony Testnet
};

// Update Contracts to use chain IDs directly
export const Contracts = {
  1: {
    auction: '0x951Cc69504d39b3eDb155CA99f555E47E044c2F1',
    sales: '0xa06aecbb8CD9328667f8E05f288e5b3ac1CFf852',
    bundleSales: '0x56aD389A02Ea9d63f13106cB0c161342f537a92e',
    factory: '0xCC7A2eC7A8A0564518fD3D2ca0Df8B2137626144', // FantomNFTFactory
    privateFactory: '0xa4fDb09e1796730bfBA8a352074F0dd65D400Dd4', // FantomNFTFactoryPrivate
    artFactory: '0x520DaB621f93F59d3557174280AB1B6d4FB8c956', // FantomArtFactory
    privateArtFactory: '0x736Eae40AdFf88570b92378c97a0D11b44E1C953', // FantomArtFactoryPrivate
  },
  250: {
    auction: '0x951Cc69504d39b3eDb155CA99f555E47E044c2F1',
    sales: '0xa06aecbb8CD9328667f8E05f288e5b3ac1CFf852',
    bundleSales: '0x56aD389A02Ea9d63f13106cB0c161342f537a92e',
    factory: '0xCC7A2eC7A8A0564518fD3D2ca0Df8B2137626144', // FantomNFTFactory
    privateFactory: '0xa4fDb09e1796730bfBA8a352074F0dd65D400Dd4', // FantomNFTFactoryPrivate
    artFactory: '0x520DaB621f93F59d3557174280AB1B6d4FB8c956', // FantomArtFactory
    privateArtFactory: '0x736Eae40AdFf88570b92378c97a0D11b44E1C953', // FantomArtFactoryPrivate
  },
  4002: {
    auction: '0x7A51141d170f6a4c867BF2730Dac8F6676a79047',
    sales: '0x7Ec2428701828E27B88BF082b8549e5DA3FEDccB',
    bundleSales: '0xCe5865b9356c8123b75D02362a231B4647DbcF8c',
    factory: '0xd93bffC05Ce31F1E265C7BE40b6DcD565Fe14BC0', // FantomNFTFactory
    privateFactory: '0x8FE06F27A7C615499dFe5834EA70A528C18c6A88', // FantomNFTFactoryPrivate
    artFactory: '0xA07914BB700940C8A48769AF6278a525d5353F67', // FantomArtFactory
    privateArtFactory: '0x10Bb5fF44BBfc9C2c178387FBE12a4Fc5c6afB84', // FantomArtFactoryPrivate
  },
  3: {
    auction: '0x585AB52A706eBB59af175B04A89fa08DF8c28AAF',
    sales: '0xAeaF69A78e884c2dC729D43b21CcD7092300BC92',
    bundleSales: '0xAA6c1c18C8f661Ee1F872690B0f1ABc799c9B3F1',
    factory: '0x2B38A21b4fE0E3dc1b12a2C7d5A5239310eF1740',
    privateFactory: '0x64075AF3EFf610ad9a2A02B713e7fA79E5476e5C',
    artFactory: '0x33d7C9209E4dd7a2c4669d782F9BcB123301D444',
    privateArtFactory: '0x409f01347583e86658F3e4C514263D2aE7875FB9',
  },
  5: {
    auction: '0x904C6BbB53955af2967D39a382Ff96bb54CeeB21',
    sales: '0x1Ec1bFEa8746b2b2cfdFf2D08AcFfe9B4ae4cf0f',
    bundleSales: '0xd5aF48CA421b7230b2161401F0eCa6c040297250',
    factory: '0x65e13c989972EeF8E46b6A67962ad70F9233E26B',
    privateFactory: '0x757ff5Cb4249f3f8F1b6B2B406F188e44df81f04',
    artFactory: '0x6A3EC9Bd44fEE82F2636EB9473063430C43f1226',
    privateArtFactory: '0xe9D3b1eCE278F4A405C5EbcA147883A6C0421360',
  },
};
