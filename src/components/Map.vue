<template>
  <v-app>
    <v-main>
      <div id="map" fluid></div>
    </v-main>

    <v-main id="contents"> </v-main>
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

let roomCreatedEmitter;
let roomMatchedEmitter;
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
      DemoInstance: contractInstance.getDemoInstance(), // Admin Instance data
      map: null,
      markerDatas: [],
      infowindows: [],
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
    /* ============= 주문방 만들기 함수 ============= */
    createOrderRoom(event, flag = false) {
      console.log("=== Create Order Room ===");
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
      console.log(this.room.storeName);
      this.AdminInstance.findChickenHouse(this.room.storeName).then(
        CHAddress => {
          console.log(CHAddress);
          const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
            CHAddress
          );
          ChickenHouseInstance.getStoreMenu().then(menus => {
            console.log("---- get store menus from ETH ----");
            console.log(menus);

            // for (let i = 0; i < result._chickens.length; i++) {
            //   this.room.menus.push({
            //     chicken: result._chickens[i],
            //     price: `${result._prices[i]}`,
            //     description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
            //     selected: false
            //   });
            // }
            menus.forEach(menu => {
              this.room.menus.push({
                ...menu,
                description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
                selected: false
              });
            });

            console.log(this.room.menus);
          });
        }
      );

      // storeIdx (if needed)
      console.log("=== Done Create Order Room ===");
    },
    /* ============= 주문방 보여주기 함수 ============= */
    async showOrderRooms(event, flag = false) {
      console.log("=== Show Order Rooms ===");

      // if (flag) {
      //   this.navDrawer.storeName = event;
      // } else {
      //   event.preventDefault();
      //   this.setDrawer(true);
      //   this.navDrawer.storeName = event.target.id;
      // }
      event.preventDefault();
      // 이미 열려있는가게일 경우...
      if (this.drawer && event.target.id === this.navDrawer.storeName) {
        return;
      }

      // 주문방보기 요청, 이전에 존재한 iw 는 지운다.
      if (this.drawer && this.navDrawer.storeName) {
        this.markerDatas.forEach((markerData, idx) => {
          if (markerData.storeName === this.navDrawer.storeName) {
            this.infowindows[idx].close();
            return;
          }
        });
      }
      this.setDrawer(true);
      this.navDrawer.orderRooms = [];

      this.navDrawer.storeName = event.target.id;

      /**** 새롭게 구조화 된 부분 *****/
      // 1. Chicken House 주소를 가져옴
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.navDrawer.storeName
      );
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
            console.log(result._startTime);
            console.log(result._finishTime);
            if (result._state === "1") {
              counts++;
              this.navDrawer.orderRooms.push({
                chickenName: result._chickenName,
                duration: +result._startTime + +result._finishTime * 60,
                price: result._price,
                show: false,
                description: "황금올리브 같이 먹을 분 구함!~",
                menuState: result._menuState,
                index: idx
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
      this.navDrawer.roomCount = counts;

      // Create Room Event Listener
      // 기존의 존재하는 리스너 해제
      if (roomCreatedEmitter) {
        console.log("--- roomCreatedEmitter Removed ---");
        roomCreatedEmitter.removeListener();
      }

      if (roomMatchedEmitter) {
        console.log("--- roomMatchedEmitter Removed ---");
        roomMatchedEmitter.removeListener();
      }

      roomCreatedEmitter = ChickenHouseInstance.watchIfCreated(
        (error, result) => {
          if (!error && this.drawer) {
            // this.addOrderRooms(result);
            const returns = result.returnValues;
            this.navDrawer.orderRooms.push({
              chickenName: returns._chickenName,
              duration: +returns._date + +returns._finish * 60,
              price: returns._price,
              show: false,
              description: "황금올리브 같이 먹을 분 구함!~",
              menuState: returns._menuState,
              index: Number(returns._roomNumber)
            });
            this.navDrawer.roomCount += 1;
          }
        }
      );
      roomMatchedEmitter = ChickenHouseInstance.watchIfMatched(
        (error, result) => {
          if (!error && this.drawer) {
            const roomIndex = result.returnValues._roomIndex;
            const length = this.navDrawer.orderRooms.length;
            for (let i = 0; i < length; i++) {
              if (this.navDrawer.orderRooms[i].index == roomIndex) {
                this.navDrawer.orderRooms.splice(i, 1);
                break;
              }
            }
            this.navDrawer.roomCount -= 1;
          }
        }
      );
      console.log("=== Done Show Order Room ===");
    },
    /* ============= 치킨집 지도 마커 생성 함수 ============= */
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

      this.infowindows.push(infowindow);
      console.log("---- Add click event on marker ----");
      // 마커에 마우스클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", () => {
        if (this.drawer) {
          // drawer가 열려 있다.
          this.markerDatas.forEach((_markerData, index) => {
            // 현재 열린 치킨집 이외에 마커 적용
            if (_markerData.storeName !== this.navDrawer.storeName) {
              // 열려있는 건 닫고, 눌린게 연다.
              if (_markerData.storeName === markerData.storeName) {
                // 열려있는 것은 닫고, 눌린게 열린다.
                if (markerData.removed) {
                  infowindow.open(this.map, marker);
                  markerData.removed = false;
                } else {
                  infowindow.close();
                  markerData.removed = true;
                }
              } else {
                if (!_markerData.removed) {
                  this.infowindows[index].close();
                  _markerData.removed = true;
                }
              }
            }
          });
        } else {
          // drawer가 닫혀 있다.
          this.markerDatas.forEach((_markerData, index) => {
            if (_markerData.storeName === markerData.storeName) {
              // 열려있는 것은 닫고, 눌린게 열린다.
              if (markerData.removed) {
                infowindow.open(this.map, marker);
                markerData.removed = false;
              } else {
                infowindow.close();
                markerData.removed = true;
              }
            } else {
              if (!_markerData.removed) {
                this.infowindows[index].close();
                _markerData.removed = true;
              }
            }
          });
        }
        this.map.panTo(markerPosition);
      });
    },
    /* ============= 마커 초기화 하기 ============= */
    async initMarkers() {
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
    /* ============= 지도 초기화 하기 ============= */
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
        this.initMarkers();
      }, console.log);
      console.log("=== Done Init Map ===");
    }
  },
  mounted() {
    console.log("=== Mounted Map.vue ===");
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
    console.log("--- listen event register store ---");
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
        this.map.setCenter(new kakao.maps.LatLng(latitude, longitude));
      } else {
        throw error;
      }
    });

    console.log("=== Done Mounted Map.vue ===");
  },
  created() {
    this.setDrawer(false);
    console.log("=== Created Map.vue ===");
    console.log("---- Set Window Size ----");
    const resizeWindow = function() {
      document.body.style.width = `${window.screen.width}px`;
      document.body.style.height = `${window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight}px`;
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    // console.log("---- Initialize kakao Object and Map Object ----");
    // if (window.kakao && window.kakao.maps) {
    //   this.initMap();
    // } else {
    //   const script = document.createElement("script");
    //   /* global kakao */
    //   script.onload = () => kakao.maps.load(this.initMap);
    //   script.src =
    //     "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f16dcaffdef9152c39799852d826d9c4&libraries=services";
    //   document.head.appendChild(script);
    // }
    console.log("=== Done Created Map.vue ===");
  },
  watch: {
    drawer(drawerState) {
      if (!drawerState) {
        console.log(drawerState);
        this.infowindows.forEach(iw => iw.close());
        this.markerDatas.forEach(md => (md.removed = true));
      }
    }
  }
};
</script>

<style>
html {
  margin: 0;
  padding: 0;
  overflow-y: auto;
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
  padding: 0;
  margin: 0;
  overflow: hidden; /* Hide scrollbars */
}

.container {
  width: 100%;
  /* padding: 12px; */
  padding: 0px;
  margin-right: auto;
  margin-left: auto;
}

#contents {
  position: absolute;
  top: 0%;
  z-index: 2;
}
</style>
