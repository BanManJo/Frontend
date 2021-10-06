<template>
  <v-app>
    <v-main>
      <v-container id="map" style="padding: 0px" fluid></v-container>
    </v-main>

    <v-main id="contents">
      <!-- </v-btn> -->
    </v-main>
    <menu-speed-dial></menu-speed-dial>
    <!-- Navigation Drawer -->
    <order-room-navigation-drawer
      :navDrawer="navDrawer"
      @createOrderRoom="createOrderRoom"
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

// Info Window
import MakeInfoWindow from "../utils/info_window";

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
      listener: "sdsd",
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data
      DemoInstance: contractInstance.getDemoInstance(), // Admin Instance data
      map: null,
      markerDatas: [],
      navDrawer: {
        storeName: null,
        roomCount: null,
        orderRooms: []
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
    ...mapState({
      drawer: state => state.OrderRoomDrawer.drawer
    })
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    }),
    createOrderRoom(event, flag = false) {
      console.log("=== Create Order Room ===");
      console.log(event);
      this.room.roomModal = !this.room.roomModal;
      if (flag) {
        this.room.storeName = event; // 변경해야 함.. (marker의 title로 대체 할 수 있다면?)
      } else {
        event.preventDefault();
        this.room.storeName = event.target.id; // 변경해야 함.. (marker의 title로 대체 할 수 있다면?)
      }
      // menus
      this.room.menus = [];

      /**** 새롭게 구조화 된 부분 *****/
      this.AdminInstance.findChickenHouse(this.room.storeName).then(
        CHAddress => {
          // console.log(contract);
          const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
            CHAddress
          );
          ChickenHouseInstance.getStoreMenu().then(result => {
            console.log("---- get store menus from ETH ----");
            console.log(result);

            for (let i = 0; i < result._chickens.length; i++) {
              this.room.menus.push({
                chicken: result._chickens[i],
                price: `${result._prices[i]}`,
                description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
                selected: false
              });
            }
          });
        }
      );

      // storeIdx (if needed)
      console.log("=== Done Create Order Room ===");
    },
    async showOrderRooms(event) {
      console.log("=== Show Order Rooms ===");

      event.preventDefault();
      this.setDrawer(!this.drawer);
      this.navDrawer.orderRooms = [];
      if (!this.drawer) {
        return;
      }

      const storeName = event.target.id;
      this.navDrawer.storeName = storeName;

      /**** 새롭게 구조화 된 부분 *****/
      // 1. Chicken House 주소를 가져옴
      const CHAddress = await this.AdminInstance.findChickenHouse(storeName);
      // 2. Chicken House 인스턴스 생성
      const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
        CHAddress
      );

      // 3. 해당 Chicken House의 방 개수를 가져옴
      const roomCount = await ChickenHouseInstance.getRoomsCount();

      // 4. 같은 로직 실행
      console.log(`---- get Order Rooms Info, Counts: ${roomCount}`);

      let counts = 0;
      for (let idx = 0; idx < roomCount; idx++) {
        // 5. OrderRoom 주소를 가져옴
        const ORAddress = await ChickenHouseInstance.findOrderRoom(idx);
        // 6. OrderRoom 인스턴스 생성
        const OrderRoomInstance = contractInstance.getOrderRoomInstance(
          ORAddress
        );

        await OrderRoomInstance.getRoomInfo()
          .then(result => {
            console.log(result);
            if (result._state === "1") {
              counts++;
              this.navDrawer.orderRooms.push({
                headline: result._chickenName,
                subText: `종료 시간: 15:23 | ${result._price}₩`,
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
    createMarker(markerData) {
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
      const iwContent = MakeInfoWindow(
        markerData,
        this.createOrderRoom,
        this.showOrderRooms
      );
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
    },
    async createMarkers() {
      // get chicken houses number
      // // get chicken house info
      // // // setting chicken houses
      console.log("=== Create Marker ===");
      console.log("---- get Store Counts from ETH ----");

      /**** 새롭게 구조화 된 부분 *****/
      this.AdminInstance.getStoreCount()
        .then(async val => {
          console.log(
            `---- get Each Chicken House Infos by idx, Counts: ${val} ----`
          );
          for (let idx = 0; idx < val; idx++) {
            // idx를 통해 chicken House를 바로 가져옴..
            const CHAddress = await this.AdminInstance.findChickenHouseByIndex(
              idx
            );
            const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
              CHAddress
            );

            await ChickenHouseInstance.getChickenHouse().then(async result => {
              const _orderCount = await ChickenHouseInstance.getRoomsCount();
              console.log(result);
              this.markerDatas.push({
                latitude: Number(result._latitude),
                longitude: Number(result._longitude),
                removed: true,
                storeName: result._storeName,
                orderCount: _orderCount
              });
            });
          }
          console.log("---- markerDatas setting on map ----");
          console.log(this.markerDatas);
          this.markerDatas.forEach(markerData => {
            this.createMarker(markerData);
          });
        })
        .catch();
      console.log("=== Done Create Marker ===");
    },
    initMap() {
      console.log("=== Init Map ===");
      // 어떤 컨테이너 뷰에 맵을 띄울 것인가..
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
        this.createMarkers();
      }, console.log);
      console.log("=== Done Init Map ===");
    }
  },
  mounted() {
    console.log("=== Mounted Map.vue ===");
    console.log("---- Set Window Size ----");
    this.AdminInstance.watchIfRegistered((error, result) => {
      if (!error) {
        console.log(result);
        console.log(result.returnValues.storeAddress);
        const storeName = result.returnValues.storeName;
        const storeAddress = result.returnValues.storeAddress;
        const latitude = result.returnValues.latitude;
        const longitude = result.returnValues.longitude;
        const markerData = {
          latitude: Number(latitude),
          longitude: Number(longitude),
          removed: true,
          storeName: storeName,
          orderCount: 0
        };
        this.markerDatas.push(markerData);
        this.createMarker(markerData);
      } else {
        throw error;
      }
    });

    console.log("=== Done Mounted Map.vue ===");
  },
  created() {
    console.log("=== Created Map.vue ===");
    const resizeWindow = function() {
      document.body.style.width = `${window.screen.width}px`;
      document.body.style.height = `${window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight}px`;
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
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
