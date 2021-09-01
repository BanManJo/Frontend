const buyBtn = document.querySelector("#buy-btn");
// const product = document.querySelector("#product");
// console.log(product)

// product.innerText = `<ul>
// <li><img src ="images/1.jpg" width= "300" height = "300"/></li>
// <li><form id = buy-btn><input type='submit'  value = 구매></form></li>
// <li>1조</li>
// </ul>`;

console.log(buyBtn);

window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    console.log("Web3 Detected! " + web3.currentProvider.constructor.name);
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log("No Web3 Detected... using HTTP Provider");
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/136f41840198485f8491ee2e196820d1"
      )
    );
  }
});

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

function onBuyBtn(event) {
  event.preventDefault();
  alert("metamask");
}

buyBtn.addEventListener("submit", onBuyBtn);
