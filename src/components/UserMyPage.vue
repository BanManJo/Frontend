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
                          방번호 &nbsp; :&nbsp; {{ roomNumber }}</span
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
                        <span class="matching"> 매칭중</span>
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
                          만료시간 &nbsp; :&nbsp; {{ roomNumber }}</span
                        >
                      </v-chip>
                      &nbsp; &nbsp; &nbsp; &nbsp;</v-row
                    >
                    <v-card-title>
                      <div>
                        <span class="blackText"
                          >가게이름 &nbsp; : &nbsp;{{ storeNmae }} </span
                        ><br />
                        <v-spacer></v-spacer> <v-spacer></v-spacer>
                        <span class="blackText"
                          >치킨메뉴 &nbsp; : &nbsp;{{ chickenName }} </span
                        ><br />
                        <v-spacer></v-spacer><v-spacer></v-spacer>
                        <span class="blackText"
                          >가격 &nbsp; : &nbsp; {{ price }}</span
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
                      </v-btn></v-row
                    >
                  </v-card-actions>
                </base-material-card>
              </v-flex>
            </v-layout>
          </div>
          &nbsp;
          <!-- new 기록 테이블 -->

          <v-container>
            <base-material-card
              icon="mdi-clipboard-text"
              title="내가 주문한 목록"
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
                    <div class="caption grey--text">가게이름</div>
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
                    <div class="caption grey--text">가격</div>
                    <div>{{ orderedList.roomNumber }}</div>
                  </v-flex>
                  <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">주문상태</div>
                    <div>{{ orderedList.roomNumber }}</div>
                  </v-flex>
                  <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">방번호</div>
                    <div>{{ orderedList.roomNumber }}</div>
                  </v-flex>

                  <div class="text-xs-center">
                    <v-btn fab small color="green">
                      <v-icon color="white" @click="finishCook"
                        >mdi-minus</v-icon
                      >
                    </v-btn>
                  </div>
                </v-row>
                <v-divider></v-divider>
              </v-card>
            </base-material-card>
          </v-container>
          &nbsp;

          <!-- 현수거 기록 테이블 -->
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
                    :items="desserts"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.name }}</td>
                      <td class="text-xs-right">{{ props.item.chicken }}</td>
                      <td class="text-xs-right">{{ props.item.price }}</td>
                      <td class="text-xs-right">{{ props.item.state }}</td>
                    </template>
                  </v-data-table>
                </v-app>
                <!-- 풋터..
            <v-card height="200px" flat>
              <v-bottom-nav
                :active.sync="bottomNav"
                :value="true"
                absolute
                color="transparent"
              >
                <v-btn color="teal" flat value="recent">
                  <span>Recent</span>
                  <v-icon>history</v-icon>
                </v-btn>

                <v-btn color="teal" flat value="favorites">
                  <span>Favorites</span>
                  <v-icon>favorite</v-icon>
                </v-btn>

                <v-btn color="teal" flat value="nearby">
                  <span>Nearby</span>
                  <v-icon>place</v-icon>
                </v-btn>
              </v-bottom-nav>
            </v-card> -->
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
      desserts: [
        {
          name: "가산BHC",
          kind: "순살",
          menu: "뿌링클",
          price: 6.0,
          state: "성공",
          roomNumber: 10
        },
        {
          name: "가산BHC",
          kind: "순살",
          menu: "뿌링클",
          price: 6.0,
          state: "성공",
          roomNumber: 10
        }
      ]
    };
  },
  computed: {},
  props: {},
  methods: {
    testInstance() {
      this.AdminInstance.getStoreCount().then(count => {
        // resolve
        alert(`Store Counts : ${count}`);
      });
    }
  },
  created() {
    console.log(`=== Created OwnerPage1 ${this.storeName} ===`);
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
