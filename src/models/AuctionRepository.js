import Config from '../config';

export class AuctionRepository {

    web3 = null;
    contractInstance = null;
    account = '';
    gas = 4476768;

    constructor(){
        this.gas = Config.GAS_AMOUNT;
    }

    setWeb3(web3) {
        this.web3 = web3;
        this.contractInstance = new this.web3.eth.Contract(Config.AUCTIONREPOSITORY_ABI, Config.AUCTIONREPOSITORY_ADDRESS);
    }

    getWeb3() {
        console.dir(this.web3);
        return this.web3;
    }

    setAccount(account){
        this.account = account;
    }

    getCurrentBlock() {
        return new Promise((resolve, reject ) => {
            this.web3.eth.getBlockNumber((err, blocknumber) => {
                if(!err) resolve(blocknumber);
                reject(err);
            });
        });
    }

    async watchIfCreated(cb) {
        const currentBlock = await this.getCurrentBlock();
        const eventWatcher = this.contractInstance.events.AuctionCreated({fromBlock: currentBlock - 1}, cb);
    }

    async watchIfBidSuccess(cb) {
        const currentBlock = await this.getCurrentBlock();
        const eventWatcher = this.contractInstance.events.BidSuccess({fromBlock: currentBlock - 1, toBlock: 'latest'}, cb);
    }

    async watchIfCanceled(cb) {
        const currentBlock = await this.getCurrentBlock();
        const eventWatcher = this.contractInstance.events.AuctionCanceled({fromBlock: currentBlock - 1}, cb);
    }

    async watchIfFinalized(cb) {
        const currentBlock = await this.getCurrentBlock();
        const eventWatcher = this.contractInstance.events.AuctionFinalized({fromBlock: currentBlock - 1}, cb);
    }

    getCurrentBid(auctionId) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = this.contractInstance.methods.getCurrentBid(auctionId).call();
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });
    }

    async getBidCount(auctionId) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        return new Promise(async (resolve, reject) => {
            try {
                var result = await this.contractInstance.methods.getBidsCount(auctionId).call();
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });
    }

    async getCount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        return new Promise(async (resolve, reject) => {
            try {
                var result = await this.contractInstance.methods.getCount().call();
                resolve(result);
            } catch(e) {
                reject(e);
            }
        });
    }

    async bid(auctionId, price) {
        let bidAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.methods
                            .bidOnAuction(auctionId)
                            .send({from: bidAccounts[0], gas: 4476768, value: this.web3.utils.toWei(price, 'ether')}, (err, transaction) => {
                            if(!err) resolve(transaction);
                            reject(err);
                            // console.log(err);
                         });
            } catch(e) {
                reject(e);
            }
        });
    }

    async create(deedId, auctionTitle, metadata, startingPrice, blockDeadline) {
        let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.methods
                                .createAuction(Config.DEEDREPOSITORY_ADDRESS, deedId, auctionTitle, metadata, this.web3.utils.toWei(startingPrice, 'ether'), blockDeadline)
                                .send({ from: accounts[0], gas: 4476768 }, (err, transaction) => {
                                    if(!err) resolve(transaction);
                                    reject(err);
                                });
            } catch(e) {
                reject(e);
            }
        });
    }

    async cancel(auctionId) {
        let bidAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.methods
                            .cancelAuction(auctionId)
                            .send({ from: bidAccounts[0], gas: 4476768 }, (err, transaction) => {
                    if(!err) resolve(transaction);
                    reject(err);
                });
            } catch(e) {
                reject(e);
            }
        });
    }

    async finalize(auctionId) {
        let bidAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.methods
                            .finalizeAuction(auctionId)
                            .send({ from: bidAccounts[0], gas: 4476768 }, (err, transaction) => {
                    if(!err) resolve(transaction);
                    reject(err);
                });
            } catch(e) {
                reject(e);
            }
        });
    }

    async findById(auctionId) {
        let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        return new Promise(async (resolve, reject) => {
            try {
                this.contractInstance.methods
                            .getAuctionById(auctionId)
                            .call({ from: accounts[0], gas: 4476768 }, (err, transaction) => {
                    if(!err) resolve(transaction);
                    reject(err);
                });
            } catch(e) {
                reject(e);
            }
        });
    }
}
