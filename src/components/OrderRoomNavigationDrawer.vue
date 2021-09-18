<template>
  <v-navigation-drawer v-model="navDrawer.drawer" width="350" absolute>
    <v-list class="pa-0">
      <v-toolbar dense>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </v-list>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list class="pt-1">
      <v-divider></v-divider>
      <v-card v-for="(orderRoom, idx) in orderRooms" :key="idx">
        <img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        >
        </img>

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
  </v-navigation-drawer>
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