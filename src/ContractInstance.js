import { AdminTestRepository } from "./models/AdminTestRepository";

const Web3 = require("web3");

export default class ContractInstance {
  AdminTestRepoInstance = null;
  DemoTestRepoInstance = null;

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
    const web3 = new Web3(window.ethereum);
    console.log(`well setting web3 ${web3}`);
    this.AdminTestRepoInstance.setWeb3(web3);
  }

  setDemoInstance() {
    this.DemoTestRepoInstance = new AdminTestRepository();
    const web3 = new Web3(window.ethereum);
    console.log(`well setting web3 ${web3}`);
    this.DemoTestRepoInstance.setWeb3(web3);
  }

  getAdminInstance() {
    if (this.AdminTestRepoInstance !== null) {
      return this.AdminTestRepoInstance;
    } else {
      throw new Error("Create Instance of Admin First");
    }
  }

  getDemoInstance() {
    if (this.DemoTestRepoInstance !== null) {
      return this.DemoTestRepoInstance;
    } else {
      throw new Error("Create Instance of Admin First");
    }
  }
}
// Instance 객체 -> export
