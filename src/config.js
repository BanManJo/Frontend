const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x573E38D657d27Ad561b03dfCd29E9dE8a2ca6d34 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0xca0a70d46c03a54814d895cdE90F0c7E6B315Bdf (mac / window)
//대영
//address:   0x4c53a7C1101900d1d8bBE112747401EB7eccb41e
//demo address : 0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229
// 성구
//address: 0xba9be9d17Bc8FC3097F134Cf4F06ca8810621f0b
//현수
//Admin: 0xb480fFA7CAE23D224986920C74290003A25DD4b3
//Demo : 0x6fa5604AfE6BE30f5435797D2bB860Ba476A8F6D
module.exports = {
  DEMO_ADDRESS: "0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x4c53a7C1101900d1d8bBE112747401EB7eccb41e",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 4476768
};
