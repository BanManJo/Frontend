<template>
  <v-dialog v-model="userPageInfo.modal" transition="dialog-bottom-transition" width="80%">
    <v-card>
      <v-app-bar color="grey lighten-4 " dark elevation="1">
        <v-spacer></v-spacer>

        <v-toolbar-title class="black--text text-h3 font-weight-bold">내 주문 현황</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="ma-0 pa-0 text-h4"
          text
          color="black"
          icon
          @click="userPageInfo.modal = false"
        >
          <v-icon large>mdi-backspace</v-icon>
        </v-btn>
      </v-app-bar>
      <br />
      <br />
      <!-- <v-container> -->
      <v-row class="ma-1" justify="end">
        <v-col sm="12" md="6" lg="4" offset-sm3>
          <base-material-card
            icon="mdi-clipboard-text"
            title="현재 주문한 방 상황 "
            class="px-5 py-2"
            flat
            outlined
          >
            <br />
            <!-- <v-card
                flat
                outlined
            >-->
            <!-- <v-card flat outlined v-if="currentOrder"> -->
            <v-content class="pa-1 white" v-if="currentOrder">
              <v-row justify="space-around" class="mb-2">
                <v-chip class="ma-1" color="green" label text-color="white" flat>
                  <v-icon>mdi-home</v-icon>

                  <span class="matching">
                    방번호
                    {{ currentOrder.roomNumber }}
                  </span>
                </v-chip>
                <v-spacer></v-spacer>

                <v-chip class="ma-1" color="green" label text-color="white" flat>
                  <v-icon>mdi-widgets</v-icon>

                  <span class="matching">
                    {{
                    currentOrder.state === "1"
                    ? "매칭중입니다."
                    : "주문 접수중입니다."
                    }}
                  </span>
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip class="ma-1" color="green" label text-color="white" flat>
                  <v-icon>mdi-clock</v-icon>

                  <span class="matching">
                    만료시간
                    <!-- {{ orderedLists1.finish }}{{ orderedLists2.finish }} -->
                    {{ timer(currentOrder.state) }}
                  </span>
                </v-chip>
              </v-row>
              <div>
                <span class="blackText">가게 이름: {{ currentOrder.storeName }}</span>
                <br />
                <!-- <v-spacer></v-spacer>
                <v-spacer></v-spacer>-->
                <span class="blackText">치킨 메뉴: {{ currentOrder.menu }}</span>
                <br />
                <!-- <v-spacer></v-spacer>
                <v-spacer></v-spacer>-->
                <span class="blackText">
                  가격:
                  {{ currentOrder.price }} ETH
                </span>
                <br />
                <!-- <v-spacer></v-spacer>
                <v-spacer></v-spacer>-->
                <span class="blackText">
                  방 생성 날짜 :
                  {{ orderDate(currentOrder.date) }}
                </span>
              </div>
              <!-- <v-card-actions> -->
              <v-row justify="space-around" class="mb-2">
                <v-spacer></v-spacer>
                <v-btn class="ma-2 text-h4" color="orange" @click="deleteBtnClicked()">
                  <v-icon left>mdi-cancel</v-icon>
                  <span>주문취소</span>
                </v-btn>
              </v-row>
            </v-content>
            <!-- </v-card-actions> -->
            <!-- </v-card> -->
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

            <v-data-table :headers="headers" :items="userPageInfo.orderingLists" outlined>
              <template v-slot:item.state="{ item }">
                <td>{{ item.state === "3" ? "픽업대기중" : "완료" }}</td>
              </template>
              <template v-slot:item.date="{ item }">
                <td>{{ orderDate(item.date) }}</td>
              </template>
            </v-data-table>
            <!-- </v-app> -->
            <!-- </div> -->
          </base-material-card>
        </v-col>
      </v-row>
      <!-- </v-container> -->
      <!-- </div> -->
      <!-- </v-app> -->
      <!-- </div> -->
    </v-card>
    <alert-dialog :content="content" :alert="alert" v-on:confirm="refund1(currentOrder.roomNumber)"></alert-dialog>
  </v-dialog>
  <!-- </v-app> -->
</template>

<script>
import { mapGetters } from "vuex";

import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  components: {
    AlertDialog: () => import("./AlertDialog.vue"),
  },
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(),
      cancelAlert: false,
      headers: [
        {
          text: "가게이름 (storeName)",
          align: "left",
          sortable: false,
          value: "storeName",
        },
        { text: "날짜", value: "date" },
        { text: "치킨메뉴", value: "menu" },
        { text: "가격 (eth)", value: "price" },
        {
          text: "주문상태",
          value: "state",
          filter: (value) => {
            return value === "3" || value === "4" ? true : false;
          },
        },
        { text: "방번호", value: "roomNumber" },
      ],
      alert: {
        modal: false,
      },
      content: "",
    };
  },
  computed: {
    ...mapGetters(["timeout", "Duration"]),
    currentOrder() {
      const current = this.userPageInfo.orderingLists.filter(
        (list) => list.state === "1" || list.state === "2"
      );
      return current[0];
    },
  },
  props: {
    userPageInfo: Object,
  },
  methods: {
    timer(state) {
      if (state === "2") {
        return "00:00";
      }
      if (this.timeout) {
        this.$store.commit("STOP_TIMER");
        return "00:00";
      } else {
        return this.Duration;
      }
    },
    orderDate(start) {
      const date = new Date(start * 1000);
      return `${date.getFullYear()}년${
        date.getMonth() + 1
      }월${date.getDate()}일 ${date.getHours()}시${date.getMinutes()}분`;
    },
    //주문취소하기 버튼
    deleteBtnClicked() {
      this.alert.modal = true;
      this.content = "주문을 취소 하시겠습니까 ?";
    },
    async refund1(idx) {
      try {
        //var con_test = confirm("주의 : 주문을 취소하시겠습니까?");
        const CHAddress = await this.AdminInstance.findChickenHouse(
          this.currentOrder.storeName
        );
        const ChickenHouseInstance =
          await contractInstance.getChickenHouseInstance(CHAddress);
        const ORAddress = await ChickenHouseInstance.findOrderRoom(idx);
        const OrderRoomInstance =
          contractInstance.getOrderRoomInstance(ORAddress);
        await OrderRoomInstance.refundToAUser();
        this.$store.commit("STOP_TIMER");
        const orderList = this.currentOrder;
        orderList.state = "완료";
        // this.userPageInfo.orderedLists.push(orderList);
        this.userPageInfo.orderingLists.push(orderList);
        this.alert.modal = false;
      } catch (e) {
        this.error = e.message;
      }
    },
  },
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
