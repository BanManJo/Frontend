const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//address: 0x13c97ecd59d2fd674858C7396F900f2761C1A784
//대영
//address:
// 성구
//address: 0xba9be9d17Bc8FC3097F134Cf4F06ca8810621f0b
//현수
//Admin: 0xb480fFA7CAE23D224986920C74290003A25DD4b3
//Demo : 0x6fa5604AfE6BE30f5435797D2bB860Ba476A8F6D
module.exports = {
  DEMO_ADDRESS: "0x6fa5604AfE6BE30f5435797D2bB860Ba476A8F6D",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0xb480fFA7CAE23D224986920C74290003A25DD4b3",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 4476768
};
