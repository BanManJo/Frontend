import Config from "../config";

export class OrderRoomRepository {
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
      Config.ORDER_ROOM_ABI,
      contract_address
    );
  }

  getWeb3() {
    return this.web3;
  }

  setAccount(account) {
    this.account = account;
  }

  get account() {
    if (this.account) {
      return this.account;
    } else {
      console.log("no account");
      return;
    }
  }

  async _checkAccountAvailable() {
    if (this.account === null) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      this.account = accounts[0];
    }
  }

  async getBalance() {
    return new Promise(async (resolve, reject) => {
      try {
        var result = await this.contractInstance.methods.getBalance().call();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  async matchRoom(roomIndex) {
    try {
      await this._checkAccountAvailable();
      let tx;
      await this.contractInstance.methods
        .matchRoom(roomIndex)
        .send({ from: this.account, gas: this.gas })
        .on("transactionHash", function(hash) {
          tx = hash;
        })
        .on("error", function(error, receipt) {
          throw error;
        });
      return tx;
    } catch (e) {
      throw e;
    }
  }

  // async orderReject(storeName, roomIndex) {
  //   try {
  //     await this._checkAccountAvailable();
  //     await this.contractInstance.methods
  //       .orderReject(storeName, roomIndex)
  //       .send({ from: this.account, gas: this.gas })
  //       .on("transactionHash", function(hash) {
  //         return hash;
  //       })
  //       .on("error", function(error, receipt) {
  //         throw error;
  //       });
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async getRoomInfo() {
    try {
      const result = await this.contractInstance.methods.getRoomInfo().call();
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getStateRoom() {
    try {
      const result = await this.contractInstance.methods.getStateRoom().call();
      return result;
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

  // userMyPage 1명의 취소 환불
  async refundToAUser() {
    try {
      await this._checkAccountAvailable();
      await this.contractInstance.methods
        .refundToAUser()
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
}
