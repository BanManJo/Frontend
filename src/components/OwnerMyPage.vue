<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="text-h3 text--white">{{
        storeName
      }}</v-toolbar-title>
    </v-toolbar>
    <v-spacer></v-spacer>
    <!-- <h1 class="subheading grey--text"></h1> -->
    <v-container class="my-5">
      <v-row>
        <v-col>
          <v-card>
            <v-toolbar>
              <v-toolbar-title class="dark--text">가게 이름 :</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white">
                수정
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-toolbar>
              <v-toolbar-title class="dark--text">주 소 :</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white">
                수정
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <base-material-card
        icon="mdi-clipboard-text"
        title="등록한 메뉴 목록"
        class="px-5 py-2"
      >
        <!-- 메뉴 정보 수정 부분 -->
        <v-row row wrap>
          <v-col
            xs12
            sm6
            md4
            lg3
            v-for="information in information"
            :key="information.name"
          >
            <v-responsive class="pt-4">
              Menu
            </v-responsive>
            <v-card class="text-center">
              <v-card-text>
                <!-- <div class="text-h3">{{ information.Name }}</div> -->
                <div class="text-h4">메뉴 : {{ information.chicken }}</div>
                <div class="text-h4">가격 : {{ information.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ma-2 text-h4"
                  color="orange"
                  @click="owner.ownerModal = true"
                  >수정</v-btn
                >
                <span></span>
                <v-btn color="orange" @click="deletMenu">
                  <v-icon>mdi-cancel</v-icon>
                  <span>삭제</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </base-material-card>
    </v-container>

    <!-- modal  -->
    <Owner-dialog :owner="owner" @menuChanged="setMenus"></Owner-dialog>
  </v-app>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
import info_window from "../utils/info_window";
const contractInstance = new ContractInstance();

export default {
  components: {
    OwnerDialog: () => import("./OwnerDialog")
  },

  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(),
      DemoInstance: contractInstance.getDemoInstance(),
      owner: {
        isLoading: false,
        ownerModal: false,
        storeName: null,
        menus: []
      },
      // 입력한 데이터들
      // information: [
      //   { name: "뿌링클", price: "21000" },
      //   { name: "맛초킹", price: "20000" },
      //   { name: "골드킹", price: "18000" },
      //   { name: "레드킹", price: "18000" },
      //   { name: "초초", price: "17000" },
      //   {}
      // ],

      information: {
        storeName: null
      },
      information: []
    };
  },
  computed: {
    storeName() {
      return this.$route.params.storeName;
    }
  },
  methods: {
    deletMenu() {
      var con_test = confirm("주의 : 등록하신 메뉴를 삭제하시겠습니까?");
      if (con_test == true) {
        this.information.splice(0, 1);
      } else if (con_test == false) {
      }
    },
    toggleModal: function() {
      this.owner.ownerModal = !this.owner.ownerModal;
      console.log("ownerModal : " + this.ownerModal);
    },
    testInstance() {
      this.AdminInstance.getStoreCount().then(count => {
        // resolve
        alert(`Store Counts : ${count}`);
      });
    },
    getMenus: function() {
      // 컨트랙트에서 메뉴 데이터 가져오기
      // getStoreMenu
      // data = await this.AdminInstance.getStoreMenu(owner.storeName)
      // 가져온 데이터를 메뉴에 저장
      // console.log("MENUDATA :", data);
      // menu = data;
    },
    setMenus: function(_newMenu) {
      let menuName = _newMenu.menu;
      let price = _newMenu.price;

      console.log("MENU CHANGED", menuName, price);
      // let index = this.information[num].index;
    },
    async getResiterMenu() {
      console.log("=== Show OrderRooms (state = 2) ===");

      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
        CHAddress
      );

      const roomCount = await ChickenHouseInstance.getRoomsCount();

      ChickenHouseInstance.getStoreMenu().then(result => {
        console.log("---- get store menus from ETH ----");
        console.log(result);

        console.log(
          `---- get OrderRooms Info (state = 2), Counts: ${roomCount}`
        );
        this.information = [];
        for (let i = 0; i < result._chickens.length; i++) {
          this.information.push({});
        }
      });

      console.log("=== Done Show OrderRoom (state = 2) ===");
    }
  },

  created() {
    console.log(`=== Created OwnerMyPage ${this.owner.storeName} ===`);
    this.getResiterMenu();
    console.log("ASASAS");
  },
  mounted() {}

  // mounted() {
  //   getMenus();
  // }
};
</script>

<style>
html {
  margin: 0;
  padding: 0;
}
body {
  position: relative;
  overflow: hidden; /* Hide scrollbars */
}

#map {
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}

#contents {
  position: absolute;
  top: 0%;
  z-index: 2;
}
</style>
