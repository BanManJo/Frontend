<template>
  <v-app>
    <v-toolbar color="primary">
      <v-toolbar-title class="text-h3 title_color">
        {{
        storeName
        }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn class="text-h3" x-large @click="changeOn" value="left" :color="onColor">영업 시작</v-btn>
      <v-btn
        class="text-h3 text--white"
        @click="changeOff"
        x-large
        value="right"
        :color="offColor"
      >영업 종료</v-btn>
      <v-spacer></v-spacer>
      <div>
        <router-link :to="`/ownerMyPage/${storeName}`">
          <v-btn class="text-h4 text--white" color="light-green">메뉴 수정 페이지</v-btn>
        </router-link>
      </div>
    </v-toolbar>

    <!-- <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.hash }}</td>
      </template>
    </v-data-table>-->

    <!-- <v-btn
      class="text-h3 text--white"
      x-large
      @click="matchRoomEvent"
      value="left"
      color="blue"
    >
      event test button
    </v-btn>-->

    <!-- <div class="text-h3" x-large value="left" :class="colorName + '_style'">
      영업 시작
    </div>-->

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
            <v-card flat outlined class="text-center" width="381">
              <v-card-text>
                <div class="text-h3">방번호 : {{ orderRoom.roomNumber }}</div>
                <br />
                <div class="text-h4">메뉴 : {{ orderRoom.menu }} ({{ orderRoom.kind }})</div>
                <div class="text-h4">가격 : {{ orderRoom.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="ma-2 text-h4" color="primary" @click="approveOrder(orderRoom.id)">
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  <span>주문받기</span>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn class="ma-2 text-h4" color="orange" @click="refundToBothUsers(orderRoom.id)">
                  <v-icon left>mdi-cancel</v-icon>
                  <span>거절하기</span>
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
              <v-btn fab small color="green" @click="finishCook(orderedList.id)">
                <v-icon color="white">mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-row>
          <v-divider></v-divider>
        </v-card>
      </base-material-card>
    </v-container>
  </v-app>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data
      onColor: "white",
      offColor: "white",
      clicked: true,

      // color1: "backgroundColor: blue",
      // color2: "backgroundColor: red",
      state: "",
      // text: "center",
      // icon: "justify",
      // toggle_none: null,
      // toggle_one: 0,
      // toggle_exclusive: 2,
      // toggle_multiple: [0, 1, 2],

      orderRooms: [],

      orderedLists: [],

      headers: [
        {
          text: "result",
          align: "center",
          sortable: false,
          value: "hash",
        },
      ],
      items: [],
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

          // 방법 3 (이벤트에서 치킨집 이름이랑, 방의 번호만을 이용해서 블록체인에서 원하는 방의 데이터를 가져오는 방법)

          let preResult = result;

          const ORAddress = await ChickenHouseInstance.findOrderRoom(
            preResult.returnValues._roomIndex
          );
          const OrderRoomInstance = await contractInstance.getOrderRoomInstance(
            ORAddress
          );
          OrderRoomInstance.getRoomInfo()
            .then((result) => {
              self.orderRooms.push({
                roomNumber: preResult.returnValues._roomIndex,
                menu: result._chickenName,
                price: result._price,
                id: preResult.returnValues._roomIndex,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },

    testInstance() {
      this.AdminInstance.getStoreCount().then((count) => {
        // resolve
        alert(`Store Counts : ${count}`);
      });
    },
    async changeOn() {
      alert("확인을 누르시면 가게가 영업을 시작합니다.");
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
      } else if (result._onOff == 1) {
        alert("현재 영업중인 상태 입니다.");
      }
    },

    async changeOff() {
      alert("확인을 누르시면 가게가 영업을 종료합니다.");
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
      } else if (result._onOff == 0) {
        alert("현재 영업이 종료된 상태 입니다.");
      }
    },

    async getOnOff() {
      alert("현재 장사 상태.");

      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);

      ChickenHouseInstance.getChickenHouse(this.storeName).then((number) => {
        alert(`store switch : ${number._onOff}`);
      });
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
        // month.substr(-2) +
        // "월 " +
        // day.substr(-2) +
        // "일 " +
        hour.substr(-2) +
        "시 " +
        minute.substr(-2) +
        "분 " +
        second.substr(-2) +
        "초 "
      );
    },

    async approveOrder(idx) {
      console.log("button IDX :" + idx);
      var con_test = confirm(
        "주의 : 주문을 받으시면 받으신 주문을 취소할수가 없습니다."
      );
      if (con_test == true) {
        const CHAddress = await this.AdminInstance.findChickenHouse(
          this.storeName
        );
        const ChickenHouseInstance =
          contractInstance.getChickenHouseInstance(CHAddress);
        await ChickenHouseInstance.approveOrder(this.storeName, idx);
        this.getOrderRooms();
        this.getOrderedLists();
      } else if (con_test == false) {
      }
    },

    async refundToBothUsers(idx) {
      console.log("button IDX :" + idx);

      var con_test = confirm(
        "주의 : 거절하시면 자동으로 환불되며 다시 같은 주문을 받을 수 없습니다."
      );
      if (con_test == true) {
        const CHAddress = await this.AdminInstance.findChickenHouse(
          this.storeName
        );
        const ChickenHouseInstance =
          await contractInstance.getChickenHouseInstance(CHAddress);
        await ChickenHouseInstance.refundToBothUsers(idx);
        this.getOrderRooms();
        this.getOrderedLists();
      } else if (con_test == false) {
      }
    },

    async finishCook(idx) {
      console.log("button IDX :" + idx);
      var con_test = confirm("주의 : 두명의 손님들이 다 가져가셨나요?");
      if (con_test == true) {
        const CHAddress = await this.AdminInstance.findChickenHouse(
          this.storeName
        );
        const ChickenHouseInstance =
          contractInstance.getChickenHouseInstance(CHAddress);

        await ChickenHouseInstance.finishCook(idx);
        this.getOrderedLists();
      } else if (con_test == false) {
      }
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
      } else if (result._onOff == 1) {
        this.onColor = "blue";
        this.offColor = "white";
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
              this.orderRooms.push({
                roomNumber: idx,
                menu: result._chickenName,
                price: result._price,
                id: idx,
              });
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
              this.orderedLists.push({
                roomNumber: idx,
                kind: "순살",
                menu: result._chickenName,
                time: this.Unix_timestamp(result._receiveTime),
                id: idx,
              });
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
    console.log(`=== Created OwnerPage2 ${this.storeName} ===`);
    this.getOnOff();
    this.getOrderRooms();
    this.getOrderedLists();
  },

  mounted() {
    this.matchRoomEvent();
  },
};
</script>

<style>
.orderedList.순살 {
  border-left: 6px solid #faffca;
}
.orderedList.뼈 {
  border-left: 6px solid #f8a529;
}
/* .button1 {
  background-color: blue;
}
.button2 {
  background-color: red;
}
*/
.title_color {
  color: white;
}
.blue_style {
  background-color: blue;
}
</style>
