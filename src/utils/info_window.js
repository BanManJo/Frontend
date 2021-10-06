export default function(marker, createOrderRoom, showOrderRooms) {
  console.log("=== Make Info Window ===");
  const content = document.createElement("div");
  content.style.padding = "5px";

  const storeName = document.createElement("div");
  const storeNameText = document.createTextNode(`가게: ${marker.storeName} `);
  storeName.appendChild(storeNameText);
  content.appendChild(storeName);

  const orderRoomCount = document.createElement("div");
  const orderRoomCountText = document.createTextNode(
    `주문방: ${marker.orderCount}`
  );
  orderRoomCount.appendChild(orderRoomCountText);
  content.appendChild(orderRoomCount);

  const linkCreateRoom = document.createElement("a");
  linkCreateRoom.style.color = "blue";
  linkCreateRoom.target = "_blank";
  linkCreateRoom.id = marker.storeName;
  linkCreateRoom.addEventListener("click", createOrderRoom);
  linkCreateRoom.appendChild(document.createTextNode("방만들기 "));
  content.appendChild(linkCreateRoom);

  const linkShowOrderRooms = document.createElement("a");
  linkShowOrderRooms.style.color = "blue";
  linkShowOrderRooms.target = "_blank";
  linkShowOrderRooms.id = marker.storeName;
  linkShowOrderRooms.addEventListener("click", showOrderRooms);
  linkShowOrderRooms.appendChild(document.createTextNode("주문방 보기"));
  content.appendChild(linkShowOrderRooms);

  console.log("=== Done Mark Info Window ===");
  return content;
}
