import findWayImage from "../img/two-ways.png";

// export default function(marker, createOrderRoom, showOrderRooms) {
//   console.log("=== Make Info Window ===");
//   const content = document.createElement("div");
//   content.style.padding = "5px";

//   const storeName = document.createElement("div");
//   const storeNameText = document.createTextNode(`가게: ${marker.storeName} `);
//   storeName.appendChild(storeNameText);
//   content.appendChild(storeName);

//   const orderRoomCount = document.createElement("div");
//   const orderRoomCountText = document.createTextNode(
//     `주문방: ${marker.orderCount}`
//   );
//   orderRoomCount.appendChild(orderRoomCountText);
//   content.appendChild(orderRoomCount);

//   const linkCreateRoom = document.createElement("a");
//   linkCreateRoom.style.color = "blue";
//   linkCreateRoom.target = "_blank";
//   linkCreateRoom.id = marker.storeName;
//   linkCreateRoom.addEventListener("click", createOrderRoom);
//   linkCreateRoom.appendChild(document.createTextNode("방만들기 "));
//   content.appendChild(linkCreateRoom);

//   const linkShowOrderRooms = document.createElement("a");
//   linkShowOrderRooms.style.color = "blue";
//   linkShowOrderRooms.target = "_blank";
//   linkShowOrderRooms.id = marker.storeName;
//   linkShowOrderRooms.addEventListener("click", showOrderRooms);
//   linkShowOrderRooms.appendChild(document.createTextNode("주문방 보기"));
//   content.appendChild(linkShowOrderRooms);

//   console.log("=== Done Mark Info Window ===");
//   return content;
// }

// export default function(marker, createOrderRoom, showOrderRooms) {
//   console.log("=== Make Info Window ===");
//   const content = `<div class="wrap">
//         <div>
//             <div class="title">
//                 카카오 스페이스닷원
//             <div class="close" onclick="closeOverlay()" title="닫기"></div>
//             </div>
//             <div class="body">
//                 <div class="img">
//                     <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="33" height="33">
//                </div>
//                 <div class="desc">
//                     <div class="ellipsis" width="fit-content">제주특별자치도 제주시 첨단로 242</div>
//                     <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
//                 </div>
//             </div>
//         </div>
//     </div>`;
//   // const content = `<div>
//   //     <div>
//   //       <div >안녕하세요</div>
//   //       <div>
//   //         <div >
//   //           <span>서울시 강남구 오피스텔 1층 개꿀</span>
//   //           <button>길찾기</button>
//   //         </div>
//   //         <div>
//   //           <button>방만들기</button><button>주문방보기</button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>`;
//   return content;
// }

export default function(marker, createOrderRoom, showOrderRooms) {
  console.log("=== Make Info Window ===");
  const content = document.createElement("div");
  // content.style.padding = "5px";
  // content.style.border = "1px solid black";
  // content.style.borderRadius = "10px";
  // content.style.backgroundColor = "grey";
  content.style.width = "18em";
  content.style.height = "8em";
  content.className = "d-flex flex-column justify-start";

  const storeName = document.createElement("div");
  storeName.style.borderBottomStyle = "solid";
  storeName.style.borderColor = "black";
  storeName.style.borderBottomWidth = "1px";
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
    addressText = document.createTextNode(`서울 강북구 무슨무슨로 123-12길`);
  addressSpan.appendChild(addressText);
  address.appendChild(addressSpan);

  const findWayButton = document.createElement("button"),
    findWayImg = document.createElement("img");

  findWayButton.style.marginRight = "0.5em";
  findWayImg.src = findWayImage;
  findWayImg.style.height = "1.5em";

  findWayButton.appendChild(findWayImg);
  address.appendChild(findWayButton);
  content.appendChild(address);

  const actions = document.createElement("div");
  // actions.style.border = "1px solid black";
  // actions.style.backgroundColor = "blue";
  actions.style.height = "3em";
  actions.className = "mt-auto d-flex justify-space-around";
  actions.style.padding = "5px";

  const linkCreateRoom = document.createElement("button");
  linkCreateRoom.id = marker.storeName;
  linkCreateRoom.style.border = "1px solid black";
  linkCreateRoom.style.borderRadius = "5px";
  linkCreateRoom.style.width = "5em";
  // linkCreateRoom.classList.add("info");

  linkCreateRoom.addEventListener("click", createOrderRoom);
  linkCreateRoom.appendChild(document.createTextNode("방만들기"));
  actions.appendChild(linkCreateRoom);

  const linkShowOrderRooms = document.createElement("button");
  linkShowOrderRooms.id = marker.storeName;
  linkShowOrderRooms.style.border = "1px solid black";
  linkShowOrderRooms.style.borderRadius = "5px";
  linkShowOrderRooms.style.width = "5em";
  // linkShowOrderRooms.classList.add("warning");

  linkShowOrderRooms.addEventListener("click", showOrderRooms);
  linkShowOrderRooms.appendChild(document.createTextNode("주문방 보기"));
  actions.appendChild(linkShowOrderRooms);

  content.appendChild(actions);

  console.log("=== Done Mark Info Window ===");
  return content;
}
