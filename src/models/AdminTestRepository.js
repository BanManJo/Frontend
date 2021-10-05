import Config from "../config";

export class AdminTestRepository {
  web3 = null;
  contractInstance = null;
  account = "";
  gas = 4476768;

  constructor() {
    this.gas = Config.GAS_AMOUNT;
  }

  setWeb3(web3) {
    this.web3 = web3;
    this.contractInstance = new this.web3.eth.Contract(
      Config.ADMIN_TEST_ABI,
      Config.ADMIN_TEST_ADDRESS
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

  async getBalanceOfRomm(storeName, roomNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        var result = await this.contractInstance.methods
          .getBalanceOfRomm(storeName, roomNumber)
          .call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
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

  async createRoom(storeName, price, finishTime, chicken) {
    try {
      await this._checkAccountAvailable();
      const tx = await this.contractInstance.methods
        .createRoom(storeName, price, finishTime, chicken)
        .send({ from: this.account, gas: this.gas })
        .on("transactionHash", function(hash) {
          // return hash;
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
      return tx;
    } catch (e) {
      throw e;
    }
  }

  async matchRoom(storeName, roomIndex) {
    try {
      console.log("pass1");
      await this._checkAccountAvailable();
      let tx;
      await this.contractInstance.methods
        .matchRoom(storeName, roomIndex)
        .send({ from: this.account, gas: this.gas })
        .on("transactionHash", function(hash) {
          tx = hash;
          console.log("pass2");
        })
        .on("error", function(error, receipt) {
          throw error;
        });
      return tx;
    } catch (e) {
      throw e;
    }
  }

  async approveOrder(storeName, roomIndex) {
    try {
      await this._checkAccountAvailable();

      await this.contractInstance.methods
        .approveOrder(storeName, roomIndex)
        .send({ from: this.account, gas: this.gas })
        .on("transactionHash", function(hash) {
          return hash;
        })
        .on("error", function(error, receipt) {
          throw error;
        });
    } catch (e) {
      throw e;
    }
  }

  async orderReject(storeName, roomIndex) {
    try {
      await this._checkAccountAvailable();
      await this.contractInstance.methods
        .orderReject(storeName, roomIndex)
        .send({ from: this.account, gas: this.gas })
        .on("transactionHash", function(hash) {
          return hash;
        })
        .on("error", function(error, receipt) {
          throw error;
        });
    } catch (e) {
      throw e;
    }
  }

  async getChickenHouse(storeName) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractInstance.methods
          .getChickenHouse(storeName)
          .call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  async getChickenHouseByIndex(idx) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractInstance.methods
          .getChickenHouse2(idx)
          .call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
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

  async getStoreMenu(storeName) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractInstance.methods
          .getStoreMenu(storeName)
          .call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  async changeOnOff(storeName) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    console.log("changeOnOff");
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.methods.changeOnOff(storeName).send(
          { from: accounts[0], gas: 4476768 },

          (err, transaction) => {
            if (!err) resolve(transaction);
            reject(err);
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  async getRoomInfo(storeName, roomIdx) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractInstance.methods
          .getRoomInfo(storeName, roomIdx)
          .call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  // async getStoreMenu(storeName, price) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await this.contractInstance.methods
  //         .getStoreMenu(storeName, price)
  //         .call();
  //       resolve(result);
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }

  async getRoomsCount(storeName) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractInstance.methods
          .getRoomsCount(storeName)
          .call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
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
    this.contractInstance.events.matchFinish({
      fromBlock: "latest",
      ToBlock: "latest"
    });
  }
  // 대영 실험
  async watchIfCreated(cb) {
    const currentBlock = await this.getCurrentBlock();
    const eventWatcher = await this.contractInstance.events.RoomCreated(
      { fromBlock: currentBlock - 1, toBlock: "latest" },
      cb
    );
    return true;
  }

  async watchIfCreated2(cb) {
    this.contractInstance.getPastEvents(
      "userPage",
      {
        fromBlock: 0,
        toBlock: "latest"
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
}
