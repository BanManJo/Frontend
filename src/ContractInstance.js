import { AdminTestRepository } from "./models/AdminTestRepository";

const Web3 = require("web3");

export default class ContractInstance {
  web3 = null;
  AdminTestRepoInstance = null;

  constructor() {
    if (ContractInstance._instance) {
      //   throw new Error(
      //     "Singleton classes can't be instantiated more than once."
      //   );
      return ContractInstance._instance;
    }
    ContractInstance._instance = this;
    // ... Your rest of the constructor code goes after this
  }

  setAdminInstance() {
    this.AdminTestRepoInstance = new AdminTestRepository();
    if (this.web3 === null) {
      this.web3 = new Web3(window.ethereum);
      console.log(this.web3);
      this.AdminTestRepoInstance.setWeb3(this.web3);
    }
  }

  getAdminInstance() {
    if (this.AdminTestRepoInstance !== null) {
      return this.AdminTestRepoInstance;
    } else {
      throw new Error("Create Instance of Admin First");
    }
  }
}
// Instance 객체 -> export
