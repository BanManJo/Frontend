let DemoRepository = require("./contracts/Demo");
let AdminTestRepository = require("./contracts/AdminTest");

module.exports = {
  DEMO_ADDRESS: "0x37D9423203F25DEAf0ff8f259dd5e80ac28C313e",
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: "0x9AD962E1505E8269E77cF590bB84f298FF453380",
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000
};
