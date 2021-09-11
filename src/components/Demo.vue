<template>
  <div>
    <v-layout style="color: black; padding: 25px; text-align: center; background-color: white" align-center row wrap>
      <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
        <h1 style="margin-bottom: 20px; line-height: 32px;">Transaction History</h1>
        <!-- https://vuetifyjs.com/en/components/simple-tables/ -->
        <v-data-table :headers="headers" :items="items">
          <td :class="headers[0].class">1</td>
          <td :class="headers[1].class">2</td>
          <td :class="headers[2].class">3</td>
          <td :class="headers[3].class">4</td>
          <td :class="headers[4].class">5</td>
        </v-data-table>
        <v-btn color="gray" @click="roomModal = true">Create Order Room</v-btn>
      </v-flex>
    </v-layout>

    <!-- modal -->
    <v-dialog v-model="roomModal" max-width="290">
      <v-card>
        <v-card-title class="headline">방생성</v-card-title>
        <v-card-text style="text-align: center;">
          <v-flex style="height:100%; padding-bottom:5px;" xs12 sm12 md12>
            <v-text-field
              v-model="roomNumber"
              placeholder="1"
              label="방이름"
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="storeName"
              placeholder="BBQ"
              label="가맹점이름"
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="foodName"
              placeholder="Chicken"
              label="메뉴"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-flex style="height:100%; padding-bottom:5px;" xs12 sm12 md12>
            <v-btn @click="createOrderRoom()" outline color="teal">Create Room</v-btn>
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
export default {
  data: () => ({
    roomModal: false,
    roomNumber: null,
    storeName: null,
    foodName: null,

    //asset
    createAssetSuccess: false,

    //table
    headers: [
      {text: 'Txn Hash', value: '_id', sortable: false},
      {text: 'Block', value: 'title', sortable: false},
      {text: 'Age', value: '_user', sortable: true, class: 'hidden-sm-and-down'},
      {text: 'From', value: 'cnt.view', sortable: false},
      {text: 'To', value: 'cnt.like', sortable: false}
    ],
    items: [],
  }),
  methods: {
    async createOrderRoom() {
      try {
        alert('주문 생성');
        console.log('주문 생성');
      } catch (e) {
        console.error(e);
      }
    },
  },
  async mounted() {
    const count = await this.$DemoRepoInstance.getCount();
    console.log('count:' + count);
    // await this.$DemoRepoInstance.createRoom(1, 'BBQ', 'Chicken');
  }
};
</script>
<style></style>
