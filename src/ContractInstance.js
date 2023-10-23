import { AdminRepository } from "./models/AdminRepository";
import { ChickenHouseRepository } from "./models/ChickenHouseRepository";
import { OrderRoomRepository } from "./models/OrderRoomRepository";
import { DemoRepository } from "./models/DemoRepository";

const Web3 = require("web3");

export default class ContractInstance {
  AdminRepoInstance = null;
  DemoTestRepoInstance = null;
  orderRoomRepoInstance = null;

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
    this.AdminRepoInstance = new AdminRepository();
    const web3 = new Web3(window.ethereum);
    console.log(`well setting web3 ${web3}`);
    this.AdminRepoInstance.setWeb3(web3);
  }

  setDemoInstance() {
    this.DemoTestRepoInstance = new DemoRepository();
    const web3 = new Web3(window.ethereum);
    console.log(`well setting web3 ${web3}`);
    this.DemoTestRepoInstance.setWeb3(web3);
  }

  // setOrderRoomInstance() {
  //   this.DemoTestRepoInstance = new DemoRepository();
  //   const web3 = new Web3(window.ethereum);
  //   console.log(`well setting web3 ${web3}`);
  //   this.DemoTestRepoInstance.setWeb3(web3);
  // }

  getAdminInstance() {
    if (this.AdminRepoInstance !== null) {
      return this.AdminRepoInstance;
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

  getChickenHouseInstance(contract_address) {
    const ChickenHouseInstance = new ChickenHouseRepository();
    const web3 = new Web3(window.ethereum);
    console.log(`well setting web3 ${web3}`);
    ChickenHouseInstance.setWeb3(web3, contract_address);
    return ChickenHouseInstance;
  }

  getOrderRoomInstance(contract_address) {
    const OrderRoomInstance = new OrderRoomRepository();
    const web3 = new Web3(window.ethereum);
    console.log(`well setting web3 ${web3}`);
    OrderRoomInstance.setWeb3(web3, contract_address);
    return OrderRoomInstance;
  }
}
// Instance 객체 -> export
