<template>
  <v-dialog
    v-model="userPageInfo.modal"
    transition="dialog-bottom-transition"
    width="80%"
  >
    <v-card>
      <v-app-bar color="grey lighten-4 " dark elevation="1">
        <v-spacer></v-spacer>

        <v-toolbar-title class="black--text text-h3 font-weight-bold"
          >내 주문 현황</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-btn
          class="ma-0 pa-0 text-h4"
          text
          color="black"
          icon
          @click="userPageInfo.modal = false"
          ><v-icon large>mdi-backspace </v-icon></v-btn
        >
      </v-app-bar>
      <br />
      <br />
      <v-container>
        <v-row>
          <v-col sm="12" md="6" lg="4" offset-sm3>
            <base-material-card
              icon="mdi-clipboard-text"
              title="현재 주문한 방 상황 "
              class="px-5 py-2 "
              flat
              outlined
            >
              <br />
              <v-card
                flat
                outlined
                v-if="userPageInfo.orderingLists.length != 0"
              >
                <v-row justify="space-around" class="mb-2">
                  <v-chip
                    class="ma-2"
                    color="green"
                    label
                    text-color="white"
                    flat
                  >
                    <v-icon>mdi-home</v-icon>

                    <span class="matching">
                      방번호
                      {{ userPageInfo.orderingLists[0].roomNumber }}
                    </span>
                  </v-chip>
                  <v-spacer></v-spacer>

                  <v-chip
                    class="ma-2"
                    color="green"
                    label
                    text-color="white"
                    flat
                  >
                    <v-icon>mdi-widgets</v-icon>

                    <span class="matching">{{
                      userPageInfo.orderingLists[0].state
                    }}</span>
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-chip
                    class="ma-2"
                    color="green"
                    label
                    text-color="white"
                    flat
                  >
                    <v-icon>mdi-clock</v-icon>

                    <span class="matching">
                      만료시간
                      <!-- {{ orderedLists1.finish }}{{ orderedLists2.finish }} -->
                      {{ timeout ? "00:00" : Duration }}
                    </span>
                  </v-chip>
                </v-row>
                <div>
                  <span class="blackText"
                    >가게 이름:
                    {{ userPageInfo.orderingLists[0].storeName }}</span
                  >
                  <br />
                  <!-- <v-spacer></v-spacer>
                  <v-spacer></v-spacer> -->
                  <span class="blackText"
                    >치킨 메뉴: {{ userPageInfo.orderingLists[0].menu }}</span
                  >
                  <br />
                  <!-- <v-spacer></v-spacer>
                  <v-spacer></v-spacer> -->
                  <span class="blackText">
                    가격:
                    {{ userPageInfo.orderingLists[0].price }} ether
                  </span>
                  <br />
                  <!-- <v-spacer></v-spacer>
                  <v-spacer></v-spacer> -->
                  <span class="blackText">
                    방 생성 시간 :
                    {{ userPageInfo.orderingLists[0].date }}
                  </span>
                </div>
                <v-card-actions>
                  <v-row justify="space-around" class="mb-2">
                    <v-spacer></v-spacer>
                    <v-btn
                      class="ma-2 text-h4"
                      color="orange"
                      @click="deleteBtnClicked()"
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
          </v-col>

          <!-- </div> -->
          <!--대영 기록 테이블 -->

          <v-col sm="12" md="6" lg="8">
            <base-material-card
              icon="mdi-clipboard-text"
              title="내가 주문한 목록"
              class="px-5 py-3 text-h3"
              flat
              outlined
            >
              <!-- <div id="app"> -->
              <!-- <v-app id="inspire"> -->

              <v-data-table
                :headers="headers"
                :items="userPageInfo.orderedLists"
                outlined
              >
              </v-data-table>
              <!-- </v-app> -->
              <!-- </div> -->
            </base-material-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- </div> -->
      <alert-dialog
        :content="content"
        :alert="alert"
        v-on:confirm="refund1(orderingList.roomNumber)"
      ></alert-dialog>
      <base-material-snackbar
        v-model="snackbar"
        :type="'warning'"
        v-bind="{
          top: true,
          center: true,
          timeout: 30000
        }"
      >
        매칭하는 인원이 없습니다.
        <span class="font-weight-bold">&nbsp;&nbsp;</span>
        방의 만료시간이 지나 매칭종료합니다.주문취소버튼을 눌러 환불 받아주세요.
      </base-material-snackbar>
      <!-- </v-app> -->
      <!-- </div> -->
    </v-card>
  </v-dialog>
  <!-- </v-app> -->
</template>

<script>
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

let timeInterval;
export default {
  components: {
    AlertDialog: () => import("./AlertDialog.vue")
  },
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(),
      // orderingLists: [],
      // orderedLists2: {},
      // orderedLists: [],
      cancelAlert: false,
      snackbar: false,
      // orderedLists4: [],
      headers: [
        {
          text: "가게이름 (storeName)",
          align: "left",
          sortable: false,
          value: "storeName"
        },
        { text: "날짜", value: "date" },
        { text: "치킨메뉴", value: "menu" },
        { text: "가격 (eth)", value: "price" },
        { text: "주문상태 (픽업대기중/완료)", value: "state" },
        { text: "방번호", value: "roomNumber" }
      ],
      durationData: { timer: 0 },
      alert: {
        modal: false
      },
      content: ""
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
        return true;
      }
      return false;
    },
    orderDate() {
      const date = new Date(this.userPageInfo.orderingLists[0].date * 1000);
      return `${date.getFullYear()}년${date.getMonth()}월${date.getDate()}일 ${date.getHours()}시${date.getMinutes()}분`;
    },
    orderingList() {
      return this.userPageInfo.orderingLists[0];
    }
  },
  props: {
    userPageInfo: Object
  },
  methods: {
    //주문취소하기 버튼
    deleteBtnClicked() {
      this.alert.modal = true;
      this.content = "주문을 취소 하시겠습니까 ?";
      // this.approveAlert = true;
    },
    async refund1(idx) {
      try {
        //var con_test = confirm("주의 : 주문을 취소하시겠습니까?");
        console.log("pass");
        const CHAddress = await this.AdminInstance.findChickenHouse(
          this.userPageInfo.orderingLists[0].storeName
        );
        const ChickenHouseInstance = await contractInstance.getChickenHouseInstance(
          CHAddress
        );
        const ORAddress = await ChickenHouseInstance.findOrderRoom(idx);
        const OrderRoomInstance = contractInstance.getOrderRoomInstance(
          ORAddress
        );
        await OrderRoomInstance.refundToAUser();
        const orderList = this.userPageInfo.orderingLists[0];
        orderList.state = "완료";
        this.userPageInfo.orderedLists.push(orderList);
        this.userPageInfo.orderingLists = [];
        this.alert.modal = false;
      } catch (e) {
        this.error = e.message;
      }
    }
  },
  watch: {
    timeout: function(val) {
      if (val) {
        if (timeInterval) {
          clearInterval(timeInterval);
        }
        this.snackbar = true;
        console.log(val);
      }
    },
    orderingList: function(val) {
      if (val) {
        console.log("Updated UserMyPage");
        const duration =
          +this.orderingList.start + +this.orderingList.finish * 60;
        this.durationData.timer = duration - Math.floor(Date.now() / 1000);
        timeInterval = setInterval(() => (this.durationData.timer -= 1), 1000);
      }
    }
  },
  mounted() {
    // document.body.style.overflowY = "scroll";
    // this.readRoomInfo();
  },
  created() {
    console.log(`=== Created userMyPage  ===`);
  },
  beforeDestroy() {
    console.log("=============Destroyed" + timeInterval);
  },
  updated() {
    if (!this.userPageInfo.modal) {
      clearInterval(timeInterval);
    }
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
