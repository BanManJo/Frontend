import findWayImage from "../img/two-ways.png";

export default function(marker, createOrderRoom, showOrderRooms, _address) {
  console.log("=== Make Info Window ===");
  const isOpen = marker.onOff == 1 ? true : false;
  const content = document.createElement("div");
  // content.style.padding = "5px";
  // content.style.border = "1px outset white";
  // content.style.borderBottomLeftRadius = "5px";
  // content.style.borderBottomRightRadius = "5px";
  // content.style.backgroundColor = "grey";
  content.style.width = "18em";
  content.style.height = "9em";
  content.className = "d-flex flex-column justify-start";

  const storeName = document.createElement("div");
  storeName.style.borderBottom = "0.5px solid grey";
  storeName.style.backgroundColor = "orange";
  storeName.style.padding = "5px";

  const storeNameH2 = document.createElement("h2"),
    storeNameText = document.createTextNode(marker.storeName);

  storeNameH2.appendChild(storeNameText);
  storeName.appendChild(storeNameH2);
  content.appendChild(storeName);

  const address = document.createElement("div");
  // address.style.border = "1px solid black";
  // address.style.backgroundColor = "red";
  address.className = "d-flex justify-space-between";
  address.style.padding = "5px";

  const addressSpan = document.createElement("span"),
    addressText = document.createTextNode(
      isOpen ? _address : "오픈 준비중입니다..."
    );
  addressSpan.appendChild(addressText);
  address.appendChild(addressSpan);

  const findWayButton = document.createElement("a"),
    findWayImg = document.createElement("img");

  findWayButton.style.marginRight = "0.5em";
  findWayButton.href = `https://map.kakao.com/link/to/${marker.storeName},${marker.latitude},${marker.longitude}`;
  findWayButton.target = "_blank";
  findWayImg.src = findWayImage;
  findWayImg.style.height = "1.5em";

  findWayButton.appendChild(findWayImg);
  address.appendChild(findWayButton);
  content.appendChild(address);

  const actions = document.createElement("div");
  actions.style.borderTop = "0.5px solid grey";
  // actions.style.backgroundColor = "blue";
  actions.style.height = "3em";
  actions.className = "mt-auto d-flex justify-space-around";
  // actions.className = "mt-auto pb-2 d-flex justify-space-around";
  // actions.style.padding = "5px";

  const linkCreateRoom = document.createElement("button");
  linkCreateRoom.id = marker.storeName;
  linkCreateRoom.disabled = !isOpen;
  linkCreateRoom.style.color = isOpen ? "DarkOrange" : "grey";
  linkCreateRoom.style.fontWeight = "bold";
  linkCreateRoom.style.borderRight = "0.5px solid grey";
  // linkCreateRoom.style.borderRadius = "5px";
  linkCreateRoom.style.width = "50%";
  // linkCreateRoom.classList.add("info");

  linkCreateRoom.addEventListener("click", createOrderRoom);
  linkCreateRoom.appendChild(document.createTextNode("방만들기"));
  actions.appendChild(linkCreateRoom);

  const linkShowOrderRooms = document.createElement("button");
  linkShowOrderRooms.id = marker.storeName;
  linkShowOrderRooms.disabled = !isOpen;
  linkShowOrderRooms.style.color = isOpen ? "DarkOrange" : "grey";
  linkShowOrderRooms.style.fontWeight = "bold";
  // linkShowOrderRooms.style.border = "1px solid black";
  // linkShowOrderRooms.style.borderRadius = "5px";
  linkShowOrderRooms.style.width = "50%";
  // linkShowOrderRooms.classList.add("warning");

  linkShowOrderRooms.addEventListener("click", showOrderRooms);
  linkShowOrderRooms.appendChild(document.createTextNode("주문방 보기"));
  actions.appendChild(linkShowOrderRooms);

  content.appendChild(actions);

  console.log("=== Done Mark Info Window ===");
  return content;
}
