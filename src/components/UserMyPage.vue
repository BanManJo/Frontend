<template>
  <div>
    <!-- 페이지 이름 -->
    <h1 class="userMyPage">사용자 페이지</h1>
    <div id="app">
      <v-app id="inspire">
        <div>
          <v-alert :value="true" type="info">
            주문현황
          </v-alert>
          <div>
            <v-layout>
              <v-flex xs12 sm6 offset-sm3>
                <v-card>
                  <v-content class="black--text" height="200px">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <!-- 방번호 받아와서 인자값넣기 -->
                          <span class="roomNumber"
                            >방번호 : No.{{ roomNumber }}</span
                          >

                          <!-- 진행현황 인자값받아서 클래스 나타내기 -->
                          <span class="matching"> 매칭중</span>
                          <span class="ordering"> 주문접수중</span>
                          <span class="complete"> 완료</span>
                          <!-- 시간 오른쪽정렬이 안먹힘.. -->
                          <span class="time"> 시간 : {{ time }}</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-content>
                  <v-card-title>
                    <div>
                      <span class="black--text"
                        >가게이름 &nbsp; : &nbsp;{{ storeNmae }} </span
                      ><br />
                      <span class="black--text"
                        >치킨메뉴 &nbsp; : &nbsp;{{ chickenName }} </span
                      ><br />
                      <span class="black--text"
                        >가격 &nbsp; : &nbsp; {{ price }}</span
                      >
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange">취소하기</v-btn>
                    <v-btn @click="testInstance" value="left" color="blue">
                      <v-icon>TEST</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
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

          <!-- 주문했었던 기록 테이블 -->
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
            <!-- 풋터.. -->
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
            </v-card>
          </div>
        </div>
      </v-app>
    </div>
  </div>
</template>

<script>
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      headers: [
        {
          text: "가게이름 (storeName)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "치킨메뉴", value: "chicken" },
        { text: "가격 (eth)", value: "price" },
        { text: "주문상태 (성공/실패)", value: "state" }
      ],
      desserts: [
        {
          name: "가산BHC",
          chicken: "뿌링클",
          price: 6.0,
          state: "성공"
        },
        {
          name: "가산BHC",
          chicken: "뿌링클",
          price: 9.0,
          state: "성공"
        },
        {
          name: "부천BHC",
          chicken: "뿌링클",
          price: 16.0,
          state: "성공"
        },
        {
          name: "부천네네",
          chicken: "양념",
          price: 3.7,
          state: "실패"
        },
        {
          name: "가산호치킨",
          chicken: "갈릭",
          price: 16.0,
          state: "실패"
        },
        {
          name: "가산호치킨",
          chicken: "어니언",
          price: 0.0,
          state: "실패"
        },
        {
          name: "부천네네",
          chicken: "간장",
          price: 0.2,
          state: "성공"
        },
        {
          name: "가산호치킨",
          chicken: "후라이드",
          price: 3.2,
          state: "성공"
        },
        {
          name: "부천네네",
          chicken: "후라이드",
          price: 25.0,
          state: "성공"
        },
        {
          name: "부천BHC",
          chicken: "뿌링클",
          price: 26.0,
          state: "성공"
        }
      ]
    };
  },
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
  font-size: 30px;
  text: center;
}
.ordering {
  font-size: 30px;
  text: center;
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
