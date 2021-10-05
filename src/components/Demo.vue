<template>
  <v-app>
    <v-layout
      style="color: black; padding: 25px; text-align: center; background-color: white"
      align-center
      row
      wrap
    >
      <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
        <h1 style="margin-bottom: 20px; line-height: 32px;">
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
        <v-btn
          style="margin-top:15px;"
          color="gray"
          @click="room.roomModal = true"
          >Create Order Room
        </v-btn>
        <h1 style="padding-top:25px; line-height: 32px;">
          Websocket Information
        </h1>

        <v-container>
          <v-row>
            <v-col cols="24" sm="12">
              <v-text-field
                v-model="this.$store.state.wsMessage"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="24" sm="12">
              <v-text-field v-model="listener" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>

    <!-- modal -->
    <v-dialog v-model="room.roomModal" max-width="290">
      <v-card>
        <v-card-title class="headline">방생성</v-card-title>
        <v-card-text style="text-align: center;">
          <v-progress-circular
            indeterminate
            color="red"
            v-show="room.isLoading"
          ></v-progress-circular>
          <v-flex style="height:100%; padding-bottom:5px;" xs12 sm12 md12>
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
          <v-flex style="height:100%; padding-bottom:5px;" xs12 sm12 md12>
            <v-btn @click="createOrderRoom" color="teal">Create Room</v-btn>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";

const contractInstance = new ContractInstance();
export default {
  data: () => ({
    listener: "test",
    DemoInstance: contractInstance.getDemoInstance(), // Admin Instance data
    // Create Room Model
    room: {
      isLoading: false,
      roomModal: false,
      roomNumber: "",
      storeName: "",
      foodName: ""
    },
    //Data Table
    headers: [
      {
        text: "Transaction Hash",
        align: "center",
        sortable: false,
        value: "hash"
      }
    ],
    items: []
  }),
  methods: {
    async createOrderRoom() {
      this.room.isLoading = true;
      try {
        const transaction = await this.DemoInstance.createRoom(
          this.room.roomNumber,
          this.room.storeName,
          this.room.foodName
        );
        this.DemoInstance.watchIfCreated2((error, result) => {
          if (!error) {
            console.log(result);
            this.$socket.send(JSON.stringify(result));
            this.room.isLoading = false;
            this.room.roomModal = false;
            this.items.push({ hash: transaction });
          }
          return true;
        });
      } catch (e) {
        this.error = e.message;
        console.error(e.message);
      }
    }
  },
  async mounted() {
    // const count = await this.$DemoRepoInstance.getCount();
    // console.log('count:' + count);
    // await this.$DemoRepoInstance.createRoom(1, 'BBQ', 'Chicken');
    this.DemoInstance.watchIfCreated((error, result) => {
      if (!error) {
        this.listener = "alalalal";
      }
    });
  }
};
</script>
<style></style>
