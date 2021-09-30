<template>
  <router-view />
</template>

<script>
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from "@metamask/detect-provider";
import ContractInstance from "./ContractInstance";

const GANACHE_NET = 1337;

export default {
  name: "App",
  mounted() {
    console.log("App.vue Moutend");
  },
  async created() {
    console.log("App.vue Created");

    // ContractInstance 클래스 인스턴스 생성
    const contractInstance = new ContractInstance();
    // Admin Test Repository Instance 생성
    contractInstance.setAdminInstance();
    contractInstance.setDemoInstance();

    // window.ethereum 객체를 불러온다. (메타마스크 여부 확인)
    const provider = await detectEthereumProvider();

    // 메타마스크 유무에 따른 분기 처리
    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      startApp(provider); // initialize your app
      console.log("metask on");
      console.log(provider);
    } else {
      console.log("Please install MetaMask!");
    }

    // 메타마스크가 존재할 경우, 네트워크 및 계정 초기 설정
    async function startApp(provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }

      let accounts;
      // 메타마스크와 연결 유무에 따른 분기 처리
      if (provider.isConnected()) {
        accounts = await provider.request({ method: "eth_accounts" }); // 연결되기로 선택된 Accoutns 반환

        // 연결된 계정이 없을 경우
        if (accounts.length === 0) {
          accounts = await provider.request({ method: "eth_requestAccounts" }); // 연결되지 않은 계정을 연결시킨다.
        }
      } else {
        // 메타마스크 연결되지 않았을 경우
        console.error("MetaMask 와 연결하도록 하자.");
        accounts = await provider.request({ method: "eth_requestAccounts" }); // 연결되지 않은 계정을 연결시킨다.
      }
      // 현재 계정을 등록 한다.
      // ->

      contractInstance.getAdminInstance().setAccount(accounts[0]);
      contractInstance.getDemoInstance().setAccount(accounts[0]);
    }

    // 연결된 네트워크 상황에 따라 반응한다.
    // 현재는 Test중이므로, Ganache에만 잘 연결될 수 있도록 에러처리를 하자!

    // chainId 는 계속적으로 반응을 해야한다.
    const chainId = await provider.request({ method: "eth_chainId" });
    console.log(parseInt(chainId, 16));
    if (parseInt(chainId, 16) !== GANACHE_NET) {
      alert("네트워크를 테스트 주소로 변경해주세요!");
      // 알림을 계속해서 load하자!
      // handleChainChanged(chainId);
    }

    // 네트워크 변경할 경우, Reload 하는 이벤트
    provider.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId) {
      // We recommend reloading the page, unless you must do otherwise
      window.location.reload();
    }
    console.log("Done Created App.vue");
  }
};
</script>
