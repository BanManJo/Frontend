const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0Bd2793ADecb58f3102C6B77ad94060527ca9C22 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0x4c53a7C1101900d1d8bBE112747401EB7eccb41e
//demo address : 0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229
// 성구
//Demo : 0x31a1Dc3A70e98EbA25952014FbF148b9bD15BcC4
//address: 0x6968509e42fE98F792eF26Ff3503dDace88CEd76
//현수
//Demo : 0x27e77ed199a09CC8190a6F29b2d35bba910F93a8
//Admin: 0x056c25C23DF1A23b8f1A93CdE6e9dCF01a55C187
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0x31a1Dc3A70e98EbA25952014FbF148b9bD15BcC4",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0x6968509e42fE98F792eF26Ff3503dDace88CEd76",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
