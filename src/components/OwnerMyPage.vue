<template>
  <v-app
    style="
    background: #f5f5f5;"
  >
    <!-- <child-component v-on:update="getResiterMenu"></child-component> -->
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
      <v-toolbar-title class="text-h3 font-weight-bold">{{
        storeName
      }}</v-toolbar-title>

      <v-spacer />

      <router-link :to="`/OwnerPage2/${storeName}`">
        <v-btn class="ml-2 text-h4" min-width="0" text>
          주문 관리
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
      </router-link>
      <router-link :to="`/OwnerMyPage/${storeName}`">
        <v-btn class="ml-2 text-h4" min-width="0" text>
          메뉴 관리
          <v-icon>mdi-animation</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <br />
    <br />
    <br />

    <!-- <h1 class="subheading grey--text"></h1> -->
    <v-container class="my-5">
      <v-row>
        <v-col>
          <v-card flat outlined>
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
          <v-card flat outlined>
            <v-toolbar flat>
              <v-toolbar-title class="dark--text"
                >주소 : {{ location[0] }}</v-toolbar-title
              >
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
        flat
        outlined
      >
        <!-- 메뉴 정보 수정 부분 -->
        <v-row row wrap align="center">
          <v-col
            sm="8"
            md="6"
            lg="4"
            v-for="infor in information"
            :key="infor.name"
          >
            <!-- <v-responsive class="pt-4">
              Menu
            </v-responsive> -->
            <v-card class="text-center" flat outlined>
              <v-card-text>
                <!-- <div class="text-h3">{{ information.Name }}</div> -->
                <div class="text-h4">
                  메뉴 : {{ infor.chickenName }} /
                  {{ infor.kind }}
                </div>
                <div class="text-h4">가격 : {{ infor.price }} ether</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ma-2 text-h4"
                  color="primary"
                  @click="open(infor.menuIndex)"
                  ><span>수정하기</span></v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  class="ma-2 text-h4"
                  color="orange"
                  :id="infor.menuIndex"
                  @click="openDeleteAlert"
                  v-text="'삭제하기'"
                >
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col sm="8" md="6" lg="4">
            <v-card class="text-center" flat>
              <v-btn @click="menuDialog" color="indigo" rounded class="text-h4">
                메뉴추가
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </base-material-card>
    </v-container>

    <!-- modal  -->
    <owner-dialog :owner="owner" @reload="getResiterMenu"></owner-dialog>
    <menu-dialog :owner="owner" @reload="getResiterMenu"></menu-dialog>
    <alert-dialog
      :content="content"
      :alert="alert"
      v-on:confirm="deleteMenu"
    ></alert-dialog>

    <!-- <v-dialog v-model="deleteAlert" max-width="300">
      <v-card>
        <v-card-title>
          Are you sure?

          <v-spacer />

          <v-icon aria-label="Close" @click="deleteAlert = false">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-6 pt-12 text-center">
          <v-btn class="mr-3" text @click="deleteAlert = false">
            No
          </v-btn>

          <v-btn color="success" text @click="deleteMenu">
            Yes
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </v-app>
</template>

<script>
// Instance 사용하기 위한 구문

import ContractInstance from "../ContractInstance";

const contractInstance = new ContractInstance();
export default {
  components: {
    OwnerDialog: () => import("./OwnerDialog"),
    MenuDialog: () => import("./MenuDialog"),
    AlertDialog: () => import("./AlertDialog")
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
        chosenIndex: "",
        menuModal: false
      },
      alert: {
        modal: false
      },
      content: "",
      location: {},

      information: [],
      index: 0
    };
  },
  computed: {
    storeName() {
      return this.$route.params.storeName;
    }
  },
  methods: {
    openDeleteAlert(event) {
      this.alert.modal = true;
      this.content = "메뉴를 삭제하시겠습니까 ?";
      this.flag = 1;
      this.index = event.target.id;
    },

    open(index) {
      console.log("open");

      this.owner.chosenIndex = index;
      console.log(this.owner.chosenIndex);
      console.log("open1");
      this.owner.ownerModal = true;
      console.log("open2");
    },
    menuDialog() {
      console.log("open menuDialog");
      console.log(this.owner.menuModal);
      console.log("open1");
      this.owner.menuModal = true;
      console.log("open2");
    },
    async deleteMenu() {
      console.log("되나영");

      // var con_test = confirm("주의 : 등록하신 메뉴를 삭제하시겠습니까?");

      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
        CHAddress
      );

      const result = await ChickenHouseInstance.deleteMenu(this.index);

      this.alert.modal = false;
      this.getResiterMenu();
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
      this.getResiterMenu();
    },
    // setMenus: function(_newMenu) {
    //   let menuName = _newMenu.menu;
    //   let price = _newMenu.price;

    //   console.log("MENU CHANGED", menuName, price);
    //   // let index = this.information[num].index;
    // },
    async getLocation() {
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.storeName
      );
      const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
        CHAddress
      );
      const result = await ChickenHouseInstance.getChickenHouse();
      console.log(result);
      console.log(result._latitude);
      console.log(result._longitude);

      const geocoder = new kakao.maps.services.Geocoder();
      const callback = (result, status) => {
        console.log(status);
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0].address.address_name);
          this.location = [];
          this.location.push(result[0].address.address_name);
        }
      };
      const markerPosition = new kakao.maps.LatLng(
        result._latitude,
        result._longitude
      );
      geocoder.coord2Address(
        markerPosition.getLng(),
        markerPosition.getLat(),
        callback
      );
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
    console.log("=== Mounted Map.vue ===");
    console.log("---- Initialize kakao Object and Map Object ----");
    if (window.kakao && window.kakao.maps) {
      this.getLocation();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.getLocation);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f16dcaffdef9152c39799852d826d9c4&libraries=services";
      document.head.appendChild(script);
    }
  }

  // mounted() {
  //   getMenus();
  // }
};
</script>

<style scoped>
html {
  margin: 0;
  padding: 0;
}
body {
  background: #3a1c71;
}
.rect2 {
  position: absolute;
  top: 425px;
  left: 1213px;
}
</style>
