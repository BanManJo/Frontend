<template>
  <v-container>
    <v-navigation-drawer
      style="overflow: hidden"
      v-model="drawer"
      absolute
      width="400"
    >
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
            @click="setDrawer(false)"
          >
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-btn>
          <v-text-field
            :label="$t('search')"
            color="secondary"
            hide-details
            style="max-width: 70%"
          >
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
              <v-btn
                @click="addOrderRooms"
                class="mt-n2"
                elevation="1"
                color="orange"
                fab
                x-small
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
        <v-row align="left" justify="center" class="mt-6">
          <!-- </v-list>
      <v-list dense app> -->
          <!-- <v-list-item-avatar class="align-self-center" color="white" contain>
            <v-img
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            />
          </v-list-item-avatar> -->
          <component :is="'h3'" :class="small">
            <template>
              {{ navDrawer.storeName }}
            </template>
            <template>
              <br />
              <small>Rooms. {{ navDrawer.roomCount }} </small> /
              <small>time(avg). {{ navDrawer.roomCount }}</small>
            </template>
          </component>
          <v-btn class="ml-2" min-width="0" text :to="ownerPage">
            <v-icon>mdi-account</v-icon>
          </v-btn>
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
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-col v-for="(orderRoom, idx) in orderRooms" :key="idx" text>
          <base-material-order-room-card
            color="orange"
            icon="mdi-clock-time-eight-outline"
            :title="orderRoom.subText"
            :value="orderRoom.headline"
            sub-icon="mdi-account-arrow-right"
            sub-icon-color="green"
            :sub-text="orderRoom.description"
            :store-name="navDrawer.storeName"
            :room-number="orderRoom.index"
            @matchRoom="matchRoom"
          />
        </v-col>
      </v-list>
    </v-navigation-drawer>
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
      collapseOnScroll: true,
      //   drawer: this.navDrawer.drawer,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      right: null
    };
  },
  props: {
    navDrawer: Object,
    createOrderRoom: Function
    // orderRooms: Array,
    // drawer: Boolean,
  },
  computed: {
    orderRooms() {
      return this.navDrawer.orderRooms;
    },
    ownerPage() {
      return `/ownerPage2/${this.navDrawer.storeName}`;
    },
    drawer: {
      get() {
        return this.$store.state.OrderRoomDrawer.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      }
    }
  },
  methods: {
    async matchRoom(storeName, roomNumber) {
      console.log(storeName, roomNumber);
      console.log("=== Create Match Room ===");

      const AdminInstance = contractInstance.getAdminInstance();
      // find Chicken House address and get instance
      const CHAddress = await AdminInstance.findChickenHouse(storeName);
      const ChickenHouseInstance = contractInstance.getChickenHouseInstance(
        CHAddress
      );

      // find Room Address and get instnace
      const ORAddress = await ChickenHouseInstance.findOrderRoom(roomNumber);
      const OrderRoomInstance = contractInstance.getOrderRoomInstance(
        ORAddress
      );

      await OrderRoomInstance.matchRoom(roomNumber).then(result => {
        console.log(result);
      });

      // storeIdx (if needed)
      console.log("=== Done Create Match Room ===");
    },
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    }),
    addOrderRooms(chickenName, price, finish) {
      this.navDrawer.orderRooms.push({
        headline: chickenName,
        subText: `종료 시간: ${finish} | ${price}₩`,
        show: false,
        description: "황금올리브 같이 먹을 분 구함!~",
        index: 2
      });
    }
  },
  async mounted() {
    console.log("=== Mounted Navigation Drawer ===");
  },
  updated() {
    console.log("=== Updated Navigation Drawer ===");
  }
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
