import Config from "../config";

export class AdminRepository {
  web3 = null;
  contractInstance = null;
  account = null;
  gas = 4476768;

  constructor() {
    this.gas = Config.GAS_AMOUNT;
  }

  setWeb3(web3) {
    this.web3 = web3;
    this.contractInstance = new this.web3.eth.Contract(
      Config.ADMIN_ABI,
      Config.ADMIN_ADDRESS
    );
  }

  getWeb3() {
    return this.web3;
  }

  setAccount(account) {
    this.account = account;
  }

  async _checkAccountAvailable() {
    if (this.account === null) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      this.account = accounts[0];
    }
  }

  async findChickenHouse(storeName) {
    try {
      const result = await this.contractInstance.methods
        .findChickenHouse(storeName)
        .call();
      return result;
    } catch (e) {
      throw e;
    }
  }

  async findChickenHouseByIndex(index) {
    try {
      const result = await this.contractInstance.methods
        .findChickenHouseByIndex(index)
        .call();
      return result;
    } catch (e) {
      throw e;
    }
  }

  async registerChickenHouse(
    storeName,
    latitude,
    longitude,
    chickenNames,
    prices,
    sunsals
  ) {
    try {
      await this._checkAccountAvailable();
      console.log(
        storeName,
        latitude,
        longitude,
        chickenNames,
        prices,
        sunsals
      );
      await this.contractInstance.methods
        .registerChickenHouse(
          storeName,
          latitude,
          longitude,
          chickenNames,
          prices,
          sunsals
        )
        .send({ from: this.account, gas: this.gas })
        .on("transactionHash", function(hash) {
          return hash;
        })
        // .on('receipt', function(receipt){
        //     ...
        // })
        // .on('confirmation', function(confirmationNumber, receipt){
        //     ...
        // })
        .on("error", function(error, receipt) {
          throw error;
        });
    } catch (e) {
      throw e;
    }
  }

  async getStoreCount() {
    try {
      const result = await this.contractInstance.methods
        .getStoreCount() // 솔리디티 컨트랙트의 메소드 이름
        .call(); // Gas 소모가 없는 함수를 호출 하는 방식 vs send
      return result; // 2
    } catch (e) {
      throw e;
    }
  }

  getCurrentBlock() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBlockNumber((err, blocknumber) => {
        if (!err) resolve(blocknumber);
        reject(err);
      });
    });
  }

  async watchIfMatched(cb) {
    // const currentBlock = await this.getCurrentBlock();
    console.log("event1");
    this.contractInstance.events.matchFinish(
      {
        fromBlock: "latest",
        ToBlock: "latest"
      },
      cb
    );
  }

  // async watchIfCreated(cb) {
  //   const currentBlock = await this.getCurrentBlock();
  //   console.log("pass3");
  //   this.contractInstance.getPastEvents(
  //     "matchFinish",
  //     {
  //       fromBlock: currentBlock - 1,
  //       toBlock: "latest"
  //     },
  //     cb
  //   );
  // }

  async watchIfRegistered(cb) {
    this.contractInstance.events.registerStore(
      {
        fromBlock: "latest",
        ToBlock: "latest"
      },
      cb
    );
  }
}
