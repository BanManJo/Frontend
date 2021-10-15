const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x2c3040877ab2C6363D9aFc9bc7a922b735CC74f3 / 0x155D388687dD001AD1F7a579844D04B98157952e (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0x124Fef80556d28CC099B4027c7879bf1d86a2774
//demo address :  0x633d75f67Fd7376A3109fCd3d7cb6Cf3bE7Ae9DF
// 성구
//Address: 0x8B8fA0c8dEdd6a5d005C5A73c892f38FB1061797
//Demo : 0x4eA493894611A89E1E6aEfe7C43177330A7927A6
//현수
//Demo : 0x10446aA5613F3a8de0Dbc5965395E6F5386434a9
//Admin: 0x0D32c968A3F81Ff4a67A710C02B8a5D8eb9eB6B8
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0x633d75f67Fd7376A3109fCd3d7cb6Cf3bE7Ae9DF",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0x155D388687dD001AD1F7a579844D04B98157952e",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
