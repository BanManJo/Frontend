<template>
  <v-app
    style="
    background: #f5f5f5;"
  >
    <!-- <child-component v-on:update="getResiterMenu"></child-component> -->
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
      <v-toolbar-title class="text-h3 font-weight-light">
        나의 주문 목록</v-toolbar-title
      >

      <v-spacer />
      <v-btn class="ml-2 text-h4" min-width="0" text to="/map">
        주문 현황
        <v-icon>mdi-account-check</v-icon>
      </v-btn>
      <v-btn class="ml-2 text-h4" min-width="0" text to="/map">
        알림
        <v-icon>mdi-alert-circle</v-icon>
      </v-btn>
      <v-btn class="ml-2 text-h4" min-width="0" text to="/map">
        지도
        <v-icon>mdi-arrow-expand-all</v-icon>
      </v-btn>
    </v-app-bar>

    <br />
    <br />
    <br />
    <br />

    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <base-material-card color="success" title=" " class="px-5 py-3">
          <v-card v-if="orderingLists.length != 0">
            <v-row justify="space-around" class="mb-2">
              &nbsp; &nbsp; &nbsp; &nbsp;
              <v-chip
                class="ma-2"
                color="green"
                label
                text-color="white"
                x-large
              >
                <v-icon size="30" right>mdi-home</v-icon>&nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp;
                <span class="matching">
                  방번호 &nbsp; :&nbsp;
                  {{ orderingLists[0].roomNumber }}
                </span>
              </v-chip>
              <v-spacer></v-spacer>

              <v-chip
                class="ma-2"
                color="green"
                label
                text-color="white"
                x-large
              >
                <v-icon size="30" right>mdi-widgets</v-icon>&nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp;
                <span class="matching">{{ orderingLists[0].state }}</span>
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip
                class="ma-2"
                color="green"
                label
                text-color="white"
                x-large
              >
                <v-icon size="30" right>mdi-clock</v-icon>&nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp;
                <span class="matching">
                  만료시간 &nbsp; :&nbsp;
                  <!-- {{ orderedLists1.finish }}{{ orderedLists2.finish }} -->
                  {{ timeout ? "00:00" : Duration }}
                </span>
              </v-chip>
              &nbsp; &nbsp; &nbsp; &nbsp;
            </v-row>
            <v-card-title>
              <div>
                <span class="blackText">
                  가게이름 &nbsp; : &nbsp;{{ orderingLists[0].storeName }}
                </span>
                <br />
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <span class="blackText">
                  치킨메뉴 &nbsp; : &nbsp;{{ orderingLists[0].menu }}
                </span>
                <br />
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <span class="blackText">
                  가격 &nbsp; : &nbsp;
                  {{ orderingLists[0].price }}
                </span>
                <br />
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <span class="blackText">
                  방 생성 시간 &nbsp; : &nbsp;
                  {{ orderingLists[0].date }}
                </span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-row justify="space-around" class="mb-2">
                <v-spacer></v-spacer>
                <v-btn
                  class="ma-2 text-h4"
                  color="orange"
                  @click="refund1(orderingLists[0].roomNumber)"
                >
                  <v-icon left>mdi-cancel</v-icon>
                  <span>주문취소</span>
                </v-btn>
                <!-- <v-btn class="ma-2 text-h4" color="orange" @click="readRoomInfo">
                <v-icon left>mdi-cancel</v-icon>
                <span>테스트</span>
              </v-btn>-->
              </v-row>
            </v-card-actions>
          </v-card>
        </base-material-card>
      </v-flex>
    </v-layout>
    <!-- </div> -->
    &nbsp;
    <!--대영 기록 테이블 -->
    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="내가 주문한 목록"
        class="px-5 py-3"
        flat
        outlined
      >
        <!-- <div id="app"> -->
        <!-- <v-app id="inspire"> -->
        <v-data-table
          :headers="headers"
          :items="orderedLists"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.menu }}</td>
            <td class="text-xs-right">{{ props.item.price }}</td>
            <td class="text-xs-right">{{ props.item.state }}</td>
            <td class="text-xs-right">{{ props.item.roomNumber }}</td>
          </template>
        </v-data-table>
        <!-- </v-app> -->
        <!-- </div> -->
      </base-material-card>
    </v-container>
    <!-- </div> -->
    <!-- </v-app> -->
    <!-- </div> -->
  </v-app>
</template>

<script>
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

let timeInterval;
export default {
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(),
      orderingLists: [],
      // orderedLists2: {},
      orderedLists: [],
      // orderedLists4: [],
      headers: [
        {
          text: "가게이름 (storeName)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "날짜", value: "date" },
        { text: "치킨메뉴", value: "menu" },
        { text: "가격 (eth)", value: "price" },
        { text: "주문상태 (성공/실패)", value: "state" },
        { text: "방번호", value: "roomNumber" }
      ],
      durationData: { timer: 0 }
    };
  },
  computed: {
    Duration() {
      const seconds = this.durationData.timer;
      return (
        Math.floor(seconds / 60) + ":" + (seconds % 60 ? seconds % 60 : "00")
      );
    },
    timeout() {
      if (this.durationData.timer < 0) {
        clearInterval(timeInterval);
        return true;
      }
      return false;
    }
  },
  props: {},
  methods: {
    async readRoomInfo() {
      try {
        this.AdminInstance.getStoreCount().then(async val => {
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
            // console.log("pass");
            this.watchEventApprovedOrRejected(ChickenHouseInstance);
            ChickenHouseInstance.roomCreated(async (error, result2) => {
              console.log(result2);

              for (let idx = 0; idx < result2.length; idx++) {
                // 5. OrderRoom 주소를 가져옴
                const ORAddress = await ChickenHouseInstance.findOrderRoom(
                  result2[idx].returnValues._roomNumber
                );
                // 6. OrderRoom 인스턴스 생성
                const OrderRoomInstance = contractInstance.getOrderRoomInstance(
                  ORAddress
                );
                const result = await OrderRoomInstance.getStateRoom();
                // 시간 나타내는 구문
                const orderDate = new Date(
                  result2[idx].returnValues._date * 1000
                ).toString();
                console.log(result);
                if (result === "1") {
                  this.orderingLists.push({
                    storeName: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "매칭중입니다",
                    finish: result2[idx].returnValues._finish,
                    date: orderDate
                  });
                  const duration =
                    +result2[idx].returnValues._date +
                    +result2[idx].returnValues._finish * 60;
                  this.durationData.timer =
                    duration - Math.floor(Date.now() / 1000);
                  timeInterval = setInterval(
                    () => (this.durationData.timer -= 1),
                    1000
                  );
                } else if (result === "2") {
                  this.orderingLists.push({
                    storeName: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "주문 접수중입니다",
                    finish: " ",
                    date: orderDate
                  });
                } else if (result === "3") {
                  this.orderedLists.push({
                    name: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "성공",
                    date: orderDate
                  });
                } else if (result === "4") {
                  this.orderedLists.push({
                    name: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "실패",
                    date: orderDate
                  });
                }
              }
            });
            ChickenHouseInstance.matchFinish(async (error, result3) => {
              console.log(result3);
              for (let idx = 0; idx < result3.length; idx++) {
                const ORAddress = result3[idx].returnValues.orderRoom;

                // 6. OrderRoom 인스턴스 생성
                const OrderRoomInstance = contractInstance.getOrderRoomInstance(
                  ORAddress
                );
                const state = await OrderRoomInstance.getStateRoom();
                console.log(state);
                const matched = await OrderRoomInstance.getRoomInfo();
                console.log(matched);

                // 시간 나타내는 구문
                const orderDate = new Date(
                  matched._startTime * 1000
                ).toString();

                if (state === "2") {
                  this.orderingLists.push({
                    storeName: result3[idx].returnValues._storeName,
                    menu: matched._chickenName,
                    price: matched._price,
                    roomNumber: result3[idx].returnValues._roomIndex,
                    state: "주문 접수중입니다",
                    finish: " ",
                    date: orderDate
                  });
                } else if (state === "3") {
                  this.orderedLists.push({
                    name: result3[idx].returnValues._storeName,
                    menu: matched._chickenName,
                    price: matched._price,
                    roomNumber: result3[idx].returnValues._roomIndex,
                    state: "성공",
                    date: orderDate
                  });
                } else if (state === "4") {
                  this.orderedLists.push({
                    name: result3[idx].returnValues._storeName,
                    menu: matched._chickenName,
                    price: matched._price,
                    roomNumber: result3[idx].returnValues._roomIndex,
                    state: "실패",
                    date: orderDate
                  });
                }
              }
            });
          }
        });
      } catch (e) {
        this.error = e.message;
      }
    },
    watchEventApprovedOrRejected(storeInstance) {
      const callback = async (error, result) => {
        if (!error) {
          console.log(result);
          const returns = result.returnValues;
          const roomNumber = this.orderingLists[0].roomNumber;
          if (returns._roomIndex !== roomNumber) {
            return;
          }
          const ORAddress = await storeInstance.findOrderRoom(
            returns._roomIndex
          );
          // 6. OrderRoom 인스턴스 생성
          const OrderRoomInstance = contractInstance.getOrderRoomInstance(
            ORAddress
          );
          const roomInfo = await OrderRoomInstance.getRoomInfo();

          // 시간 나타내는 구문
          const orderDate = new Date(roomInfo._startTime * 1000).toString();

          this.orderedLists.push({
            name: returns._storeName,
            menu: roomInfo._chickenName,
            price: roomInfo._price,
            roomNumber: returns._roomIndex,
            state: roomInfo._state === "3" ? "성공" : "실패",
            date: orderDate
          });
          this.orderingLists = [];
        } else {
          console.log(error);
        }
      };
      storeInstance.watchIfApproved(callback);
      storeInstance.watchIfRejected(callback);
    }, //주문취소하기 버튼
    async refund1(idx) {
      try {
        var con_test = confirm("주의 : 주문을 취소하시겠습니까?");
        if (con_test == true) {
          const CHAddress = await this.AdminInstance.findChickenHouse(
            this.orderedLists1.storeName
          );
          const ChickenHouseInstance = await contractInstance.getChickenHouseInstance(
            CHAddress
          );
          const ORAddress = await ChickenHouseInstance.findOrderRoom(idx);
          const OrderRoomInstance = contractInstance.getOrderRoomInstance(
            ORAddress
          );
          await OrderRoomInstance.refundToAUser();
          this.orderedLists.push(this.orderingLists[0]);
          this.orderingLists = [];
        } else if (con_test == false) {
        }
      } catch (e) {
        this.error = e.message;
      }
    }
  },
  mounted() {
    // document.body.style.overflowY = "scroll";
    this.readRoomInfo();
  },
  created() {
    console.log(`=== Created userMyPage  ===`);
  },
  beforeDestroy() {
    console.log("=============Destroyed" + timeInterval);
    clearInterval(timeInterval);
  }
};
</script>

<style scoped>
.roomNumber {
  font-size: 30px;
  vertical-align: middle;
  top: 35px;
  left: 50px;
}
.matching {
  font-size: 18px;
  text: center;
}
.blackText {
  font-size: 20px;
  line-height: 2cm;
}

.complete {
  font-size: 30px;
  text: center;
}
.time {
  font-size: 30px;
  top: 35px;
  right: 50px;
  text-align: right;
}
</style>
