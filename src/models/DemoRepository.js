import Config from "../config";
import * as events from "events";

export class DemoRepository {
  web3 = null;
  contractInstance = null;
  account = "";
  gas = 54476768;

  constructor() {
    this.gas = Config.GAS_AMOUNT;
  }

  // async _checkAccountAvailable() {
  //   if (this.account === null) {
  //     const accouts = await window.ethereum.request({
  //       method: "eth_requestAccounts"
  //     });
  //     this.account = accouts[0];
  //   }
  // }

  setWeb3(web3) {
    this.web3 = web3;
    this.contractInstance = new this.web3.eth.Contract(
      Config.DEMO_ABI,
      Config.DEMO_ADDRESS
    );
  }

  getWeb3() {
    return this.web3;
  }

  setAccount(account) {
    this.account = account;
  }

  async getCount() {
    // await window.ethereum.request({ method: "eth_requestAccounts" });
    return new Promise(async (resolve, reject) => {
      try {
        var result = await this.contractInstance.methods.getRoomCounts().call();
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

  // Create Room Event
  async watchIfCreated(cb) {
    const currentBlock = await this.getCurrentBlock();
    const eventWatcher = await this.contractInstance.events.RoomCreated(
      { fromBlock: currentBlock - 1, toBlock: "latest" },
      cb
    );
    return true;
  }

  async watchIfCreated2(cb) {
    const currentBlock = await this.getCurrentBlock();
    this.contractInstance.getPastEvents(
      "RoomCreated",
      {
        fromBlock: currentBlock - 1,
        toBlock: "latest"
      },
      cb
    );
  }

  async createRoom(roomId, roomTitle, roomMenu) {
    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.methods
          .createRoom(roomId, roomTitle, roomMenu)
          .send({ from: this.account, gas: this.gas }, (err, transaction) => {
            if (!err) resolve(transaction);
            reject(err);
          });
      } catch (e) {
        reject(e);
      }
    });
  }
}
