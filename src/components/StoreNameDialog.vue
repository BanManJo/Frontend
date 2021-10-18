<template>
  <!-- modal -->
  <v-dialog v-model="owner.ownerModal" max-width="290">
    <v-card>
      <v-card-title class="headline">메뉴 수정</v-card-title>
      <v-card-text style="text-align: center">
        <v-progress-circular
          indeterminate
          color="red"
          v-show="owner.isLoading"
        ></v-progress-circular>
        <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
          <v-text-field
            v-model="menu"
            placeholder="BBQ"
            label="메뉴"
            persistent-hint
          ></v-text-field>
          <v-checkbox v-model="sunsal" label="순살?"></v-checkbox>

          <v-text-field
            v-model="price"
            placeholder="Chicken"
            label="가격"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col style="height: 100%; padding-bottom: 5px" xs12 sm12 md12>
          <v-btn @click="setMenus" color="teal">확인</v-btn>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- 다이아로그 끝 -->
</template>
