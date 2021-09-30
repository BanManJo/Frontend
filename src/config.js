const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//address: 0x13c97ecd59d2fd674858C7396F900f2761C1A784
//대영
//address:
// 성구
//address: 0xba9be9d17Bc8FC3097F134Cf4F06ca8810621f0b
//현수
//address: 0x494e5437C8D2C1d4D99df401aC180a648242B869
module.exports = {
  DEMO_ADDRESS: "0x0812375e6a5A8A8a2Fdbea6C9B0F7d05287197dc",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0xba9be9d17Bc8FC3097F134Cf4F06ca8810621f0b",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000
};
