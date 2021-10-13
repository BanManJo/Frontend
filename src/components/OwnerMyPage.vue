<template>
  <v-app>
    <!-- <child-component v-on:update="getResiterMenu"></child-component> -->
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
            <v-toolbar flat>
              <v-toolbar-title class="dark--text"
                >가게 이름 : {{ storeName }}</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn class="text-h4" color="primary">
                수정하기
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title class="dark--text">주 소 :</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn class="text-h4" color="primary">
                수정하기
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
            sm="8"
            md="4"
            lg="4"
            v-for="infor in information"
            :key="infor.name"
          >
            <!-- <v-responsive class="pt-4">
              Menu
            </v-responsive> -->
            <v-card class="text-center">
              <v-card-text>
                <!-- <div class="text-h3">{{ information.Name }}</div> -->
                <div class="text-h4">
                  메뉴 : {{ infor.chickenName }} /
                  {{ infor.kind }}
                </div>
                <div class="text-h4">가격 : {{ infor.price }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ma-2 text-h4"
                  color="primary"
                  @click="open(infor.menuIndex)"
                  ><span>수정하기</span></v-btn
                >
                <v-spacer></v-spacer>
                <v-btn class="ma-2 text-h4" color="orange" @click="deletMenu">
                  <span> 삭제하기</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </base-material-card>
    </v-container>

    <!-- modal  -->
    <owner-dialog :owner="owner" @reload="getResiterMenu"></owner-dialog>
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
    // "child-component": childComponent
  },

  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(),
      DemoInstance: contractInstance.getDemoInstance(),
      owner: {
        isLoading: false,
        ownerModal: false,
        storeName: this.$route.params.storeName,
        menus: this.information,
        chosenIndex: ""
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

      information: []
    };
  },
  computed: {
    storeName() {
      return this.$route.params.storeName;
    }
  },
  methods: {
    open(index) {
      console.log("open");

      this.owner.chosenIndex = index;
      console.log(this.owner.chosenIndex);
      console.log("open1");
      this.owner.ownerModal = true;
      console.log("open2");
    },
    deletMenu() {
      var con_test = confirm("주의 : 등록하신 메뉴를 삭제하시겠습니까?");
      if (con_test == true) {
        this.information.splice(0, 1);
      } else if (con_test == false) {
      }
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
    // setMenus: function(_newMenu) {
    //   let menuName = _newMenu.menu;
    //   let price = _newMenu.price;

    //   console.log("MENU CHANGED", menuName, price);
    //   // let index = this.information[num].index;
    // },

    async getResiterMenu() {
      console.log("=== Show OrderRooms (state = 2) ===");

      const CHAddress = await this.AdminInstance.findChickenHouse(
        "this.storeName"
      );
      const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
        CHAddress
      );

      const roomCount = await ChickenHouseInstance.getRoomsCount();

      ChickenHouseInstance.getStoreMenu().then(result => {
        console.log("---- get store menus from ETH ----");
        console.log(result);
        console.log(result[0].chickenName);
        console.log(result[0].menuIndex);
        console.log(
          `---- get OrderRooms Info (state = 2), Counts: ${roomCount}`
        );
        console.dir(result);
        this.information = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].menuState == 1) {
            this.information.push({
              chickenName: result[i].chickenName,
              kind: "뼈",
              price: result[i].price,
              menuIndex: result[i].menuIndex
            });
          } else if (result[i].menuState == 2) {
            this.information.push({
              chickenName: result[i].chickenName,
              kind: "순살",
              price: result[i].price,
              menuIndex: result[i].menuIndex
            });
          }
        }
      });

      console.log("=== Done Show OrderRoom (state = 2) ===");
    }
  },

  created() {
    console.log(`=== Created OwnerMyPage ${this.owner.storeName} ===`);
    this.getResiterMenu();
    // this.setMenus();
    console.log("ASASAS");
  },
  mounted() {
    document.body.style.overflowY = "scroll";
  }

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
