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
        <h1 style="margin-bottom: 20px; line-height: 32px">
          Transaction History
        </h1>
        <!-- https://vuetifyjs.com/en/components/simple-tables/ -->
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.hash }}</td>
          </template>
        </v-data-table>
        <v-btn color="gray" @click="room.roomModal = true"
          >Create Chicken House</v-btn
        >
      </v-flex>
    </v-layout>

    <!-- modal -->
    <v-dialog v-model="room.roomModal" max-width="290">
      <v-card>
        <v-card-title class="headline">방생성</v-card-title>
        <v-card-text style="text-align: center">
          <v-progress-circular
            indeterminate
            color="red"
            v-show="room.isLoading"
          ></v-progress-circular>
          <v-flex style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
            <v-text-field
              v-model="room.roomNumber"
              placeholder="1"
              label="방이름"
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="room.storeName"
              placeholder="BBQ"
              label="가맹점이름"
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="room.foodName"
              placeholder="Chicken"
              label="메뉴"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-flex style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
            <v-btn @click="registerChickenHouse()" outline color="teal"
              >Create Chicken House</v-btn
            >
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { SET_ADMIN_INSTANCE } from "../vuex/store";
import { mapState } from "vuex";
export default {
  data: () => ({
    // Create Room Model
    room: {
      isLoading: false,
      roomModal: false,
      roomNumber: "",
      storeName: "",
      foodName: "",
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
  computed: {
    ...mapState({
      AdminInstance: (state) => state.AdminTestRepoInstance,
    }),
  },
  methods: {
    async registerChickenHouse() {
      this.room.isLoading = true;
      try {
        const transaction =
          await this.$AdminTestRepository.registerChickenHouse();
        console.dir(transaction);
      } catch (e) {
        this.error = e.message;
      }
    },
  },
  async created() {
    await this.$store.commit(SET_ADMIN_INSTANCE);
    // const count = await this.$DemoRepoInstance.getCount();
    // console.log('count:' + count);
    // await this.$DemoRepoInstance.createRoom(1, 'BBQ', 'Chicken');
  },
};
</script>
<style></style>
