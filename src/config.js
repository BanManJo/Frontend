const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//address: 0x13c97ecd59d2fd674858C7396F900f2761C1A784
//대영
//address:
// 성구
//address:
//현수
//address:
module.exports = {
  DEMO_ADDRESS: "0x2585d9a685aCF4F99F8f7d99a3351211cd6a7339",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x13c97ecd59d2fd674858C7396F900f2761C1A784",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000
};
