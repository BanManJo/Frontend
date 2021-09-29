<template>
  <div>
    <v-dialog v-model="room.roomModal" scrollable max-width="400">
      <v-card>
        <v-card-title class="headline">{{ room.storeName }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="text-align: center">
          <v-progress-circular indeterminate color="red" v-show="room.isLoading"></v-progress-circular>
          <!-- <v-flex style="height: 100%; padding-bottom: 5px" xs12 sm12 md12> -->
          <v-text-field v-model="room.roomName" placeholder="황금올리브 ㄲ?" label="방이름" persistent-hint></v-text-field>
        </v-card-text>
        <v-card-text style="text-align: center; max-height: 250px">
          <v-expansion-panel>
            <v-expansion-panel-content v-for="(menu, idx) in room.menus" :key="idx">
              <template v-slot:actions>
                <v-icon color="primary">
                  {{
                  menu.selected ? "done" : "expand_more"
                  }}
                </v-icon>
              </template>
              <template v-slot:header>
                <span>치킨이름: {{ menu.chicken }}, 가격: {{ menu.price }}₩</span>
              </template>
              <v-card>
                <v-card-text class="grey lighten-3">{{ menu.description }}</v-card-text>
                <v-card-actions>
                  <v-btn outline color="teal" @click="selectMenu(idx)">
                    {{
                    !menu.selected ? "선택" : "선택취소"
                    }}
                  </v-btn>
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
          <v-chip class="pa-1">{{ room.timer }} Minutes</v-chip>
          <!-- </v-flex> -->
          <!-- <v-flex style="height: 100%; padding-bottom: 5px" xs12 sm12 md12> -->
          <!-- </v-flex> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="createOrderRoom()" outline color="teal">Create Room</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data
      // not loaded on map page
      // isLoading: false,
    };
  },
  computed: {},
  props: {
    room: Object,
  },
  methods: {
    async createOrderRoom() {
      console.log("=== Create Order Room ===");
      const menu = this.room.menus.filter((data) => data.selected)[0];
      console.log(`---- get Menu and Create Room, menu: ${menu}`);
      if (menu === undefined) {
        alert("메뉴를 선택해 주세요.");
        return;
      }
      // storeName
      const _storeName = this.room.storeName;
      // price
      const _price = menu.price;
      // _finish
      const _timer = this.room.timer;
      // chicken
      const _chicken = menu.chicken;

      this.room.isLoading = true;
      const tsc = await this.AdminInstance.createRoom(
        _storeName,
        _price,
        _timer,
        _chicken
      );
      console.log(`---- Create Order Room Succeed : ${tsc}`);
      this.room.isLoading = false;
      console.log("=== Doen Create Order Room ===");
    },
    selectMenu(idx) {
      console.log(`=== Select Menu : ${idx} ===`);
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
    console.log("=== Updated CreateRoomDialog.vue ===");
    // 변수가 변경 될때마다 update 실행된다.!
    // if (this.room.roomModal === false) {
    //   console.log("close");
    //   // this.room.menus = [];
    // } //
    // not loaded on map page
    // this.isLoading = false;
    // console.log("updated");
    // console.log(this.storeName); // undefined
    // room // props , not defined
  },
  watch: {},
};
</script>

<style>
</style>