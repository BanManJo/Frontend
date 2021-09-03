const buyBtn = document.querySelector("#buy-btn");
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
  getContract();
});

// 계좌에서 잔액 확인하기
function getBalance() {
  var address = document.getElementById("address").value;
  try {
    web3.eth.getBalance(address, function(error, wei) {
      if (!error) {
        var balance = web3.utils.fromWei(wei, "ether");
        document.getElementById("output").innerHTML = balance + " ETH";
      }
    });
  } catch (err) {
    document.getElementById("output").innerHTML = err;
  }
}

// 이더리움 네트워크에 배포된 컨트랙트 연결하기!
// ABI , 컨트랙트 주소!

// Create Contract Instance
function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function getContract() {
  readTextFile("./Demo.json", function(data) {
    // change to contract address (Demo)
    const address = "0x3eA2073DE1aaAA3A03D189eC5114F15e5f555021"; // sangil contract address
    const ABI = JSON.parse(data).abi;
    Demo = new web3.eth.Contract(ABI, address);
    console.log(Demo);
  });
}

function onBuyBtn(event) {
  event.preventDefault();
  alert("metamask");
}

buyBtn.addEventListener("submit", onBuyBtn);
