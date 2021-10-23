<template>
  <v-app style="
    background: #f5f5f5;">
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
      <v-toolbar-title class="text-h3 font-weight-bold">{{ storeName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link :to="`/OwnerPage/${storeName}`">
        <v-btn class="ml-2 text-h4" min-width="0" text>
          주문 관리
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
      </router-link>
      <router-link :to="`/OwnerMyPage/${storeName}`">
        <v-btn class="ml-2 text-h4" min-width="0" text>
          메뉴 관리
          <v-icon>mdi-animation</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <br />
    <br />
    <br />
    <br />
    <v-container class="mb-12 text-center">
      <v-btn
        class="text-h3"
        @click="
          isOn
            ? () => {
                return;
              }
            : changeOnOffBtnClicked()
        "
        value="left"
        :color="onColor"
        flat
      >
        <v-icon large>mdi-airplane-takeoff</v-icon>영업 시작
      </v-btn>
      <v-btn
        class="text-h3 text--white"
        @click="
          isOn
            ? changeOnOffBtnClicked()
            : () => {
                return;
              }
        "
        value="right"
        :color="offColor"
        flat
      >
        영업 종료
        <v-icon large>mdi-airplane-landing</v-icon>
      </v-btn>
    </v-container>

    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="현재 들어온 주문 목록"
        class="px-5 py-2"
        flat
        outlined
      >
        <v-row row wrap>
          <v-col v-for="orderRoom in orderRooms" :key="orderRoom.roomNumber" sm="8" md="4" lg="4">
            <v-card flat outlined class="text-center">
              <v-card-text>
                <div class="text-h3">방번호 : {{ orderRoom.roomNumber }}</div>
                <br />
                <div class="text-h4">메뉴 : {{ orderRoom.menu }} / {{ orderRoom.kind }}</div>
                <div class="text-h4">가격 : {{ orderRoom.price }} ether</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ma-2 text-h4"
                  color="primary"
                  :id="orderRoom.roomNumber"
                  v-text="'주문받기'"
                  @click="approveBtnClicked"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  class="ma-2 text-h4"
                  color="orange"
                  :id="orderRoom.roomNumber"
                  v-text="'거절하기'"
                  @click="declineBtnClicked"
                >
                  <v-icon left>mdi-cancel</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </base-material-card>
    </v-container>

    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="내가 받은 주문 목록"
        class="px-5 py-3"
        flat
        outlined
      >
        <v-card flat v-for="orderedList in orderedLists" :key="orderedList.title">
          <v-row row wrap :class="`pa-3 orderedList ${orderedList.kind}`">
            <v-col xs12 md5>
              <div class="caption grey--text">주문 받은 시간</div>
              <div>{{ orderedList.time }}</div>
            </v-col>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">종류</div>
              <div>{{ orderedList.kind }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">메뉴</div>
              <div>{{ orderedList.menu }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">방번호</div>
              <div>{{ orderedList.roomNumber }}</div>
            </v-flex>

            <div class="text-xs-center">
              <v-btn
                fab
                small
                color="green"
                :id="orderedList.roomNumber"
                @click="finishBtnClicked()"
              >
                <v-icon color="white">mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-row>
          <v-divider></v-divider>
        </v-card>
      </base-material-card>
    </v-container>

    <alert-dialog :content="content" :alert="alert" v-on:confirm="confirm"></alert-dialog>

    <base-material-snackbar
      v-model="snackbar"
      type="success"
      v-bind="{
        bottom: true,
        center: true,
        timeout: 5000
      }"
    >
      <span class="text-h4 font-weight-medium text-center">주문이 들어왔습니다.</span>
    </base-material-snackbar>
  </v-app>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  components: {
    AlertDialog: () => import("./AlertDialog.vue"),
  },
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data
      onColor: "white",
      offColor: "white",
      clicked: true,

      state: "",

      orderRooms: [],
      orderedLists: [],

      items: [],
      onOffAlert: false,
      approveAlert: false,
      declineAlert: false,
      finishAlert: false,
      isOn: true,
      onOff: "시작",
      snackbar: false,
      index: 0,
      alert: {
        modal: false,
      },
      content: "",
      flag: 0,
    };
  },
  computed: {
    storeName() {
      return this.$route.params.storeName;
    },
  },
  methods: {
    deleteOrderRoom() {
      var con_test = confirm("주의 : 한번 거절하시면 다시 받을 수 없습니다.");
      if (con_test == true) {
        this.orderRoom.splice(0, 1);
      } else if (con_test == false) {
      }
    },

    async matchRoomEvent() {
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        await contractInstance.getChickenHouseInstance(CHAddress);
      let self = this;
      ChickenHouseInstance.watchIfMatched(async (error, result) => {
        if (!error) {
          console.log("event2");
          console.log(result);

          let preResult = result;

          const ORAddress = await ChickenHouseInstance.findOrderRoom(
            preResult.returnValues._roomIndex
          );
          const OrderRoomInstance = await contractInstance.getOrderRoomInstance(
            ORAddress
          );
          OrderRoomInstance.getRoomInfo()
            .then((result) => {
              if (result._menuState === "2") {
                self.orderRooms.push({
                  roomNumber: preResult.returnValues._roomIndex,
                  menu: result._chickenName,
                  kind: "순살",
                  price: result._price,
                  id: preResult.returnValues._roomIndex,
                });
              } else if (result._menuState === "1") {
                self.orderRooms.push({
                  roomNumber: preResult.returnValues._roomIndex,
                  menu: result._chickenName,
                  kind: "뼈",
                  price: result._price,
                  id: preResult.returnValues._roomIndex,
                });
              }
              this.snackbar = true;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    confirm() {
      console.log(this.flag);
      if (this.flag == 0) {
        if (this.isOn) {
          this.changeOff();
        } else {
          this.changeOn();
        }
      } else if (this.flag == 1) {
        this.approveOrder();
      } else if (this.flag == 2) {
        this.refundToBothUsers();
      } else if (this.flag == 3) {
        this.finishCook();
      }
      return;
    },
    changeOnOffBtnClicked() {
      console.log("click");
      // this.onOffAlert = true;
      this.alert.modal = true;
      this.content = `확인을 누르시면 영업을 ${
        this.isOn ? "종료" : "시작"
      }합니다.`;
      this.flag = 0;
    },
    approveBtnClicked(event) {
      this.alert.modal = true;
      this.content =
        "주의 : 주문을 받으시면 받으신 주문을 취소할수가 없습니다.";
      // this.approveAlert = true;
      this.flag = 1;
      this.index = event.target.id;
    },
    declineBtnClicked(event) {
      // this.declineAlert = true;
      this.alert.modal = true;
      this.content = "주의 ! : 한번 거절하시면 다시 받을 수 없습니다.";
      this.flag = 2;
      this.index = event.target.id;
    },
    finishBtnClicked(event) {
      // this.finishAlert = true;
      this.alert.modal = true;
      this.content = "주의 : 두명의 손님들이 다 가져가셨나요?";
      this.flag = 3;
      this.index = event.target.id;
    },
    async changeOn() {
      // alert("확인을 누르시면 가게가 영업을 시작합니다.");
      // this.onOffAlert = true;
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);
      const result = await ChickenHouseInstance.getChickenHouse();
      if (result._onOff == 0) {
        await ChickenHouseInstance.changeOnOff();
        this.onColor = "blue";
        this.offColor = "white";
        this.isOn = true;
        // this.onOffAlert = false;
        this.alert.modal = false;
      } else if (result._onOff == 1) {
        alert("현재 영업중인 상태 입니다.");
      }
      this.onOff = "종료";
    },

    async changeOff() {
      // alert("확인을 누르시면 가게가 영업을 종료합니다.");
      // this.onOffAlert = true;
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);
      const result = await ChickenHouseInstance.getChickenHouse();
      if (result._onOff == 1) {
        await ChickenHouseInstance.changeOnOff();
        this.onColor = "white";
        this.offColor = "red";
        this.isOn = false;
        // this.onOffAlert = false;
        this.alert.modal = false;
      } else if (result._onOff == 0) {
        // alert("현재 영업이 종료된 상태 입니다.");
      }
      this.onOff = "시작";
    },

    Unix_timestamp(t) {
      var date = new Date(t * 1000);
      var year = date.getFullYear();
      var month = "0" + (date.getMonth() + 1);
      var day = "0" + date.getDate();
      var hour = "0" + date.getHours();
      var minute = "0" + date.getMinutes();
      var second = "0" + date.getSeconds();
      return (
        hour.substr(-2) +
        "시 " +
        minute.substr(-2) +
        "분 " +
        second.substr(-2) +
        "초 "
      );
    },

    async approveOrder() {
      console.log("button IDX :" + this.index);

      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);
      ChickenHouseInstance.approveOrder(this.storeName, this.index).then(
        (hash) => {
          const message = {
            key: "ROOM-APPROVED",
            storeName: this.storeName,
            roomNumber: this.index,
            state: "3",
          };
          this.$socket.send(JSON.stringify(message));
          this.getOrderRooms();
          this.getOrderedLists();
        }
      );
      // this.approveAlert = false;
      this.alert.modal = false;
    },

    async refundToBothUsers() {
      console.log("button IDX :" + this.index);

      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        await contractInstance.getChickenHouseInstance(CHAddress);
      ChickenHouseInstance.refundToBothUsers(this.index).then((hash) => {
        const message = {
          key: "ROOM-DENIED",
          storeName: this.storeName,
          roomNumber: this.index,
          state: "4",
        };
        this.$socket.send(JSON.stringify(message));
        this.getOrderRooms();
        this.getOrderedLists();
      });
      // this.declineAlert = false;
      this.alert.modal = false;
    },

    async finishCook() {
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);

      await ChickenHouseInstance.finishCook(this.index);
      this.getOrderedLists();
      // this.finishAlert = false;
      this.alert.modal = false;
    },

    async getOnOff() {
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);
      const result = await ChickenHouseInstance.getChickenHouse();
      console.log(result);
      if (result._onOff == 0) {
        this.onColor = "white";
        this.offColor = "red";
        this.isOn = false;
      } else if (result._onOff == 1) {
        this.onColor = "blue";
        this.offColor = "white";
        this.isOn = true;
      }
    },

    async getOrderRooms() {
      console.log("=== Show OrderRooms (state = 2) ===");

      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);

      const roomCount = await ChickenHouseInstance.getRoomsCount();

      console.log(`---- get OrderRooms Info (state = 2), Counts: ${roomCount}`);
      this.orderRooms = [];
      for (let idx = 0; idx < roomCount; idx++) {
        const ORAddress = await ChickenHouseInstance.findOrderRoom(idx);
        const OrderRoomInstance =
          contractInstance.getOrderRoomInstance(ORAddress);

        await OrderRoomInstance.getRoomInfo()
          .then((result) => {
            if (result._state === "2") {
              if (result._menuState === "2") {
                this.orderRooms.push({
                  roomNumber: idx,
                  menu: result._chickenName,
                  kind: "순살",
                  price: result._price,
                  id: idx,
                });
              } else if (result._menuState === "1") {
                this.orderRooms.push({
                  roomNumber: idx,
                  menu: result._chickenName,
                  kind: "뼈",
                  price: result._price,
                  id: idx,
                });
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      console.log("=== Done Show OrderRoom (state = 2) ===");
    },
    async getOrderedLists() {
      console.log("=== Show OrderedLists (state = 3) ===");
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);
      const roomCount = await ChickenHouseInstance.getRoomsCount();

      console.log(
        `---- get OrderedLists Info (state = 3), Counts: ${roomCount}`
      );
      this.orderedLists = [];

      for (let idx = 0; idx < roomCount; idx++) {
        const ORAddress = await ChickenHouseInstance.findOrderRoom(idx);
        const OrderRoomInstance =
          contractInstance.getOrderRoomInstance(ORAddress);
        await OrderRoomInstance.getRoomInfo()
          .then((result) => {
            // console.log(result);
            if (result._state === "3") {
              if (result._menuState === "2") {
                this.orderedLists.push({
                  roomNumber: idx,
                  kind: "순살",
                  menu: result._chickenName,
                  time: this.Unix_timestamp(result._receiveTime),
                  id: idx,
                });
              } else if (result._menuState === "1") {
                this.orderedLists.push({
                  roomNumber: idx,
                  kind: "뼈",
                  menu: result._chickenName,
                  time: this.Unix_timestamp(result._receiveTime),
                  id: idx,
                });
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      console.log("=== Done Show OrderedLists (state = 3) ===");
    },

    // async matchRoomEvent5() {
    //   alert("김현수");
    //   try {
    //     this.AdminInstance.watchIfmatched((error, result) => {
    //       if (!error) {
    //         console.log("event2");
    //         console.log(result);
    //         console.log(result.returnValues);
    //         this.items.push({ hash: result.returnValues._chickenName });
    //         this.$socket.send(JSON.stringify(result));
    //       }
    //     });
    //     await this.AdminInstance.matchRoom("가산점", 0);
    //   } catch (e) {
    //     this.error = e.message;
    //   }
    // }
  },
  created() {
    console.log(`=== Created OwnerPage ${this.storeName} ===`);
    this.getOnOff();
    this.getOrderRooms();
    this.getOrderedLists();
  },

  mounted() {
    this.matchRoomEvent();
  },
};
</script>

<style scoped>
.orderedList.순살 {
  border-left: 6px solid #faffca;
}
.orderedList.뼈 {
  border-left: 6px solid #f8a529;
}
</style>
