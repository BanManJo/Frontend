<template>
  <div>
    <v-dialog v-model="room.roomModal" scrollable max-width="400" :persistent="isCreating">
      <v-card>
        <v-card-title class="headline">{{ room.storeName }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="text-align: center; overflow: hidden">
          <v-progress-circular indeterminate color="red" v-show="room.isLoading"></v-progress-circular>
        </v-card-text>
        <v-card-subtitle>메뉴 선택</v-card-subtitle>
        <v-card-text class="ma-0 pa-0">
          <v-expansion-panels>
            <v-expansion-panel v-for="(menu, idx) in room.menus" :key="idx">
              <v-expansion-panel-header align="center">
                <v-col>
                  <span>{{ menu.chickenName }}</span>
                </v-col>
                <v-col>
                  <span>
                    순살
                    <v-icon>
                      {{
                      menu.menuState === "2"
                      ? "mdi-checkbox-marked"
                      : "mdi-checkbox-blank-outline"
                      }}
                    </v-icon>
                  </span>
                </v-col>
                <v-col>
                  <span>{{ menu.price }}ETH</span>
                </v-col>
                <template v-slot:actions>
                  <v-icon color="primary">
                    {{
                    menu.selected ? "mdi-check" : "$expand"
                    }}
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card text>
                  <v-card-text>{{ menu.description }}</v-card-text>
                  <v-card-actions>
                    <v-btn outlined color="teal" @click="selectMenu(idx)">
                      {{
                      !menu.selected ? "선택" : "선택취소"
                      }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text style="text-align: center; overflow: hidden">
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
          <v-btn @click="checkStore()" outlined color="teal">Create Room</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-material-snackbar
      v-model="alert"
      :type="color"
      v-bind="{
        top: true,
        center: true
      }"
    >
      <span class="font-weight-bold">{{ color }}</span>
      — {{ content }}
    </base-material-snackbar>
  </div>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
import Icons from "../views/dashboard/component/Icons.vue";
const contractInstance = new ContractInstance();

export default {
  components: { Icons },
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data,
      isCreating: false,
      alert: false,
      color: "",
      content: "",
      // not loaded on map page
      // isLoading: false,
    };
  },
  computed: {},
  props: {
    room: Object,
  },
  methods: {
    async checkStore() {
      const CHAddress = await this.AdminInstance.findChickenHouse(
        this.room.storeName
      );
      console.log(CHAddress);
      const ChickenHouseInstance =
        contractInstance.getChickenHouseInstance(CHAddress);

      const storeState = await ChickenHouseInstance.getChickenHouse();
      console.log(storeState);
      if (storeState._onOff == 0) {
        this.alert = true;
        this.color = "warning";
        this.content = "죄송해요! 가게가 지금 준비중입니다!";
        return;
      } else {
        this.createOrderRoom();
      }
    },
    async createOrderRoom() {
      console.log("=== Create Order Room ===");
      try {
        const menu = this.room.menus.filter((data) => data.selected)[0];
        console.log(`---- get Menu and Create Room, menu: ${menu}`);
        if (menu === undefined) {
          this.alert = true;
          this.color = "warning";
          this.content = "메뉴를 선택해 주세요!~";
          return;
        }
        // storeName
        const _storeName = this.room.storeName;
        // price
        const _price = menu.price;
        // _finish
        const _timer = this.room.timer;
        // chicken
        const _chicken = menu.chickenName;
        // menuState
        const _menuState = menu.menuState;
        console.log(menu);
        this.room.isLoading = true;
        this.isCreating = true;
        /* 새롭게 구조화 된 부분 */
        const CHAddress = await this.AdminInstance.findChickenHouse(_storeName);
        console.log(CHAddress);
        const ChickenHouseInstance =
          contractInstance.getChickenHouseInstance(CHAddress);

        // user가 방을 만들면서 보낼 금액
        const ethPaidByUser = +_price / 2;
        ChickenHouseInstance.createRoom(
          _storeName,
          _price,
          _timer,
          _chicken,
          _menuState,
          ethPaidByUser.toString()
        )
          .then(async (transaction) => {
            console.log(`---- Create Order Room Succeed : ${transaction}`);
            const roomNumber = (await ChickenHouseInstance.getRoomsCount()) - 1;
            this.$store.commit("START_TIMER", +_timer);
            console.log(roomNumber);
            this.$store.commit("SET_ROOM_INFO", {
              storeName: _storeName,
              roomNumber: roomNumber,
            });
            this.$store.commit("SNACKBAR_ALERT", {
              title: "방 생성 알림",
              content: `${_storeName} 에 ${roomNumber}번 방이 생성되었습니다.`,
              type: "success",
            });
            this.room.isLoading = false;
            this.room.roomModal = false;
            this.isCreating = false;
            // alert 방생성되었습니다! by socket
          })
          .catch((error) => {
            if (error.code === 4001) {
              console.log("--- User Denied Tsc ----");
              this.room.isLoading = false;
              this.isCreating = false;
            }
          });
      } catch (error) {
        console.log(error);
      }
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
  },
  watch: {},
};
</script>

<style></style>
