<template>
  <v-app>
    <v-app-bar id="app-bar" absolute app outlined color="
   #f5f5f5" elevation="1" flat>
      <v-toolbar-title class="text-h3 font-weight-bold">반 만 조</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field :label="$t('search')" color="secondary" hide-details>
        <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
          <v-btn class="mt-n2" small text>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <v-btn class="ml-2 text-h4" min-width="0" text @click="setCurrentPos">
        <v-icon large :color="showWhereUserIs ? 'yellow darken-2' : 'black'">mdi-crosshairs-gps</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn class="ml-2 text-h4" min-width="0" text @click="registerCH.dialog = true">
        치킨집 등록
        <v-icon>mdi-store-plus</v-icon>
      </v-btn>
      <v-btn class="ml-2 text-h4" min-width="0" text @click="readRoomInfo">
        내 주문 현황
        <v-icon>mdi-account-check</v-icon>
      </v-btn>
      <v-btn class="ml-2 text-h4" min-width="0" text @click="test">
        알림
        <v-icon>mdi-alert-circle</v-icon>
      </v-btn>
      <v-btn class="ml-2 text-h4" min-width="0" text @click="$router.go()">
        새로고침
        <v-icon>mdi-autorenew</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Map -->
    <v-main>
      <div id="map"></div>
    </v-main>
    <!-- Navigation Drawer -->
    <order-room-navigation-drawer :navDrawer="navDrawer" @createOrderRoom="createOrderRoom"></order-room-navigation-drawer>
    <!-- modal -->
    <create-room-dialog :room="room"></create-room-dialog>
    <register-chicken-house-dialog :registerCH="registerCH"></register-chicken-house-dialog>
    <user-my-page :userPageInfo="userPageInfo"></user-my-page>

    <base-material-snackbar
      v-model="snackbar"
      :type="color"
      v-bind="{
        bottom: true,
        center: true,
        timeout: 5000
      }"
    >
      <span class="font-weight-bold text-h4">{{ snackbarTitle }}</span>
      <span class="font-weight-bold text-h4">{{ snackbarContent }}</span>
    </base-material-snackbar>
    <base-material-snackbar
      v-model="$store.state.snackbar"
      :type="$store.state.type"
      v-bind="{
        top: true,
        right: true
      }"
    >
      <span class="font-weight-bold text-h4">{{ $store.state.title }}</span>
      <span class="text-h4">— {{ $store.state.content }}</span>
    </base-material-snackbar>
  </v-app>
</template>

<script>
// Utilities
import { mapState, mapMutations, mapGetters } from "vuex";

// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

// Info Window
import MakeInfoWindow from "../utils/info_window";

// store Imge
// import storeImg from "../img/storeImg3.png";
import storeImg from "../img/치킨로고4.png";

let roomCreatedEmitter;
let roomMatchedEmitter;

let timeInterval = null;
export default {
  name: "map",
  // store,
  components: {
    RegisterChickenHouseDialog: () =>
      import("./RegisterChickenHouseDialog.vue"),
    CreateRoomDialog: () => import("./CreateRoomDialog"),
    OrderRoomNavigationDrawer: () => import("./OrderRoomNavigationDrawer"),
    UserMyPage: () => import("./UserMyPage.vue"),
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
        orderRooms: [],
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
        timer: 15,
      },
      registerCH: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      },
      userPageInfo: {
        modal: false,
        // currentOrders: [],
        orderingLists: [],
        orderedLists: [],
        timer: 0,
      },
      showWhereUserIs: true,
      userMarker: null,
      chickenStore: "교촌치킨 가산점",
      snackbar: false,
      color: "info",
      snackbarTitle: "",
      snackbarContent: "",
    };
  },
  computed: {
    ...mapGetters(["timeout"]),
    ...mapState({
      drawer: (state) => state.OrderRoomDrawer.drawer,
      timer: (state) => state.myCounterInterval,
    }),
    lastRegisteredStoreName() {
      const length = this.markerDatas.length;
      if (length !== 0) {
        return this.markerDatas[length - 1].storeName;
      }
      return "";
    },
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
    test() {
      console.log("test");
      this.snackbar = true;
    },
    async onOffEvent(ChickenHouseInstance) {
      ChickenHouseInstance.watchIfOn(async (error, result) => {
        if (!error) {
          console.log(result);
          let chickenStore = result.returnValues._storeName;
          if (result.returnValues.onOff == 1) {
            this.snackbarContent = chickenStore + "  영업 개시 ~";
            this.snackbarTitle = null;
            this.color = "indigo";
            this.snackbar = true;
          }
          //  else if (result.returnValues.onOff == 2) {
          //   this.chickenStore = result.returnValues._storeName;
          //   this.snackbars = true;
          //   return;
          // }
          // marker window를 찾자
          this.markerDatas.forEach((markerData, idx) => {
            if (markerData.storeName === chickenStore) {
              markerData.onOff = result.returnValues.onOff;
              this.createMarker(markerData);
              this.infowindows[idx].close();
              this.infowindows[idx] = this.infowindows.pop();
              return;
            }
          });
        }
      });
    },
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
        (CHAddress) => {
          console.log(CHAddress);
          const ChickenHouseInstance =
            contractInstance.getChickenHouseInstance(CHAddress);
          ChickenHouseInstance.getStoreMenu().then((menus) => {
            console.log("---- get store menus from ETH ----");
            console.log(menus);

            menus.forEach((menu) => {
              this.room.menus.push({
                ...menu,
                description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
                selected: false,
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
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);

      // 3. 해당 Chicken House의 방 개수를 가져옴
      const roomCount = await ChickenHouseInstance.getRoomsCount();

      // 4. 같은 로직 실행
      console.log(`---- get Order Rooms Info, Counts: ${roomCount}`);

      let counts = 0;
      for (let idx = 0; idx < roomCount; idx++) {
        // 5. OrderRoom 주소를 가져옴
        const ORAddress = await ChickenHouseInstance.findOrderRoom(idx);
        // 6. OrderRoom 인스턴스 생성
        const OrderRoomInstance =
          contractInstance.getOrderRoomInstance(ORAddress);
        const balance = await OrderRoomInstance.getBalance();
        console.log(`====== room;s balance ${balance} =====`);
        await OrderRoomInstance.getRoomInfo()
          .then((result) => {
            console.log(result);
            console.log(result._startTime);
            console.log(result._finishTime);
            const duration = +result._startTime + +result._finishTime * 60;

            if (
              result._state === "1" &&
              duration > Math.floor(Date.now() / 1000)
            ) {
              counts++;
              this.navDrawer.orderRooms.push({
                chickenName: result._chickenName,
                duration: duration,
                price: result._price,
                show: false,
                description: "황금올리브 같이 먹을 분 구함!~",
                menuState: result._menuState,
                index: idx,
              });
            }
          })
          .catch((error) => {
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
          if (
            !error &&
            this.drawer &&
            this.navDrawer.storeName === result.returnValues._storeName
          ) {
            // this.addOrderRooms(result);
            const returns = result.returnValues;
            this.navDrawer.orderRooms.push({
              chickenName: returns._chickenName,
              duration: +returns._date + +returns._finish * 60,
              price: returns._price,
              show: false,
              description: "황금올리브 같이 먹을 분 구함!~",
              menuState: returns._menuState,
              index: Number(returns._roomNumber),
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
    /* ============= 마이페이지 정보 불러오기 함수 ============= */
    async readRoomInfo() {
      try {
        this.userPageInfo.modal = true;
        this.userPageInfo.orderingLists = [];
        this.userPageInfo.orderedLists = [];
        this.AdminInstance.getStoreCount().then(async (val) => {
          console.log(
            `---- get Each Chicken House Infos by idx, Counts: ${val} ----`
          );
          for (let idx = 0; idx < val; idx++) {
            // idx를 통해 chicken House를 바로 가져옴..
            const CHAddress = await this.AdminInstance.findChickenHouseByIndex(
              idx
            );
            const ChickenHouseInstance =
              contractInstance.getChickenHouseInstance(CHAddress);
            // console.log("pass");
            this.watchEventApprovedOrRejected(ChickenHouseInstance);
            ChickenHouseInstance.roomCreated(async (error, result2) => {
              // console.log(result2);
              for (let idx = 0; idx < result2.length; idx++) {
                const eventReturns = result2[idx].returnValues;
                // 5. OrderRoom 주소를 가져옴
                const ORAddress = await ChickenHouseInstance.findOrderRoom(
                  eventReturns._roomNumber
                );
                // 6. OrderRoom 인스턴스 생성
                const OrderRoomInstance =
                  contractInstance.getOrderRoomInstance(ORAddress);
                const result = await OrderRoomInstance.getStateRoom();
                // 시간 나타내는 구문
                this.userPageInfo.orderingLists.push({
                  storeName: eventReturns._storeName,
                  menu: eventReturns._chickenName,
                  price: eventReturns._price,
                  roomNumber: eventReturns._roomNumber,
                  state: result,
                  date: eventReturns._date,
                });
              }
            });

            ChickenHouseInstance.matchFinish(async (error, result3) => {
              for (let idx = 0; idx < result3.length; idx++) {
                const ORAddress = result3[idx].returnValues.orderRoom;

                // 6. OrderRoom 인스턴스 생성
                const OrderRoomInstance =
                  contractInstance.getOrderRoomInstance(ORAddress);
                const matched = await OrderRoomInstance.getRoomInfo();

                this.userPageInfo.orderingLists.push({
                  storeName: result3[idx].returnValues._storeName,
                  menu: matched._chickenName,
                  price: matched._price,
                  roomNumber: result3[idx].returnValues._roomIndex,
                  state: matched._state,
                  date: matched._startTime,
                });
              }
            });
          }
        });
      } catch (e) {
        this.error = e.message;
      }
    },
    /* ============= 치킨집 지도 마커 생성 함수 ============= */
    watchEventApprovedOrRejected(storeInstance) {
      const callback = async (error, result) => {
        if (!error) {
          console.log("========= watchEventApprovedOrRejected ==========");
          const returns = result.returnValues;
          console.log(returns);
          let index = 0;
          for (let i = 0; i < this.userPageInfo.orderingLists.length; i++) {
            if (this.userPageInfo.orderingLists[i].state === "2") {
              index = i;
              break;
            }
          }

          if (
            returns._roomIndex !==
            this.userPageInfo.orderingLists[index].roomNumber
          ) {
            return;
          }

          console.log(index);
          this.userPageInfo.orderingLists[index].state = returns._state;

          // 시간 나타내는 구문
          // vuex alert!
          // this.snackbar = true;
          // if (returns._state === "3") {
          //   this.color = "success";
          //   this.snackbarTitle = "주문방 승인";
          //   this.snackbarContent = `요청하신 주문방 ${returns._roomIndex}번이 현재 승인 되었습니다! 치킨을 픽업해주세요!`;
          // } else {
          //   this.color = "error";
          //   this.snackbarTitle = "주문방 거절";
          //   this.snackbarContent = `요청하신 주문방 ${returns._roomIndex}번이 사장님의 사정으로 거절 되었습니다! 다음에 다시 요청해주세요..!`;
          // }
        } else {
          console.log(error);
        }
      };
      storeInstance.watchIfApproved(callback);
      storeInstance.watchIfRejected(callback);
    }, //주문취소하기 버튼
    /* ============= 치킨집 지도 마커 생성 함수 ============= */
    createMarker(markerData) {
      const imageSrc = storeImg,
        imageSize = new kakao.maps.Size(96, 96),
        imageOption = { offset: new kakao.maps.Point(27, 50) };

      const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(
          markerData.latitude,
          markerData.longitude
        );

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);

      // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
      console.log("---- call make Info Window func ----");
      const geocoder = new kakao.maps.services.Geocoder();

      const callback = (result, status) => {
        console.log(status);
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0]);
          const address = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          const iwContent = MakeInfoWindow(
            markerData,
            this.createOrderRoom,
            this.showOrderRooms,
            address
          );
          const iwRemoveable = false;
          // 인포윈도우를 생성합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          this.infowindows.push(infowindow);
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
            this.map.getLevel() >= 8 ? this.map.setLevel(5) : null;
            this.map.panTo(markerPosition);
          });
        }
      };
      geocoder.coord2Address(
        markerPosition.getLng(),
        markerPosition.getLat(),
        callback
      );
      console.log("---- Add click event on marker ----");
      // 마커에 마우스클릭 이벤트를 등록합니다
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
        .then(async (val) => {
          console.log(
            `---- get Each Chicken House Infos by idx, Counts: ${val} ----`
          );
          for (let idx = 0; idx < val; idx++) {
            // idx를 통해 chicken House를 바로 가져옴..
            const CHAddress = await this.AdminInstance.findChickenHouseByIndex(
              idx
            );
            const ChickenHouseInstance =
              contractInstance.getChickenHouseInstance(CHAddress);

            // onOff 감지 event 실행
            this.onOffEvent(ChickenHouseInstance);

            await ChickenHouseInstance.getChickenHouse().then(
              async (result) => {
                const _orderCount = await ChickenHouseInstance.getRoomsCount();
                console.log(result);
                this.markerDatas.push({
                  latitude: Number(result._latitude),
                  longitude: Number(result._longitude),
                  removed: true,
                  storeName: result._storeName,
                  orderCount: _orderCount,
                  onOff: result._onOff,
                });
              }
            );
          }
          console.log("---- markerDatas setting on map ----");
          console.log(this.markerDatas);
          this.markerDatas.forEach((markerData) => {
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
      navigator.geolocation.getCurrentPosition((position) => {
        // const imageSrc = storeImg,
        //   imageSize = new kakao.maps.Size(24, 24),
        //   imageOption = { offset: new kakao.maps.Point(0, 0) };

        // const markerImage = new kakao.maps.MarkerImage(
        //     imageSrc,
        //     imageSize,
        //     imageOption
        //   ),
        const _position = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // 유저 현위치 마커를 생성합니다
        this.userMarker = new kakao.maps.Marker({
          position: _position,
          // image: markerImage,
        });

        // 지도 객체 초기화
        const options = {
          center: _position,
          level: 3,
        };

        this.map = new kakao.maps.Map(container, options);

        this.userMarker.setMap(this.map);
        console.log("---- call create marker func ----");
        this.initMarkers();
      }, console.log);
      console.log("=== Done Init Map ===");
    },
    setCurrentPos() {
      this.showWhereUserIs = !this.showWhereUserIs;
      if (this.showWhereUserIs) {
        navigator.geolocation.getCurrentPosition((position) => {
          const _position = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          // this.map.setLevel(3);

          this.userMarker.setPosition(_position);
          this.map.panTo(_position);
          this.userMarker.setVisible(true);
          console.log("---- find where user is ----");
        }, console.log);
      } else {
        this.userMarker.setVisible(false);
      }
    },
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
          orderCount: 0,
          onOff: 0,
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
    this.setDrawer(false);
  },
  beforeCreate() {
    this.AdminInstance = contractInstance.getAdminInstance();
    this.AdminInstance.storeNameOfOwner()
      .then((storeName) => {
        if (storeName) {
          console.log(storeName);
          this.$router.push({
            name: "OwnerPage",
            params: { storeName: storeName },
          });
        }
      })
      .catch(console.log);
  },
  watch: {
    drawer(drawerState) {
      if (!drawerState) {
        console.log(drawerState);
        this.infowindows.forEach((iw) => iw.close());
        this.markerDatas.forEach((md) => (md.removed = true));
      }
    },
    timeout: function (val) {
      if (val) {
        this.$store.commit("SNACKBAR_ALERT", {
          title: "매칭 실패",
          content:
            "방의 만료시간이 지나 매칭종료합니다. 주문취소 버튼을 눌러 환불 받아주세요.",
          type: "error",
        });
        this.$store.commit("STOP_TIMER");
        // this.snackbar = true;
        // this.color = "warning";
        // this.snackbarTitle = "매칭하는 인원이 없습니다.";
        // this.snackbarContent =
        //   "방의 만료시간이 지나 매칭종료합니다.주문취소버튼을 눌러 환불 받아주세요.";
      }
    },
  },
};
</script>

<style scoped>
html {
  margin: 0;
  padding: 0;
}
body {
  position: relative;
  overflow-y: hidden;
}

#map {
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  padding: 0;
  margin: 0;
}

.container {
  padding: 0px;
}

#contents {
  position: absolute;
  z-index: 3;
}
</style>
