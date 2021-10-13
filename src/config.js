const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x8772FFc5Fcc8195c540efA0b4D9D6de96A4CDAF7 / 0x3fB752462A3E1B258065D6ccA050c29dcA4d89A7 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0xF6068c5b0670CC4b97D005DBe149B8a814BA724E
//demo address :  0xd73a2906480975A222bE39Df206Fa2a37EF50312
// 성구
//Address: 0x8B8fA0c8dEdd6a5d005C5A73c892f38FB1061797
//Demo : 0x4eA493894611A89E1E6aEfe7C43177330A7927A6
//현수
//Demo : 0x5B6DD9FC02A1206C5c9575dc436ec54b717bc5CB
//Admin: 0x2fDb4e579A89b32eE85785728d63e015Ec025b26
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0x5B6DD9FC02A1206C5c9575dc436ec54b717bc5CB",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0x2fDb4e579A89b32eE85785728d63e015Ec025b26",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
