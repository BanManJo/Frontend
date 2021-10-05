const DemoRepository = require("./contracts/Demo");
const AdminTestRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0xeA439a8FAae31a6b73dC8aa9c016b81fdEa00f97 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
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
  DEMO_ADDRESS: "0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0xeA439a8FAae31a6b73dC8aa9c016b81fdEa00f97",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
