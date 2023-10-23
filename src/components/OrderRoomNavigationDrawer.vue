<template>
  <v-container>
    <v-navigation-drawer style="overflow: hidden" v-model="drawer" absolute width="400">
      <v-list align="center" dense app>
        <v-row class="mt-1" align="center" justify="center">
          <v-btn
            class="mr-5"
            dark
            plain
            large
            rounded
            color="orange"
            white
            fab
            @click="closeDrawer"
          >
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-btn>
          <v-text-field
            v-model="searchWord"
            label="메뉴 검색"
            color="secondary"
            hide-details
            @click="initSearch"
            style="max-width: 70%"
          >
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
              <v-btn @click="searchRooms" class="mt-n2" elevation="1" color="orange" fab x-small>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
        <v-row align="left" justify="center" class="mt-6">
          <!-- </v-list>
          <v-list dense app>-->
          <!-- <v-list-item-avatar class="align-self-center" color="white" contain>
            <v-img
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            />
          </v-list-item-avatar>-->
          <component :is="'h3'">
            <template>{{ navDrawer.storeName }}</template>
            <template>
              <br />
              <small>Rooms. {{ navDrawer.roomCount }}</small>
              /
              <small>time(avg). {{ navDrawer.roomCount }}</small>
            </template>
          </component>
        </v-row>
      </v-list>
      <v-divider class="mt-3"></v-divider>
      <v-list style="height: 80%; overflow-y: scroll" app>
        <v-btn
          @click="$emit('createOrderRoom', navDrawer.storeName, true)"
          fab
          color="#FF8C00"
          style="bottom: 20px; right: 5px"
          absolute
        >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
        <v-row v-show="showSearchResult" justify="center" class="mt-3">
          <template>"{{searchWord}}"로 검색한 결과 입니다.</template>
          <!-- <br /> -->
          <!-- <v-btn @click="initSearch" small text :ripple="false">검색 결과 초기화</v-btn> -->
        </v-row>
        <v-row v-for="(orderRoom, idx) in orderRooms" :key="idx" text class="ma-2">
          <base-material-order-room-card
            color="orange"
            icon="mdi-clock-time-eight-outline"
            :duration="orderRoom.duration"
            :value="orderRoom.chickenName"
            :price="orderRoom.price / 2"
            :sunsal-check-box="
              orderRoom.menuState === '2'
                ? 'mdi-checkbox-marked'
                : 'mdi-checkbox-blank-outline'
            "
            base-icon-color="green"
            :description="orderRoom.description"
            :store-name="navDrawer.storeName"
            :room-number="orderRoom.index"
            @matchRoom="matchRoom"
          />
        </v-row>
      </v-list>
    </v-navigation-drawer>
    <base-material-snackbar
      v-model="alertWhenStoreOff"
      :type="'warning'"
      v-bind="{
        top: true,
        center: true
      }"
    >
      <span class="font-weight-bold">Warning</span> — 죄송해요! 가게가 지금
      준비중입니다!
    </base-material-snackbar>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data,
      collapseOnScroll: true,
      //   drawer: this.navDrawer.drawer,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" },
      ],
      right: null,
      alertWhenStoreOff: false,
      searchWord: "",
      showSearchResult: false,
    };
  },
  props: {
    navDrawer: Object,
    createOrderRoom: Function,
    // orderRooms: Array,
    // drawer: Boolean,
  },
  computed: {
    orderRooms() {
      return this.navDrawer.orderRooms.filter((or) => or.show);
    },
    ownerPage() {
      return `/ownerPage/${this.navDrawer.storeName}`;
    },
    drawer: {
      get() {
        return this.$store.state.OrderRoomDrawer.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
  },
  methods: {
    searchRooms() {
      this.navDrawer.orderRooms.map((or) => {
        or.show = or.chickenName.includes(this.searchWord) ? true : false;
      });
      this.showSearchResult = true;
    },
    initSearch() {
      this.navDrawer.orderRooms.map((or) => {
        or.show = true;
      });
      this.showSearchResult = false;
      this.searchWord = "";
    },
    async matchRoom(storeName, roomNumber, price) {
      console.log("=== Create Match Room ===");

      // find Chicken House address and get instance
      const CHAddress = await this.AdminInstance.findChickenHouse(storeName);
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);
      const storeState = await ChickenHouseInstance.getChickenHouse();
      console.log(storeState);
      if (storeState._onOff == 0) {
        this.alertWhenStoreOff = true;
        return;
      }

      // find Room Address and get instnace
      const ethUserPay = +price;
      await ChickenHouseInstance.matchRoom(
        roomNumber,
        ethUserPay.toString()
      ).then((result) => {
        console.log(result);
        // this.$store.commit("STOP_TIMER");
        // socket!
        const message = {
          key: "ROOM-MATCHED",
          storeName: storeName,
          roomNumber: roomNumber,
        };
        this.$socket.send(JSON.stringify(message));
        // alert! Your room Matched!
        this.$store.commit("STOP_TIMER");
        this.$sotre.commit("SET_ROOM_INFO", {
          storeName: storeName,
          roomNumber: roomNumber,
        });
      });

      // storeIdx (if needed)
      console.log("=== Done Create Match Room ===");
    },
    closeDrawer() {
      this.setDrawer(false);
      this.navDrawer.orderRooms = [];
    },
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
  },
  mounted() {
    console.log("=== Mounted Navigation Drawer ===");
    // console.log(this.navDrawer.orderRooms[0].duration);
  },
  updated() {
    console.log("=== Updated Navigation Drawer ===");
  },
};
</script>

<style>
.v-navigation-drawer__content {
  height: 100%;
  overflow: hidden;
  /* overflow-y: auto;
  overflow-x: hidden; */
}
</style>
