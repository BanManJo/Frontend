const DemoRepository = require('./contracts/Demo')
const AdminTestRepository = require('./contracts/AdminTest')

module.exports = {
  DEMO_ADDRESS: '0x2585d9a685aCF4F99F8f7d99a3351211cd6a7339',
  DEMO_ABI: DemoRepository.abi,
  ADMIN_TEST_ADDRESS: '0xDE7295C4790640CC15D6Fa74252F942645d8c797',
  ADMIN_TEST_ABI: AdminTestRepository.abi,
  GAS_AMOUNT: 500000,
}
