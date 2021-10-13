const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x2c3040877ab2C6363D9aFc9bc7a922b735CC74f3 / 0x3fB752462A3E1B258065D6ccA050c29dcA4d89A7 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0xF6068c5b0670CC4b97D005DBe149B8a814BA724E
//demo address :  0xd73a2906480975A222bE39Df206Fa2a37EF50312
// 성구
//Address: 0x8B8fA0c8dEdd6a5d005C5A73c892f38FB1061797
//Demo : 0x4eA493894611A89E1E6aEfe7C43177330A7927A6
//현수
//Demo : 0x6E4ec6dF29686F84298f1304B4e4723E28e7693E
//Admin: 0xD6f163b0334E02Ea37fe5c9Bd53b610524a569AE
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0xd73a2906480975A222bE39Df206Fa2a37EF50312",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0x2c3040877ab2C6363D9aFc9bc7a922b735CC74f3",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
