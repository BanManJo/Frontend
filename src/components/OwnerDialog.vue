<template>
  <v-app>
    <v-container>
      <!-- modal -->
      <v-dialog v-model="owner.ownerModal" max-width="290">
        <v-card>
          <v-card-title class="headline">방생성</v-card-title>
          <v-card-text style="text-align: center">
            <v-progress-circular
              indeterminate
              color="red"
              v-show="owner.isLoading"
            ></v-progress-circular>
            <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
              <v-text-field
                v-model="owner.roomNumber"
                placeholder="1"
                label="menu"
                persistent-hint
              ></v-text-field>
              <v-text-field
                v-model="owner.storeName"
                placeholder="BBQ"
                label="이름"
                persistent-hint
              ></v-text-field>
              <v-text-field
                v-model="owner.foodName"
                placeholder="Chicken"
                label="가격"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
              <v-btn @click="registerChickenHouse()" outline color="teal"
                >Create Chicken House</v-btn
              >
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 다이아로그 끝 -->
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: ["owner"],
  data() {
    return {};
  },
  mounted() {
    console.log("aa");
  }
};
</script>

<style></style>
