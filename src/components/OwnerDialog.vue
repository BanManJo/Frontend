<template>
  <v-app>
    <v-container>
      <!-- modal -->
      <v-dialog v-model="owner.ownerModal" max-width="290">
        <v-card>
          <v-card-title class="headline">메뉴 수정</v-card-title>
          <v-card-text style="text-align: center">
            <v-progress-circular
              indeterminate
              color="red"
              v-show="owner.isLoading"
            ></v-progress-circular>
            <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
              <!-- <v-text-field
                v-model="owner.roomNumber"
                placeholder="1"
                label="사진"
                persistent-hint
              ></v-text-field> -->
              <v-text-field
                v-model="menu"
                placeholder="BBQ"
                label="메뉴"
                persistent-hint
              ></v-text-field>
              <v-text-field
                v-model="price"
                placeholder="Chicken"
                label="가격"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
              <v-btn @click="setMenus" color="teal">확인</v-btn>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 다이아로그 끝 -->
    </v-container>
  </v-app>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  props: ["owner"],
  data() {
    return {
      price: 0,
      menu: "",
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data,
      succeed: false
      // not loaded on map page
      // isLoading: false,
    };
  },
  computed: {},

  mounted() {
    console.log("aa");
  },
  methods: {
    async changeMenu() {
      console.log("=== Create Order Room ===");
      const menu = this.information.menus.filter(data => data.selected)[0];
      console.log(`---- get Menu and Create Room, menu: ${menu}`);
      if (menu === undefined) {
        alert("메뉴를 선택해 주세요.");
        return;
      }
      // storeName
      const _storeName = this.information.storeName;
      // price
      const _price = menu.price;
      // chicken
      const _chicken = menu.chicken;

      this.information.isLoading = true;
      try {
        /* 새롭게 구조화 된 부분 */
        const CHAddress = await this.AdminInstance.findChickenHouse(_storeName);
        const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
          CHAddress
        );
        const tsc = await ChickenHouseInstance.createRoom(_price, _chicken);
        console.log(`---- Create Order Room Succeed : ${tsc}`);
      } catch (error) {
        console.log(error);
      }
      console.log("=== Doen Create Order Room ===");
    },
    setMenus() {
      let menuInfo = {
        menu: this.menu,
        price: this.price
      };
      var con_test = confirm("등록하신 메뉴를 수정하시겠습니까?");
      console.log(menuInfo);
      this.$emit("menuChanged", menuInfo);
    }
  }
};
</script>

<style></style>
