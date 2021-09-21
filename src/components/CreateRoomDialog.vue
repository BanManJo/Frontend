<template>
  <div>
    <v-dialog v-model="room.roomModal" scrollable max-width="400">
      <v-card>
        <v-card-title class="headline">{{ room.storeName }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="text-align: center">
          <v-progress-circular
            indeterminate
            color="red"
            v-show="room.isLoading"
          ></v-progress-circular>
          <!-- <v-flex style="height: 100%; padding-bottom: 5px" xs12 sm12 md12> -->
          <v-text-field
            v-model="room.roomName"
            placeholder="황금올리브 ㄲ?"
            label="방이름"
            persistent-hint
          ></v-text-field>
        </v-card-text>
        <v-card-text style="text-align: center; max-height: 250px">
          <v-expansion-panel>
            <v-expansion-panel-content
              v-for="(menu, idx) in room.menus"
              :key="idx"
            >
              <template v-slot:actions>
                <v-icon color="primary">{{
                  menu.selected ? "done" : "expand_more"
                }}</v-icon>
              </template>
              <template v-slot:header>
                <span
                  >치킨이름: {{ menu.chicken }}, 가격: {{ menu.price }}</span
                >
              </template>
              <v-card>
                <v-card-text class="grey lighten-3">
                  {{ menu.description }}</v-card-text
                >
                <v-card-actions>
                  <v-btn outline color="teal" @click="selectMenu(idx)">{{
                    !menu.selected ? "선택됨" : "선택취소"
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        <v-card-text style="text-align: center">
          <v-slider
            v-model="room.timer"
            color="orange"
            label="Duration"
            hint="Minutes"
            min="1"
            max="30"
            thumb-label
          ></v-slider>
          <v-chip class="pa-1"> {{ room.timer }} Minutes </v-chip>
          <!-- </v-flex> -->
          <!-- <v-flex style="height: 100%; padding-bottom: 5px" xs12 sm12 md12> -->
          <!-- </v-flex> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="createOrderRoom()" outline color="teal"
            >Create Room</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // not loaded on map page
      // isLoading: false,
      // roomModal: false,
      // roomName: null,
      // // roomNumber: "",
      // storeIdx: 0,
      // // foodName: "",
      // menus: [
      //   {
      //     chicken: "황금 올리브",
      //     price: "19,000₩",
      //     description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
      //     selected: false,
      //   },
      // ],
      // timer: 15,
      // storeName: room.storeName,
    };
  },
  computed: {
    ...mapState({
      AdminInstance: (state) => state.AdminTestRepoInstance,
    }),
  },
  props: {
    room: Object,
  },
  methods: {
    createOrderRoom() {
      alert(1);
    },
    selectMenu(idx) {
      this.room.menus.forEach((menu, _idx) => {
        if (_idx === idx) {
          menu.selected = !menu.selected;
        } else {
          menu.selected = false;
        }
      });
    },
  },
  updated() {
    // 변수가 변경 될때마다 update 실행된다.!
    // if (this.room.roomModal === false) {
    //   console.log("close");
    //   // this.room.menus = [];
    // } //
    // not loaded on map page
    // this.isLoading = false;
    // this.roomModal = false;
    // this.roomName = null;
    // // roomNumber ""
    // this.storeIdx = 0;
    // // foodName ""
    // this.menus = [
    //   {
    //     chicken: "황금 올리브",
    //     price: "19,000₩",
    //     description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
    //     selected: false,
    //   },
    // ];
    // this.timer = 15;
    // this.storeName = room.storeName;
    console.log("updated");
    // console.log(this.storeName); // undefined
    // room // props , not defined
  },
  watch: {
    room: (roomState) => {
      console.log(roomState);
      if (roomState.roomModal === false) {
        console.log("close close");
      }
    },
  },
};
</script>

<style>
</style>