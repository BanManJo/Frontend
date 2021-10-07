const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0xeA439a8FAae31a6b73dC8aa9c016b81fdEa00f97 (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0x4c53a7C1101900d1d8bBE112747401EB7eccb41e
//demo address : 0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229
// 성구
//Address: 0x313FBdf4A59accfB75D2de26947c0D446BD3BB73
//Demo : 0x201Dc9e68c6Dd6D3eF7D2F6Fb41B5d7EDc93BD44
//현수
//Demo : 0x608B1f9A771C99fF27Ea945a1BE88f496C81Cc99
//Admin: 0x60B9Bb344a656F63b5317e7802d435b92e8Cd445
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0xcE9938ee6dfdad27132a19D47AF087C30C9F1603",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0x8d257E58900b584589c7E1B5BB81A4d0bBD5A6Db",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
