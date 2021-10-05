<template>
  <v-app>
    <v-main>
      <v-container id="map" style="padding: 0px" fluid></v-container>
    </v-main>

    <v-main id="contents">
      </v-btn>
    </v-main>
    <menu-speed-dial></menu-speed-dial>
    <!-- Navigation Drawer -->
    <order-room-navigation-drawer
      :navDrawer="navDrawer"
    ></order-room-navigation-drawer>
    <!-- modal -->
    <create-room-dialog :room="room"></create-room-dialog>
  </v-app>
</template>

<script>
// Utilities
import { mapState, mapMutations } from "vuex";

// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  name: "map",
  // store,
  components: {
    CreateRoomDialog: () => import("./CreateRoomDialog"),
    OrderRoomNavigationDrawer: () => import("./OrderRoomNavigationDrawer"),
    MenuSpeedDial: () => import("./MenuSpeedDial")
  },
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data
      map: null,
      markerDatas: [
        // {
        //   latitude: 37.4814,
        //   longitude: 126.881,
        //   removed: true,
        //   storeName: "가산디지털 단지 역",
        //   orderCount: 3,
        // },
      ],
      navDrawer: {
        drawer: false,
        storeName: null,
        roomCount: null,
        orderRooms: [
        ]
      },
      // Create Room Model
      room: {
        roomModal: false,
        storeName: null,
        isLoading: false,
        roomName: null,
        // roomNumber: "",
        storeIdx: 0,
        menus: [],
        timer: 15
      }
    };
  },
  computed: {
    ...mapState(["drawer"])
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    }),
    createOrderRoom(event) {
      console.log("=== Create Order Room ===");

      event.preventDefault();
      this.room.roomModal = !this.room.roomModal;
      this.room.storeName = event.target.id;
      // menus
      this.room.menus = [];
      this.AdminInstance.getStoreMenu(this.room.storeName).then(result => {
        console.log("---- get store menus from ETH ----");
        const chickens = result[0];
        const prices = result[1];
        for (let i = 0; i < chickens.length; i++) {
          console.log(chickens[i], prices[i]);
          this.room.menus.push({
            chicken: chickens[i],
            price: `${prices[i]}`,
            description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
            selected: false
          });
        }
      });

      // storeIdx (if needed)
      console.log("=== Done Create Order Room ===");
    },
    async showOrderRooms(event) {
      console.log("=== Show Order Rooms ===");

      event.preventDefault();
      this.navDrawer.drawer = !this.navDrawer.drawer;
      if (!this.navDrawer.drawer){
        this.navDrawer.orderRooms = [];
        return;
      }

      const storeName = event.target.id;
      this.navDrawer.storeName = storeName;

      const roomCount = await this.AdminInstance.getRoomsCount(storeName);
      // this.navDrawer.roomCount = roomCount;
      let counts = 0;
      console.log(`---- get Order Rooms Info, Counts: ${roomCount}`);
      for (let idx = 0; idx < roomCount; idx++) {
        await this.AdminInstance.getRoomInfo(storeName, idx)
          .then(result => {
            console.log(result);
            if (result.state === "1") {
              counts++;
              this.navDrawer.orderRooms.push({
                headline: result.chicken,
                subText: `종료 시간: 15:23 | ${result.price}₩`,
                show: false,
                description: "황금올리브 같이 먹을 분 구함!~",
                index: idx
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      this.navDrawer.roomCount = counts;
      }
      console.log("=== Done Show Order Room ===");
    },
    makeInfoWindow(marker) {
      console.log("=== Make Info Window ===");
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
      linkCreateRoom.id = marker.storeName;
      linkCreateRoom.addEventListener("click", this.createOrderRoom);
      linkCreateRoom.appendChild(document.createTextNode("방만들기 "));
      content.appendChild(linkCreateRoom);

      const linkShowOrderRooms = document.createElement("a");
      linkShowOrderRooms.style.color = "blue";
      linkShowOrderRooms.target = "_blank";
      linkShowOrderRooms.id = marker.storeName;
      linkShowOrderRooms.addEventListener("click", this.showOrderRooms);
      linkShowOrderRooms.appendChild(document.createTextNode("주문방 보기"));
      content.appendChild(linkShowOrderRooms);

      console.log("=== Done Mark Info Window ===");
      return content;
    },
    async createMarker() {
      // get chicken houses number
      // // get chicken house info
      // // // setting chicken houses
      console.log("=== Create Marker ===");
      console.log("---- get Store Counts from ETH ----");
      this.AdminInstance.getStoreCount()
        .then(async val => {
          console.log(
            `---- get Each Chicken House Infos by idx, Counts: ${val} ----`
          );
          for (let idx = 0; idx < val; idx++) {
            await this.AdminInstance.getChickenHouseByIndex(idx).then(
              async result => {
                const _orderCount = await this.AdminInstance.getRoomsCount(
                  result.storeName
                );
                this.markerDatas.push({
                  latitude: Number(result.latitude),
                  longitude: Number(result.longitude),
                  removed: true,
                  storeName: result.storeName,
                  orderCount: _orderCount
                });
              }
            );
          }
          console.log("---- markerDatas setting on map ----");
          this.markerDatas.forEach(markerData => {
            const markerPosition = new kakao.maps.LatLng(
              markerData.latitude,
              markerData.longitude
            );

            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
              position: markerPosition
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.map);

            // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
            console.log("---- call make Info Window func ----");
            const iwContent = this.makeInfoWindow(markerData);
            const iwRemoveable = false;
            // 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({
              content: iwContent,
              removable: iwRemoveable
            });
            console.log("---- Add click event on marker ----");
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
        })
        .catch();
      console.log("=== Done Create Marker ===");
    },
    initMap() {
      console.log("=== Init Map ===");
      const container = document.getElementById("map");
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const _position = new kakao.maps.LatLng(lat, lng);
        const options = {
          center: _position,
          level: 3
        };
        this.map = new kakao.maps.Map(container, options);
        this.markerDatas.push({
          latitude: lat,
          longitude: lng,
          removed: true,
          storeName: "현 위치 ",
          orderCount: 3
        });
        console.log("---- call create marker func ----");
        this.createMarker();
      }, console.log);
      console.log("=== Done Init Map ===");
    }
  },
  mounted() {
    console.log("=== Mounted Map.vue ===");
    console.log("---- Set Window Size ----");
    document.body.style.width = `${window.screen.width}px`;
    document.body.style.height = `${window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight}px`;
    console.log("---- Initialize kakao Object and Map Object ----");
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f16dcaffdef9152c39799852d826d9c4&libraries=services";
      document.head.appendChild(script);
    }
    console.log("=== Done Mounted Map.vue ===");
  },
  created() {
    console.log("=== Created Map.vue ===");
    console.log("---- Set Admin Instance ----");

    console.log("=== Done Created Map.vue ===");
  },
  watch: {
    room: roomState => {
      console.log(roomState);
      if (roomState.roomModal === false) {
        console.log("close close");
      }
    }
  }
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
