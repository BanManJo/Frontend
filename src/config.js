const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//address: 0x13c97ecd59d2fd674858C7396F900f2761C1A784
//대영
//address: 0xdA30f5B13De3f653e5FFC9c7C000692C5668328C
//demo address : 0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229
// 성구
//address: 0xba9be9d17Bc8FC3097F134Cf4F06ca8810621f0b
//현수
//Admin: 0xF35479e6a8FFEdaF62459EE0107009815e88730F
//Demo : 0x562cF047d2c1682CdBAbc777C675B6d6c8De5313
module.exports = {
  DEMO_ADDRESS: "0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0xdA30f5B13De3f653e5FFC9c7C000692C5668328C",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 4476768
};
