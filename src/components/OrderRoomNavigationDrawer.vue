<template>
  <div>
    <v-navigation-drawer v-model="navDrawer.drawer" absolute>
      <v-list class="pa-0">
        <v-toolbar dense flat>
          <v-toolbar-title class="pa-1">{{
            navDrawer.storeName
          }}</v-toolbar-title>
          <!-- <v-spacer></v-spacer> -->
          <v-text-field
            hint="방 제목 검색"
            placeholder="Search..."
          ></v-text-field>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <!-- <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn> -->
        </v-toolbar>
      </v-list>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title
              >주문방 개수: {{ navDrawer.roomCount }}</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-1">
        <v-divider></v-divider>
        <v-card v-for="(orderRoom, idx) in orderRooms" :key="idx" flat>
          <!-- <img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100px"
        >
        </img> -->

          <v-card-title primary-title>
            <div>
              <div class="headline">{{ orderRoom.headline }}</div>
              <span class="grey--text">{{ orderRoom.subText }}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>Order</v-btn>
            <v-btn flat color="purple">Chatting</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="orderRoom.show = !orderRoom.show">
              <v-icon>{{
                orderRoom.show ? "keyboard_arrow_down" : "keyboard_arrow_up"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="orderRoom.show">
              {{ orderRoom.description }}
            </v-card-text>
          </v-slide-y-transition>
          <v-divider></v-divider>
        </v-card>
      </v-list>
      <button>dkjdfkj</button>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   drawer: this.navDrawer.drawer,
    };
  },
  props: {
    navDrawer: Object,
    // orderRooms: Array,
    // drawer: Boolean,
  },
  computed: {
    orderRooms() {
      return this.navDrawer.orderRooms;
    },
  },
};
</script>

<style>
</style>