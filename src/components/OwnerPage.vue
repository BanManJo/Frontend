<template>
  <div>
    <!-- 가게 이름 부분 -->
    <h1 class="storeName">다글다글</h1>

    <!-- 시작 종료 토글버튼 -->
    <div class="toggle">
      <v-btn-toggle v-model="icon">
        <v-btn flat value="left" color="blue">
          <v-icon>영업 시작</v-icon>
        </v-btn>
        <v-btn flat value="center" color="red">
          <v-icon>영업 종료</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <!-- My page로 가는 부분 -->
    <div class="myPage">
      <v-btn color="info">My Page</v-btn>
    </div>

    <!-- 주문 들어온거 나타내어주는 부분 -->
    <v-card>
      <div class="flex-container">
        <div>
          <h1>1</h1>
          <v-card-text>
            <h2>메뉴 이름 : 닭강정</h2>
            <h2>가격 : 0.000001 이더</h2>
          </v-card-text>

          <v-card-actions>
            <v-btn color="info">
              주문 받기
            </v-btn>
            <v-btn color="info">
              거절하기
            </v-btn>
          </v-card-actions>
        </div>
        <div>
          <h1>2</h1>
          <v-card-text>
            <h2>메뉴 이름 : 닭강정</h2>
            <h2>가격 : 0.000001 이더</h2>
          </v-card-text>

          <v-card-actions>
            <v-btn color="info">
              주문 받기
            </v-btn>
            <v-btn color="info">
              거절하기
            </v-btn>
          </v-card-actions>
        </div>
        <div>
          <h1>3</h1>
          <v-card-text>
            <h2>메뉴 이름 : 닭강정</h2>
            <h2>가격 : 0.000001 이더</h2>
          </v-card-text>

          <v-card-actions>
            <v-btn color="info">
              주문 받기
            </v-btn>
            <v-btn color="info">
              거절하기
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>

    <!-- 주문받기 한것들이 밑에 나타내어지는 부분 -->
    <v-data-table
      :headers="headers"
      :items="orders"
      item-key="name"
      class="orderList"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.menu }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.orderTime }}</td>
        <td></td>
        <td>
          <button v-on:click="deleteLine">X</button>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "center",
      icon: "justify",
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],

      selected: [],
      headers: [
        {
          text: "방번호",
          align: "left"
          // sortable: false
          // value: "name"
        },
        { text: "메뉴" },
        { text: "가격" },
        { text: "주문 받은 시간" }
      ],
      orders: [
        {
          name: "1",
          menu: "다글다글",
          price: 7000,
          orderTime: "17시 50분"
        },
        {
          name: "2",
          menu: "뿌링클",
          price: 7000,
          orderTime: "17시 50분"
        },
        {
          name: "3",
          menu: "맛초킹",
          price: 7000,
          orderTime: "17시 50분"
        },
        {
          name: "4",
          menu: "간장치킨",
          price: 7000,
          orderTime: "17시 50분"
        },
        {
          name: "5",
          menu: 35,
          price: 7000,
          orderTime: "17시 50분"
        }
      ]
    };
  },
  methods: {
    deleteLine: function() {
      alert("김현수");
    }
  }
};
</script>

<style>
.storeName {
  position: fixed;
  top: 35px;
  left: 50px;
}
.toggle {
  position: fixed;
  top: 35px;
  left: 200px;
}
.myPage {
  position: fixed;
  top: 30px;
  left: 1300px;
}

.flex-container {
  position: fixed;
  width: 300px;
  height: 300px;
  top: 200px;
  left: 380px;
  display: flex;
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
}

.orderList {
  position: fixed;
  top: 500px;
  left: 0px;
  display: flex;
}
</style>
