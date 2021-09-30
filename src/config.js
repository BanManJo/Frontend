const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//address: 0x13c97ecd59d2fd674858C7396F900f2761C1A784
//대영
//address:
// 성구
//address:
//현수
//Admin: 0xF35479e6a8FFEdaF62459EE0107009815e88730F
//Demo : 0x562cF047d2c1682CdBAbc777C675B6d6c8De5313
module.exports = {
  DEMO_ADDRESS: "0x562cF047d2c1682CdBAbc777C675B6d6c8De5313",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0xF35479e6a8FFEdaF62459EE0107009815e88730F",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 4476768
};
