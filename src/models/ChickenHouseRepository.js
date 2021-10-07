import Config from "../config";

export class ChickenHouseRepository {
  web3 = null;
  contractInstance = null;
  account = null;
  gas = 4476768;

  constructor() {
    this.gas = Config.GAS_AMOUNT;
  }

  setWeb3(web3, contract_address) {
    this.web3 = web3;
    this.contractInstance = new this.web3.eth.Contract(
      Config.CHICKEN_HOUSE_ABI,
      contract_address
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

  async findOrderRoom(roomIndex) {
    try {
      const result = await this.contractInstance.methods
        .findOrderRoom(roomIndex)
        .call();
      return result;
    } catch (e) {
      throw e;
    }
  }

  async createRoom(storeName, price, finishTime, chicken) {
    try {
      await this._checkAccountAvailable();
      const tx = await this.contractInstance.methods
        .createRoom(storeName, chicken, price, finishTime)
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

  async getChickenHouse() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractInstance.methods
          .getChickenHouse()
          .call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  async getStoreMenu() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractInstance.methods
          .getStoreMenu()
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

  async getRoomsCount() {
    try {
      const result = await this.contractInstance.methods.getRoomsCount().call();
      return result;
    } catch (e) {
      throw e;
    }
  }

  async watchIfCreated(cb) {
    console.log("event1");
    this.contractInstance.events.roomCreated(
      {
        fromBlock: "latest",
        ToBlock: "latest"
      },
      cb
    );
  }

  getCurrentBlock() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBlockNumber((err, blocknumber) => {
        if (!err) resolve(blocknumber);
        reject(err);
      });
    });
  }
}
