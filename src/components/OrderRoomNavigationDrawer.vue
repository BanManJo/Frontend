<template>
  <div>
    <v-navigation-drawer v-model="navDrawer.drawer" absolute width="300">
      <v-list class="pa-0">
        <v-toolbar dense text>
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
      <v-list dense nav>
        <v-list-item>
          <v-list-item-avatar class="align-self-center" color="white" contain>
            <v-img
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
              max-height="30"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="display-1"
              >주문방 개수: {{ navDrawer.roomCount }}</v-list-item-title
            >
          </v-list-item-content>
          <v-btn class="ml-2" min-width="0" text :to="ownerPage">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-list-item>
        <!-- <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title
              >주문방 개수: {{ navDrawer.roomCount }}</v-list-tile-title
            >
          </v-list-tile-content>
          <router-link :to="ownerPage">Owner</router-link>
        </v-list-tile> -->
      </v-list>
      <v-list class="pt-1">
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
          />
        </v-col>
        <!-- <v-card v-for="(orderRoom, idx) in orderRooms" :key="idx" text> -->
        <!-- <img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100px"
        >
        </img> -->

        <!-- <v-card-title primary-title>
            <div>
              <div class="headline">{{ orderRoom.headline }}</div>
              <span class="grey--text">{{ orderRoom.subText }}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn text>Order</v-btn>
            <v-btn text color="purple">Chatting</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="orderRoom.show = !orderRoom.show">
              <v-icon>{{
                orderRoom.show ? "mdi-arrow-down" : "mdi-arrow-up"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="orderRoom.show">
              {{ orderRoom.description }}
            </v-card-text>
          </v-slide-y-transition>
          <v-divider></v-divider>
        </v-card> -->
      </v-list>
      <!-- <v-navigation-drawer floating permanent stateless value="true">
        <v-list dense>
          <v-list-tile v-for="item in items" :key="item.title" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer> -->
      <!-- <div id="contents" style="right: 0%; z-index: 10">
        <button>dkjdfkj</button>
        <div style="width: 300px; height: 200px; background: white"></div>
      </div> -->
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   drawer: this.navDrawer.drawer,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" },
      ],
      right: null,
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
    ownerPage() {
      return `/ownerPage1/${this.navDrawer.storeName}`;
    },
  },
};
</script>

<style>
</style>