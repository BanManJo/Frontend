const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

module.exports = {
  DEMO_ADDRESS: "0x2585d9a685aCF4F99F8f7d99a3351211cd6a7339",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x4d6a5530FbA901CFc9eBE6Bacc86FCFda8c2e384",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000
};
