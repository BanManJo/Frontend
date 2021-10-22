const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x6b9ca828654bf4618970b1E14c9767a8aE912506 / 0x155D388687dD001AD1F7a579844D04B98157952e (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0x0C46ecBC93dc33Bb977072Adc667E400f6d40637
//demo address :  0x9D05D89E2957b2927b36FF8c967640146A721Ee3
// 성구
//Address: 0x3AA1D10D7e51a1973Be8719f97EEAb7AEc6500Da
//Demo : 0x6F2Eb5008aC9FA54731e5C897356d3CE091B3698
//현수
//Demo : 0x841f19aa3257Ccdb53dC30F547107f6b4B0F505E
//Admin: 0x7B4b7BcE1608906f61808B7a919CC15c5E69fEC8
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0x841f19aa3257Ccdb53dC30F547107f6b4B0F505E",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0x6b9ca828654bf4618970b1E14c9767a8aE912506",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
