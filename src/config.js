let DemoRepository = require("./contracts/Demo");
let AdminTestRepository = require("./contracts/AdminTest");

module.exports = {
  DEMO_ADDRESS: "0x2585d9a685aCF4F99F8f7d99a3351211cd6a7339",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x1FF384b4769a6E408F1267acC3A887d45e43B32F",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000
};
