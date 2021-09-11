let AuctionRepository = require('./contracts/AuctionRepository');

module.exports = {
    JSONRPC_ENDPOINT: 'http://52.59.238.144:8545',
    JSONRPC_WS_ENDPOINT: 'ws://52.59.238.144:8546',
    BZZ_ENDPOINT: 'http://52.59.238.144:8500',
    SHH_ENDPOINT: 'ws://52.59.238.144:8546',

    AUCTIONREPOSITORY_ADDRESS: '0x1E26392Ac8146C5194Dcc7c652713dE1efE299ca',
    AUCTIONREPOSITORY_ABI: AuctionRepository.abi,

    GAS_AMOUNT: 500000,
};
