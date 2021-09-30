<template>
  <div class="menu">
    <h1 class="subheading grey--text"></h1>
    <v-container class="my-5">
      <v-row v-bind="binding">
        <v-col>
          <v-card>
            <v-toolbar>
              <v-toolbar-title class="white--text">가게 이름 :</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn dark color>
                수정
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-bind="binding">
        <v-col>
          <v-card>
            <v-toolbar>
              <v-toolbar-title class="white--text">주 소 :</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn dark color>
                수정
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <base-material-card>
        <!-- 메뉴 정보 수정 부분 -->
        <v-row row wrap>
          <v-col
            xs12
            sm6
            md4
            lg3
            v-for="information in menu"
            :key="information.name"
          >
            <v-responsive class="pt-4">
              Menu
            </v-responsive>
            <v-card>
              <v-card-text>
                <div class="subheading">{{ information.name }}</div>
                <div class="grey--text">{{ information.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ma-2 text-h4"
                  color="orange"
                  @click="getInformation"
                  >수정</v-btn
                >
                <v-btn flat color="orange">삭제</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </base-material-card>
    </v-container>

    <v-container>
      <!-- modal -->
      <v-dialog v-model="owner.ownerModal" max-width="290">
        <v-card>
          <v-card-title class="headline">방생성</v-card-title>
          <v-card-text style="text-align: center">
            <v-progress-circular
              indeterminate
              color="red"
              v-show="owner.isLoading"
            ></v-progress-circular>
            <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
              <v-text-field
                v-model="owner.roomNumber"
                placeholder="1"
                label="방이름"
                persistent-hint
              ></v-text-field>
              <v-text-field
                v-model="owner.storeName"
                placeholder="BBQ"
                label="가맹점이름"
                persistent-hint
              ></v-text-field>
              <v-text-field
                v-model="owner.foodName"
                placeholder="Chicken"
                label="메뉴"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
              <v-btn @click="registerChickenHouse()" outline color="teal"
                >Create Chicken House</v-btn
              >
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 다이아로그 끝 -->
    </v-container>
  </div>
</template>

<script>
// Instance 사용하기 위한 구문
// import ContractInstance from "../ContractInstance";
// const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      owner: {
        isLoading: false,
        ownerModal: false,
        roomNumber: "",
        storeName: "",
        foodName: ""
      },
      // 입력한 데이터들
      menu: [
        { name: "뿌링클", price: "21000" },
        { name: "맛초킹", price: "20000" },
        { name: "골드킹", price: "18000" },
        { name: "레드킹", price: "18000" }
      ]
    };
  }
};
</script>

<style></style>
