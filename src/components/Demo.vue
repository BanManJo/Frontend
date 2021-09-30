<template>
  <div>
    <v-layout
      style="
        color: black;
        padding: 25px;
        text-align: center;
        background-color: white;
      "
      align-center
      row
      wrap
    >
      <v-flex style="height: 100%; padding-bottom: 20px" xs12 sm12 md12>
        <h1 style="margin-bottom: 20px; line-height: 32px">Transaction History</h1>
        <!-- https://vuetifyjs.com/en/components/simple-tables/ -->
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.hash }}</td>
          </template>
        </v-data-table>
        <v-btn color="gray" @click="room.roomModal = true">Create Order Room</v-btn>
      </v-flex>
    </v-layout>

    <!-- modal -->
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
                <span>치킨이름: {{ menu.chicken }}, 가격: {{ menu.price }}</span>
              </template>
              <v-card>
                <v-card-text class="grey lighten-3">{{ menu.description }}</v-card-text>
                <v-card-actions>
                  <v-btn outline color="teal" @click="selectMenu(idx)">
                    {{
                    !menu.selected ? "선택됨" : "선택취소"
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
  data: () => ({
    DemoInstance: contractInstance.getDemoInstance(), // Admin Instance data
    // Create Room Model
    room: {
      isLoading: false,
      roomModal: false,
      roomName: null,
      // roomNumber: "",
      storeName: "BBQ",
      storeIdx: 0,
      // foodName: "",
      menus: [
        {
          chicken: "황금 올리브",
          price: "19,000₩",
          description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
          selected: false,
        },
        {
          chicken: "황금 올리브",
          price: "19,000₩",
          description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
          selected: false,
        },
        {
          chicken: "황금 올리브",
          price: "19,000₩",
          description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
          selected: false,
        },
        {
          chicken: "황금 올리브",
          price: "19,000₩",
          description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
          selected: false,
        },
        {
          chicken: "황금 올리브",
          price: "19,000₩",
          description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
          selected: false,
        },
        {
          chicken: "황금 올리브",
          price: "19,000₩",
          description: "고소한 올리브유로 티킨 바삭한 프라이드 치킨!",
          selected: false,
        },
      ],
      timer: 15,
      timerRule: (val) => val < 10 || `I don"t believe you!`,
    },

    //Data Table
    headers: [
      {
        text: "Transaction Hash",
        align: "center",
        sortable: false,
        value: "hash",
      },
    ],
    items: [],
  }),
  computed: {},
  methods: {
    selectMenu(_idx) {
      this.room.menus.forEach((menu, idx) => {
        if (idx !== _idx) {
          menu.selected = false;
        } else {
          menu.selected = true;
        }
      });
    },
    async createOrderRoom() {
      this.room.isLoading = true;
      console.log("pass");
      try {
        const transaction = await this.DemoInstance.createRoom(
          0,
          "BBQ",
          "황올"
        );
        console.dir(transaction);

        this.DemoInstance.watchIfCreated((error, result) => {
          if (!error) {
            this.room.isLoading = false;
            this.room.roomModal = false;

            this.items.push({ hash: transaction });
          }
        });
      } catch (e) {
        this.error = e.message;
        console.log(this.error);
      }
    },
  },
  async created() {
    await this.$store.commit(SET_DEMO_INSTANCE);
    // const count = await this.$DemoRepoInstance.getCount();
    // console.log("count:" + count);
    // await this.$DemoRepoInstance.createRoom(1, "BBQ", "Chicken");
  },
};
</script>
<style></style>
