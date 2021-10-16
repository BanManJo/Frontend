const DemoRepository = require("./contracts/Demo");
const AdminRepository = require("./contracts/Admin");
const ChickenHouseRepository = require("./contracts/ChickenHouse");
const OrderRoomRepository = require("./contracts/OrderRoom");

//상일
//Admin: 0x5a3CBACD3D0794BA1017fdC724aA574804cF05ec / 0x155D388687dD001AD1F7a579844D04B98157952e (mac / window)
//Demo: 0x13c97ecd59d2fd674858C7396F900f2761C1A784 / 0x0C0989bdC8c053598BCBfeD5c0A1D597f649008A (mac / window)
//대영
//address:   0x0C46ecBC93dc33Bb977072Adc667E400f6d40637
//demo address :  0x9D05D89E2957b2927b36FF8c967640146A721Ee3
// 성구
//Address: 0x8B8fA0c8dEdd6a5d005C5A73c892f38FB1061797
//Demo : 0x4eA493894611A89E1E6aEfe7C43177330A7927A6
//현수
//Demo : 0x25Ba8d4b9cD74D377621C89B5473BC9F5c1A938E
//Admin: 0x6ad5D36b0dF1c4D3f24379509A4f81315C349420
//OrderRoom:
module.exports = {
  DEMO_ADDRESS: "0x25Ba8d4b9cD74D377621C89B5473BC9F5c1A938E",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_ADDRESS: "0x6ad5D36b0dF1c4D3f24379509A4f81315C349420",
  ADMIN_ABI: AdminRepository.abi,
  CHICKEN_HOUSE_ABI: ChickenHouseRepository.abi,
  ORDER_ROOM_ABI: OrderRoomRepository.abi,
  GAS_AMOUNT: 4476768
};
