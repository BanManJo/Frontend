<template>
  <v-app>
    <v-content>
      <v-container id="map" style="padding: 0px" fluid> </v-container>
    </v-content>

    <v-content id="contents">
      <v-btn @click="registerCH.dialog = !registerCH.dialog" depressed>
        Register Chicken House
      </v-btn>
    </v-content>
    <register-chicken-house-dialog
      :registerCH="registerCH"
    ></register-chicken-house-dialog>
    <!-- Navigation Drawer -->
    <right-navigation-drawer :navDrawer="navDrawer"></right-navigation-drawer>
    <!-- modal -->
    <create-room-dialog :room="room"></create-room-dialog>
  </v-app>
</template>

<script>
// import { mapState } from "vuex";
// import store, { OPEN_CREATE_ROOM, CLOSE_CREATE_ROOM } from "../vuex/store";
import CreateRoomDialog from "./CreateRoomDialog";
import RightNavigationDrawer from "./RightNavigationDrawer.vue";
import RegisterChickenHouseDialog from "./RegisterChickenHouseDialog.vue";
export default {
  name: "map",
  // store,
  components: {
    CreateRoomDialog,
    RightNavigationDrawer,
    RegisterChickenHouseDialog,
  },
  data() {
    return {
      registerCH: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      },
      map: null,
      markerDatas: [
        {
          latitude: 37.4814,
          longitude: 126.881,
          removed: true,
          storeName: "가산디지털 단지 역",
          orderCount: 3,
        },
        {
          latitude: 37.481727,
          longitude: 126.88482,
          removed: true,
          storeName: "BHC 가산점",
          orderCount: 5,
        },
      ],
      navDrawer: {
        drawer: false,
        orderRooms: [
          {
            headline: "황금 올리브",
            subText: "종료 시간: 15:23",
            show: false,
            description: "황금올리브 같이 먹을 분 구함!~",
          },
        ],
      },
      // Create Room Model
      room: {
        isLoading: false,
        roomModal: false,
        roomName: null,
        // roomNumber: "",
        storeName: "BBQ",
        storeIdx: 0,
        // foodName: "",
        menus: [
          {
            chicken: "황금 올리브",
            price: "19,000₩",
            description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
            selected: false,
          },
        ],
        timer: 15,
      },
    };
  },
  computed: {
    // ...mapState({
    //   // cellData(state) {
    //   //   return state.tableData[rowIndex][cellIndex];
    //   // },
    //   createRoomModal: "createRoomModal",
    // }),
  },
  methods: {
    createOrderRoom() {
      this.room.roomModal = !this.room.roomModal;
    },
    showOrderRooms() {
      this.navDrawer.drawer = !this.navDrawer.drawer;
    },
    makeInfoWindow(marker) {
      const content = document.createElement("div");
      content.style.padding = "5px";

      const storeName = document.createElement("div");
      const storeNameText = document.createTextNode(
        `가게: ${marker.storeName} `
      );
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
      linkCreateRoom.addEventListener("click", this.createOrderRoom);
      linkCreateRoom.appendChild(document.createTextNode("방만들기 "));
      content.appendChild(linkCreateRoom);

      const linkShowOrderRooms = document.createElement("a");
      linkShowOrderRooms.style.color = "blue";
      linkShowOrderRooms.target = "_blank";
      linkShowOrderRooms.addEventListener("click", this.showOrderRooms);
      linkShowOrderRooms.appendChild(document.createTextNode("주문방 보기"));
      content.appendChild(linkShowOrderRooms);

      return content;
    },
    createMarker() {
      this.markerDatas.forEach((markerData) => {
        const markerPosition = new kakao.maps.LatLng(
          markerData.latitude,
          markerData.longitude
        );

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(this.map);

        // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
        // const iwContent = `<div style="padding:5px;">가게: ${markerData.storeName} | 주문방: ${markerData.orderCount}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        // const iwContent = `<div style="padding:5px;"><div>가게: ${markerData.storeName} </div><div>주문방: ${markerData.orderCount}</div>
        //               <a onclick="alert('방만들기')" style="color:blue" target="_blank">방만들기</a>
        //               <a onclick="alert('주문 방 보기')" style="color:blue" target="_blank">주문방 보기</a>
        //               </div>`;
        const iwContent = this.makeInfoWindow(markerData);
        const iwRemoveable = false;
        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });
        // 마커에 마우스오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", () => {
          // let removed = true;
          // console.log(this);
          if (markerData.removed) {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(this.map, marker);
            markerData.removed = false;
          } else {
            infowindow.close();
            markerData.removed = true;
          }
        });
      });
    },
    initMap() {
      const container = document.getElementById("map");
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const _position = new kakao.maps.LatLng(lat, lng);
        const options = {
          center: _position,
          level: 3,
        };
        this.map = new kakao.maps.Map(container, options);
        this.markerDatas.push({
          latitude: lat,
          longitude: lng,
          removed: true,
          storeName: "현 위치 ",
          orderCount: 3,
        });
        this.createMarker();
      }, console.log);
    },
  },
  mounted() {
    console.log("mounted");

    document.body.style.width = `${window.screen.width}px`;
    document.body.style.height = `${
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    }px`;
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      console.log("false");
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f16dcaffdef9152c39799852d826d9c4&libraries=services";
      document.head.appendChild(script);
    }
  },
};
</script>

<style>
html {
  margin: 0;
  padding: 0;
}
body {
  position: relative;
  overflow: hidden; /* Hide scrollbars */
}

#map {
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}

#contents {
  position: absolute;
  top: 0%;
  z-index: 2;
}
</style>