const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x29d6F9e0F033916DB49BEe2B417288Aa3e42A4eF (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0x4c53a7C1101900d1d8bBE112747401EB7eccb41e
//demo address : 0x9021Abc37CfA4AA4e533f5d5c1B2Bc8673aF2229
// 성구
//Address: 0xa97c562225f4C78C1de62ec3AFe9CD150aBFfc91
//Demo : 0xF5c0E4D3aF67fc7419f4D9433e7eF878bcb3Abfb
//현수
//Demo : 0x608B1f9A771C99fF27Ea945a1BE88f496C81Cc99
//Admin: 0x60B9Bb344a656F63b5317e7802d435b92e8Cd445
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0xF5c0E4D3aF67fc7419f4D9433e7eF878bcb3Abfb",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0xa97c562225f4C78C1de62ec3AFe9CD150aBFfc91",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
