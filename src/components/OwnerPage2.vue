<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="text-h3 text--white">{{
        storeName
      }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn-toggle v-model="toggle_one">
        <v-btn
          class="text-h3 text--white"
          x-large
          @click="getOnOff"
          value="left"
          color="blue"
        >
          영업 시작
        </v-btn>
        <v-btn
          class="text-h3 text--white"
          @click="changeOnOff"
          x-large
          value="center"
          color="red"
        >
          영업 종료
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-btn class="text-h4 text--white" color="light-green">
        My Page
      </v-btn>
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
    </v-data-table> -->

    <!-- <v-btn
      class="text-h3 text--white"
      x-large
      @click="matchRoomEvent"
      value="left"
      color="blue"
    >
      event test button
    </v-btn> -->

    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="현재 들어온 주문 목록"
        class="px-5 py-2"
        flat
        outlined
      >
        <v-row row wrap>
          <v-col
            xs12
            sm6
            md4
            lg3
            v-for="orderRoom in orderRooms"
            :key="orderRoom.roomNumber"
          >
            <v-card flat outlined class="text-center">
              <v-card-text>
                <div class="text-h3">방번호 : {{ orderRoom.roomNumber }}</div>
                <br />
                <div class="text-h4">
                  메뉴 : {{ orderRoom.menu }} ({{ orderRoom.kind }})
                </div>
                <div class="text-h4">가격 : {{ orderRoom.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ma-2 text-h4"
                  color="primary"
                  @click="approveOrder(orderRoom.id)"
                >
                  <v-icon left> mdi-checkbox-marked-circle</v-icon>
                  <span>주문받기</span>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  class="ma-2 text-h4"
                  color="orange"
                  @click="orderReject(orderRoom.id)"
                >
                  <v-icon left> mdi-cancel</v-icon>
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
        <v-card
          flat
          v-for="orderedList in orderedLists"
          :key="orderedList.title"
        >
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
                @click="finishCook(orderedList.id)"
              >
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
      // OrderRoomInstance: contractInstance.getOrderRoomInstance(),

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
          value: "hash"
        }
      ],
      items: []
    };
  },
  computed: {
    storeName() {
      return this.$route.params.storeName;
    }
  },
  methods: {
    deleteOrderRoom() {
      var con_test = confirm("주의 : 한번 거절하시면 다시 받을 수 없습니다.");
      if (con_test == true) {
        this.orderRoom.splice(0, 1);
      } else if (con_test == false) {
      }
    },

    matchRoomEvent() {
      let self = this;
      this.AdminInstance.watchIfMatched((error, result) => {
        if (!error) {
          console.log("event2");
          console.log(result.returnValues._storeName);
          console.log(result);

          // 방법 1 (card 부분 전체 새로고침)
          // if (self.storeName == result.returnValues._storeName) {
          //   this.getOrderRooms();
          // }

          // 방법 3 (이벤트에서 치킨집 이름이랑, 방의 번호만을 이용해서 블록체인에서 원하는 방의 데이터를 가져오는 방법)
          let preResult = result;
          self.AdminInstance.getRoomInfo(
            self.storeName,
            preResult.returnValues._roomIndex
          )
            .then(result => {
              console.log(result);
              self.orderRooms.push({
                roomNumber: preResult.returnValues._roomIndex,
                menu: result.chicken,
                price: result.price,
                id: preResult.returnValues._roomIndex
              });
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    },

    testInstance() {
      this.AdminInstance.getStoreCount().then(count => {
        // resolve
        alert(`Store Counts : ${count}`);
      });
    },
    changeOnOff() {
      alert("확인을 누르시면 가게가 활성화 됩니다.");
      this.AdminInstance.changeOnOff(this.storeName);
    },
    getOnOff() {
      alert("확인을 누르시면 가게가 활성화 됩니다.");
      this.AdminInstance.getChickenHouse(this.storeName).then(number => {
        alert(`store switch : ${number.closed}`);
      });
    },

    async approveOrder(idx) {
      console.log("button IDX :" + idx);
      var con_test = confirm(
        "주의 : 주문을 받으시면 받으신 주문을 취소할수가 없습니다."
      );
      if (con_test == true) {
        await this.AdminInstance.approveOrder(this.storeName, idx);
        this.getOrderRooms();
        this.getOrderedLists();
      } else if (con_test == false) {
      }
    },

    async orderReject(idx) {
      console.log("button IDX :" + idx);
      var con_test = confirm("주의 : 한번 거절하시면 다시 받을 수 없습니다.");
      if (con_test == true) {
        await this.AdminInstance.orderReject(this.storeName, idx);
        this.getOrderRooms();
        this.getOrderedLists();
      } else if (con_test == false) {
      }
    },

    async finishCook(idx) {
      console.log("button IDX :" + idx);
      var con_test = confirm("주의 : 두명의 손님들이 다 가져가셨나요?");
      if (con_test == true) {
        await this.AdminInstance.orderReject(this.storeName, idx);
        this.getOrderedLists();
      } else if (con_test == false) {
      }
    },

    async getOrderRooms() {
      console.log("=== Show Order Rooms ===");

      const roomCount = await this.AdminInstance.getRoomsCount(this.storeName);

      console.log(`---- get Order Rooms Info, Counts: ${roomCount}`);
      this.orderRooms = [];
      for (let idx = 0; idx < roomCount; idx++) {
        await this.AdminInstance.getRoomInfo(this.storeName, idx)
          .then(result => {
            // console.log(result);
            if (result.state === "2") {
              this.orderRooms.push({
                roomNumber: idx,
                menu: result.chicken,
                price: result.price,
                id: idx
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
      console.log("=== Done Show Order Room ===");
    },
    async getOrderedLists() {
      console.log("=== Show Order Rooms ===");

      const roomCount = await this.AdminInstance.getRoomsCount(this.storeName);

      console.log(`---- get Order Rooms Info, Counts: ${roomCount}`);
      this.orderedLists = [];

      for (let idx = 0; idx < roomCount; idx++) {
        await this.AdminInstance.getRoomInfo(this.storeName, idx)
          .then(result => {
            // console.log(result);
            if (result.state === "3") {
              this.orderedLists.push({
                roomNumber: idx,
                kind: "순살",
                menu: result.chicken,
                time: "5시 17분",
                id: idx
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
      console.log("=== Done Show OrderedLists ===");
    }

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
    this.getOrderRooms();
    this.getOrderedLists();
  },

  mounted() {
    this.matchRoomEvent();
  }
};
</script>

<style>
.orderedList.순살 {
  border-left: 6px solid #faffca;
}
.orderedList.뼈 {
  border-left: 6px solid #f8a529;
}
</style>
