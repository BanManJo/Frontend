<template>
  <div>
    <v-layout style="color: black; padding: 25px; text-align: center; background-color: white"  align-center row wrap>
      <v-flex style="height:100%; padding-bottom:20px;" xs12 sm12 md12>
        <h1 style="margin-bottom: 20px; line-height: 32px;">Transaction History</h1>
        <!-- https://vuetifyjs.com/en/components/simple-tables/ -->
        <v-data-table :headers="headers">
          <td :class="headers[0].class">1</td>
          <td :class="headers[1].class">2</td>
          <td :class="headers[2].class">3</td>
          <td :class="headers[3].class">4</td>
          <td :class="headers[4].class">5</td>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    //table
    headers: [
      { text: 'Txn Hash', value: '_id', sortable: false },
      { text: 'Block', value: 'title', sortable: false },
      { text: 'Age', value: '_user', sortable: true, class: 'hidden-sm-and-down'  },
      { text: 'From', value: 'cnt.view', sortable: false },
      { text: 'To', value: 'cnt.like', sortable: false }
    ],
  }),
  async mounted() {
    const count = await this.$DemoRepoInstance.getCount();
    console.log('count:' + count);
    await this.$DemoRepoInstance.createRoom(1, 'BBQ', 'Chicken');
  }
};
</script>
<style></style>
