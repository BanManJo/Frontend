import Config from '../config'

export class DemoRepository {
  web3 = null;
  contractInstance = null;
  account = '';
  gas = 4476768;

  constructor () {
    this.gas = Config.GAS_AMOUNT
  }

  setWeb3 (web3) {
    this.web3 = web3
    this.contractInstance = new this.web3.eth.Contract(
      Config.DEMO_ABI,
      Config.DEMO_ADDRESS,
    )
  }

  getWeb3 () {
    return this.web3
  }

  setAccount (account) {
    this.account = account
  }

  async getCount () {
    // await window.ethereum.request({ method: "eth_requestAccounts" });
    return new Promise(async (resolve, reject) => {
      try {
        var result = await this.contractInstance.methods.getRoomCounts().call()
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  async createRoom (roomId, roomTitle, roomMenu) {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    return new Promise(async (resolve, reject) => {
      try {
        this.contractInstance.methods
          .createRoom(roomId, roomTitle, roomMenu)
          .send({ from: accounts[0], gas: 4476768 }, (err, transaction) => {
            if (!err) resolve(transaction)
            reject(err)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  getCurrentBlock () {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBlockNumber((err, blocknumber) => {
        if (!err) resolve(blocknumber)
        reject(err)
      })
    })
  }

  // Create Room Event
  async watchIfCreated (cb) {
    const currentBlock = await this.getCurrentBlock()
    const eventWatcher = this.contractInstance.events.RoomCreated(
      { fromBlock: currentBlock - 1 },
      cb,
    )
  }
}
