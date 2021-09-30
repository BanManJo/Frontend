const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//address: 0x13c97ecd59d2fd674858C7396F900f2761C1A784
//대영
//address:
// 성구
//address: 0x95eA7b442Cda9DB4a924466bdE4C894c72F4761E
//현수
//address: 0x494e5437C8D2C1d4D99df401aC180a648242B869
module.exports = {
  DEMO_ADDRESS: "0xf71Fc218A70e3AC4F8166AE8d3EaA6d905CCD6c1",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x95eA7b442Cda9DB4a924466bdE4C894c72F4761E",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000
};
