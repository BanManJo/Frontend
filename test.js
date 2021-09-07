const contracts = {
  Demo: null,
};
const testBtn = document.querySelector("#test-btn");
// const product = document.querySelector("#product");
// console.log(product)

// product.innerText = `<ul>
// <li><img src ="images/1.jpg" width= "300" height = "300"/></li>
// <li><form id = buy-btn><input type='submit'  value = 구매></form></li>
// <li>1조</li>
// </ul>`;

console.log(buyBtn);

// Metamask 연결!
window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    console.log("Web3 Detected! " + web3.currentProvider.constructor.name);
    web3 = new Web3(web3.currentProvider);
  } else {
    console.log("No Web3 Detected... using HTTP Provider");
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/136f41840198485f8491ee2e196820d1"
      )
    );
  }
  getContractWithFetch();
});

// 계좌에서 잔액 확인하기
function getBalance() {
  const address = document.getElementById("address").value;
  try {
    web3.eth.getBalance(address, function(error, wei) {
      if (!error) {
        const balance = web3.utils.fromWei(wei, "ether");
        document.getElementById("output").innerText = balance + " ETH";
      }
    });
  } catch (err) {
    document.getElementById("output").innerText = err;
  }
}

// 이더리움 네트워크에 배포된 컨트랙트 연결하기!
// ABI , 컨트랙트 주소!

// Create Contract Instance

function getContractWithFetch() {
  fetch("./contracts/Demo.json")
    .then((response) => response.json())
    .then((data) => {
      // change to contract address (Demo)
      const address = "0x9b0C0f91f9148D2bCd60075b146551900f00f423"; // sangil contract address
      const ABI = data.abi;
      contracts.Demo = new web3.eth.Contract(ABI, address);
      console.log(contracts.Demo);
    });
}

function onCallMethodBtn(event) {
  event.preventDefault();
  contracts.Demo.methods
    .testing()
    .call()
    .then((data) => {
      alert(`Succed! call the contracts methods! => ${data}`);
    });
}

testBtn.addEventListener("submit", onCallMethodBtn);
