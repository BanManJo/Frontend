<template>
  <div>
    <v-navigation-drawer v-model="navDrawer.drawer" absolute width="350">
      <v-list align="center" dense app>
        <v-spacer />
        <v-text-field
          :label="$t('search')"
          color="secondary"
          hide-details
          style="max-width: 300px"
        >
          <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
            <v-btn class="mt-n2" elevation="12" fab small>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-list>
      <v-list dense app>
        <v-list-item>
          <!-- <v-list-item-avatar class="align-self-center" color="white" contain>
            <v-img
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            />
          </v-list-item-avatar> -->
          <v-list-item-content>
            <component :is="'h3'" :class="small">
              <template>
                {{ navDrawer.storeName }}
              </template>
              <template>
                <br />
                <small>주문방 개수: {{ navDrawer.roomCount }}</small>
              </template>
            </component>
          </v-list-item-content>
          <v-btn class="ml-2" min-width="0" text :to="ownerPage">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-list dense app>
        <v-divider></v-divider>
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
  </div>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      //   drawer: this.navDrawer.drawer,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      right: null
    };
  },
  props: {
    navDrawer: Object
    // orderRooms: Array,
    // drawer: Boolean,
  },
  computed: {
    orderRooms() {
      return this.navDrawer.orderRooms;
    },
    ownerPage() {
      return `/ownerPage2/${this.navDrawer.storeName}`;
    }
  },
  methods: {
    matchRoom(storeName, roomNumber) {
      console.log(storeName, roomNumber);
      console.log("=== Create Match Room ===");

      let AdminInstance = contractInstance.getAdminInstance();
      // menus
      AdminInstance.matchRoom(storeName, roomNumber).then(result => {
        console.log(result);
      });

      // storeIdx (if needed)
      console.log("=== Done Create Match Room ===");
    }
  }
};
</script>

<style></style>
