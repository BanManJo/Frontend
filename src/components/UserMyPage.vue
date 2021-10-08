<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="titleText">
        User My Page
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- 페이지 이름 -->

    <div id="app">
      <v-app id="inspire">
        <div>
          <div>
            <v-layout>
              <v-flex xs12 sm6 offset-sm3>
                <base-material-card
                  color="success"
                  title="This card is the current room information."
                  class="px-5 py-3"
                >
                  <v-card>
                    <v-row justify="space-around" class="mb-2">
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <v-chip
                        class="ma-2"
                        color="green"
                        label
                        text-color="white"
                        x-large
                      >
                        <v-icon size="30" right>
                          mdi-home
                        </v-icon>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <span class="matching">
                          방번호 &nbsp; :&nbsp;
                          {{ orderedLists1.roomNumber
                          }}{{ orderedLists2.roomNumber }}</span
                        >
                      </v-chip>
                      <v-spacer></v-spacer>

                      <v-chip
                        class="ma-2"
                        color="green"
                        label
                        text-color="white"
                        x-large
                      >
                        <v-icon size="30" right>
                          mdi-widgets
                        </v-icon>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <span class="matching">
                          {{ orderedLists1.state }}{{ orderedLists2.state }}
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
                        <v-icon size="30" right>
                          mdi-clock
                        </v-icon>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <span class="matching">
                          만료시간 &nbsp; :&nbsp;
                          {{ orderedLists1.finish
                          }}{{ orderedLists2.finish }}</span
                        >
                      </v-chip>
                      &nbsp; &nbsp; &nbsp; &nbsp;</v-row
                    >
                    <v-card-title>
                      <div>
                        <span class="blackText"
                          >가게이름 &nbsp; : &nbsp;{{
                            orderedLists1.storeName
                          }}
                          {{ orderedLists2.storeName }}</span
                        ><br />
                        <v-spacer></v-spacer> <v-spacer></v-spacer>
                        <span class="blackText"
                          >치킨메뉴 &nbsp; : &nbsp;{{ orderedLists1.menu
                          }}{{ orderedLists2.menu }} </span
                        ><br />
                        <v-spacer></v-spacer><v-spacer></v-spacer>
                        <span class="blackText"
                          >가격 &nbsp; : &nbsp; {{ orderedLists1.price
                          }}{{ orderedLists2.price }}</span
                        >
                      </div>
                    </v-card-title>
                  </v-card>
                  <v-card-actions>
                    <v-row justify="space-around" class="mb-2">
                      <v-spacer></v-spacer>
                      <v-btn
                        class="ma-2 text-h4"
                        color="orange"
                        @click="deleteOrderRoom"
                      >
                        <v-icon left> mdi-cancel</v-icon>
                        <span>주문취소</span>
                      </v-btn>
                      <v-btn
                        class="ma-2 text-h4"
                        color="orange"
                        @click="readRoomInfo"
                      >
                        <v-icon left> mdi-cancel</v-icon>
                        <span>테스트</span>
                      </v-btn>
                      <v-btn
                        class="ma-2 text-h4"
                        color="orange"
                        @click="getStateRoom"
                      >
                        <v-icon left> mdi-cancel</v-icon>
                        <span>테스트2</span>
                      </v-btn></v-row
                    >
                  </v-card-actions>
                </base-material-card>
              </v-flex>
            </v-layout>
          </div>
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
              <div id="app">
                <v-app id="inspire">
                  <v-data-table
                    :headers="headers"
                    :items="orderedLists3"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.name }}</td>
                      <td class="text-xs-right">{{ props.item.kind }}</td>
                      <td class="text-xs-right">{{ props.item.menu }}</td>
                      <td class="text-xs-right">{{ props.item.price }}</td>
                      <td class="text-xs-right">{{ props.item.state }}</td>
                      <td class="text-xs-right">{{ props.item.roomNumber }}</td>
                    </template>
                  </v-data-table>
                </v-app>
              </div>
            </base-material-card></v-container
          >
        </div>
      </v-app>
    </div>
  </v-app>
</template>

<script>
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(),
      orderedLists1: {},
      orderedLists2: {},
      headers: [
        {
          text: "가게이름 (storeName)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "종류", value: "kind" },
        { text: "치킨메뉴", value: "menu" },
        { text: "가격 (eth)", value: "price" },
        { text: "주문상태 (성공/실패)", value: "state" },
        { text: "방번호", value: "roomNumber" }
      ],
      orderedLists3: [],
      orderedLists4: []
    };
  },
  computed: {},
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
            console.log("pass");
            ChickenHouseInstance.watchIfCreated2(async (error, result2) => {
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
                console.log(result);
                this.orderedLists1 = [];
                if (result === "1") {
                  this.orderedLists1 = {
                    storeName: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "매칭중입니다",
                    finish: result2[idx].returnValues._finish
                  };
                } else if (result === "2") {
                  this.orderedLists2 = {
                    storeName: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "주문 접수중입니다",
                    finish: result2[idx].returnValues._finish
                  };
                  console.log(this.orderedLists2);
                } else if (result === "3") {
                  this.orderedLists3.push({
                    name: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "성공"
                  });
                } else if (result === "4") {
                  this.orderedLists3.push({
                    name: result2[idx].returnValues._storeName,
                    menu: result2[idx].returnValues._chickenName,
                    price: result2[idx].returnValues._price,
                    roomNumber: result2[idx].returnValues._roomNumber,
                    state: "실패"
                  });
                  console.log(this.orderedLists4);
                }
              }
            });
          }
        });
      } catch (e) {
        this.error = e.message;
      }
    }
  },
  created() {
    console.log(`=== Created userMyPage  ===`);
    this.readRoomInfo();
  }
};
</script>

<style>
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
