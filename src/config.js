const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0xBd028346396441C472d29bd5Ed89e39cA468ba2E (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0xC2DDfB9CFccD3715Eb6cf5624E52F5C419872bEA
//demo address :  0x6AEd0DBc11146532AFd698D348f5E32Ce37E6c4C
// 성구
//Address: 0xa97c562225f4C78C1de62ec3AFe9CD150aBFfc91
//Demo : 0xF5c0E4D3aF67fc7419f4D9433e7eF878bcb3Abfb
//현수
//Demo : 0x6E4ec6dF29686F84298f1304B4e4723E28e7693E
//Admin: 0xD6f163b0334E02Ea37fe5c9Bd53b610524a569AE
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
