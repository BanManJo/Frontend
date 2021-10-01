const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x573E38D657d27Ad561b03dfCd29E9dE8a2ca6d34 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0xca0a70d46c03a54814d895cdE90F0c7E6B315Bdf (mac / window)
//대영
//address:
// 성구
//address: 0xba9be9d17Bc8FC3097F134Cf4F06ca8810621f0b
//현수
//Admin: 0xF35479e6a8FFEdaF62459EE0107009815e88730F
//Demo : 0x562cF047d2c1682CdBAbc777C675B6d6c8De5313
module.exports = {
  DEMO_ADDRESS: "0x562cF047d2c1682CdBAbc777C675B6d6c8De5313",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x573E38D657d27Ad561b03dfCd29E9dE8a2ca6d34",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 4476768
};
