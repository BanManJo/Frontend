<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="text-h3 text--white">{{
        storeName
      }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn-toggle v-model="icon">
        <v-btn
          class="text-h3 text--white"
          x-large
          @click="testInstance"
          value="left"
          color="blue"
        >
          영업 시작
        </v-btn>
        <v-btn class="text-h3 text--white" x-large value="center" color="red">
          영업 종료
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-btn
        class="text-h4 text--white"
        color="light-green"
        @click="registerChickenHouse"
      >
        My Page
      </v-btn>
    </v-toolbar>

    <!-- <v-container class="my-5">
      <v-header class="headline">현재 들어온 주문 목록</v-header>
      <br />
      <br />
      <v-row row wrap>
        <v-col xs12 sm6 md4 lg3 v-for="order in orders" :key="order.메뉴">
          <v-card flat outlined class="text-center ma-1 ">
            <v-card-text>
              <div class="text-h3">방번호 : {{ order.방번호 }}</div>
              <br />
              <div class="text-h4">메뉴 : {{ order.메뉴 }}</div>
              <div class="text-h4">가격 : {{ order.가격 }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn class="ma-2 text-h4" color="primary">
                <v-icon left> mdi-checkbox-marked-circle</v-icon>
                <span>주문받기</span>
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn class="ma-2 text-h4" color="warning">
                <v-icon left> mdi-cancel</v-icon>
                <span>거절하기</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->

    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="현재 들어온 주문 목록"
        class="px-5 py-2"
        flat
        outlined
      >
        <v-row row wrap>
          <v-col xs12 sm6 md4 lg3 v-for="order in orders" :key="order.메뉴">
            <v-card flat outlined class="text-center">
              <v-card-text>
                <div class="text-h3">방번호 : {{ order.방번호 }}</div>
                <br />
                <div class="text-h4">메뉴 : {{ order.메뉴 }}</div>
                <div class="text-h4">가격 : {{ order.가격 }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="ma-2 text-h4" color="primary">
                  <v-icon left> mdi-checkbox-marked-circle</v-icon>
                  <span>주문받기</span>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn class="ma-2 text-h4" color="orange">
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
          <v-row row wrap :class="`pa-3 orderedList ${orderedList.종류}`">
            <v-col xs12 md5>
              <div class="caption grey--text">주문 받은 시간</div>
              <div>{{ orderedList.시간 }}</div>
            </v-col>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">종류</div>
              <div>{{ orderedList.종류 }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">메뉴</div>
              <div>{{ orderedList.메뉴 }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">방 번호</div>
              <div>{{ orderedList.방번호 }}</div>
            </v-flex>

            <div class="text-xs-center">
              <v-btn fab small color="green">
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

      text: "center",
      icon: "justify",
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],

      orders: [
        { 방번호: 1, 메뉴: "다글다글", 가격: "0.0001 ether" },
        { 방번호: 2, 메뉴: "후라이드", 가격: "0.0001 ether" },
        { 방번호: 3, 메뉴: "양념치킨", 가격: "0.0001 ether" },
        { 방번호: 4, 메뉴: "간장치킨", 가격: "0.0001 ether" },
        { 방번호: 5, 메뉴: "김현수", 가격: "0.0001 ether" },
        { 방번호: 6, 메뉴: "김현수", 가격: "0.00000001 ether" }
      ],

      orderedLists: [
        {
          방번호: "1",
          종류: "순살",
          메뉴: "후라이드",
          시간: "17시 45분"
        },
        {
          방번호: "2",
          종류: "뼈",
          메뉴: "간장치킨",
          시간: "18시 30분"
        },
        {
          방번호: "3",
          종류: "순살",
          메뉴: "맛초킹",
          시간: "18시 55분"
        },
        {
          방번호: "359",
          종류: "뼈",
          메뉴: "뿌링클",
          시간: "19시 25분"
        },
        {
          방번호: "500",
          종류: "순살",
          메뉴: "다글다글",
          시간: "19시 45분"
        }
      ]
    };
  },
  computed: {
    storeName() {
      return this.$route.params.storeName;
    }
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
.orderedList.순살 {
  border-left: 6px solid #faffca;
}
.orderedList.뼈 {
  border-left: 6px solid #f8a529;
}
.orderedList.overdue {
  border-left: 6px solid #06d15bd3;
}
</style>
