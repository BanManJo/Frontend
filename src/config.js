const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

module.exports = {
  DEMO_ADDRESS: "0x2585d9a685aCF4F99F8f7d99a3351211cd6a7339",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x494e5437C8D2C1d4D99df401aC180a648242B869",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000
};
