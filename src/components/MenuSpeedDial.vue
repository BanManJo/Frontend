<template>
  <div>
    <v-speed-dial
      v-model="fab"
      top
      right
      direction="bottom"
      transition="slide-y-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="grey darken-2" x-large dark fab>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-view-dashboard
          </v-icon>
        </v-btn>
      </template>
      <v-container
        style="margin:0; padding:0"
        v-for="menuItem in menuItems"
        :key="menuItem.title"
      >
        <!-- <v-hover v-slot="{ hover }"> -->
        <!-- <v-context> -->
        <!-- <v-expand-transition> -->
        <v-btn
          elevation="3"
          color="yellow"
          dark
          class="black--text font-weight-bold"
          style="text"
          rounded
          large
          :to="menuItem.to"
          @click="menuItem.event"
        >
          <v-icon left>{{ menuItem.icon }}</v-icon>
          {{ menuItem.title }}
        </v-btn>
        <!-- <v-btn fab dark small :color="menuItem.color">
          <v-icon>{{ menuItem.icon }}</v-icon>
        </v-btn> -->
        <!-- </v-expand-transition> -->
        <!-- </v-context> -->
        <!-- </v-hover> -->
      </v-container>
    </v-speed-dial>
    <register-chicken-house-dialog
      :registerCH="registerCH"
    ></register-chicken-house-dialog>
  </div>
</template>

<script>
// Instance 사용하기 위한 구문
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  name: "MenuSpeedDial",
  components: {
    RegisterChickenHouseDialog: () => import("./RegisterChickenHouseDialog.vue")
  },
  data() {
    return {
      fab: false,
      menuItems: [
        {
          title: "치킨집 등록하기",
          color: "green",
          icon: "mdi-pencil",
          event: () => {
            this.registerCH.dialog = true;
          }
        },
        {
          title: "컨트랙트 테스트",
          color: "indigo",
          icon: "mdi-pencil",
          event: () => {
            this.testContractInstance();
          }
        },
        {
          title: "메뉴를 넣자",
          color: "red",
          icon: "mdi-pencil",
          event: null
        },
        {
          title: "사용자 페이지",
          color: "red",
          icon: "mdi-account",
          event: null,
          to: "/UserMyPage"
        }
      ],
      registerCH: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      }
    };
  },
  methods: {
    testContractInstance() {
      // AdminInstance.getStoreCount()
      const AdminInstance = contractInstance.getAdminInstance();
      AdminInstance.getStoreCount().then(count => {
        // resolve
        alert(`Store Counts : ${count}`);
      });
      // ${result.chickens} ${result.prices}
      // (인자) => {내용} // 함수!
      // function(인자){내용}
    },
    moveMyPage() {
      window.location.href = "/UserMyPage";
    }
  }
};
</script>

<style>
.v-speed-dial {
  position: absolute;
  margin-top: 50px;
  margin-right: 120px;
}

.v-btn--floating {
  position: relative;
}
</style>
