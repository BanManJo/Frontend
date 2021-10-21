<template>
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
          <v-text-field
            v-model="menu"
            placeholder="예) 황올 후라이드 치킨"
            label="메뉴"
            persistent-hint
          ></v-text-field>
          <v-checkbox v-model="sunsal" label="순살?"></v-checkbox>

          <v-text-field
            v-model="price"
            placeholder="예) 1"
            label="가격 (ether)"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
          <v-btn @click="setMenus" color="indigo" class="text-h4">확인</v-btn>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- 다이아로그 끝 -->
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  props: ["owner", "reload"],

  data() {
    return {
      price: null,
      menu: "",
      sunsal: false,

      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data,
      succeed: false
      // not loaded on map page
      // isLoading: false,
    };
  },

  created() {
    console.log("cc");
  },
  computed: {},

  mounted() {
    console.log("aa");
  },
  methods: {
    async setMenus() {
      console.log(this.owner.storeName);
      console.log(this.price);
      console.log(this.menu);

      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.owner.storeName
      );
      const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
        CHAddress
      );

      if (this.sunsal == true) {
        await ChickenHouseInstance.setMenu(
          this.owner.chosenIndex,
          this.menu,
          this.price,
          2
        );
      } else if (this.sunsal == false) {
        await ChickenHouseInstance.setMenu(
          this.owner.chosenIndex,
          this.menu,
          this.price,
          1
        );
      }
      this.$emit("reload");
      this.owner.ownerModal = false;

      // console.log(`---- get OrderRooms Info (state = 2), Counts: ${tjdrn}`);
      // var con_test = confirm("등록하신 메뉴를 수정하시겠습니까?");
      // console.log(menuInfo);
      // this.$emit("menuChanged", menuInfo);
    }
    // sendEvent: function() {
    //   this.$emit("update");
    // }
  }
};
</script>

<style></style>
