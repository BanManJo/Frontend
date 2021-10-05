const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/AdminTest");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x573E38D657d27Ad561b03dfCd29E9dE8a2ca6d34 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0xca0a70d46c03a54814d895cdE90F0c7E6B315Bdf (mac / window)
//대영
//address: 0xdA30f5B13De3f653e5FFC9c7C000692C5668328C
//demo address : 0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229
// 성구
//address: 0xba9be9d17Bc8FC3097F134Cf4F06ca8810621f0b
//현수
//Demo : 0x27e77ed199a09CC8190a6F29b2d35bba910F93a8
//Admin: 0x056c25C23DF1A23b8f1A93CdE6e9dCF01a55C187
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0x3E2D8d4967A23B84d2A92ec9D3e3c7ffCc3CA57F",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x1fDA3Caa5c1443ea8c6f95f53206eE5312E64237",
  ADMIN_TEST_ABI: AdminTestRepository.abi,

  GAS_AMOUNT: 4476768
};
