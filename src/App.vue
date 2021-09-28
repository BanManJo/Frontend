<template>
  <router-view />
</template>

<script>
//
import ContractInstance from "./ContractInstance";
// ContractInstance 클래스 인스턴스 생성
const contractInstance = new ContractInstance();
// Admin Test Repository Instance 생성
contractInstance.setAdminInstance();

export default {
  name: "App",
  created() {
    console.log("App.vue Created");
  },
};
</script>
