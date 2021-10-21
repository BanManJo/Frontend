<template>
  <div>
    <v-dialog
      v-model="registerCH.dialog"
      transition="dialog-bottom-transition"
      width="80%"
    >
      <v-card class="overflow-y-hidden" max-height="600">
        <v-app-bar color="grey lighten-4 " dark elevation="1">
          <v-btn
            class="ma-0 pa-0 text-h4 font-weight-bold"
            text
            color="green"
            @click="registerChickenHouse"
            ><v-icon large>mdi-account-edit </v-icon>등록하기</v-btn
          >
          <v-spacer></v-spacer>

          <v-toolbar-title class="black--text text-h3 font-weight-bold"
            >치킨집 등록</v-toolbar-title
          >

          <v-spacer></v-spacer>

          <v-btn
            class="ma-0 pa-0 text-h4"
            text
            color="black"
            icon
            @click="registerCH.dialog = false"
            ><v-icon large>mdi-backspace </v-icon></v-btn
          >
        </v-app-bar>
        <v-sheet class="overflow-y-auto" height="600">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="2" lg="2">
              <h3>치킨집 이름</h3>
            </v-col>
            <v-col cols="12" sm="3" lg="3">
              <v-text-field
                v-model="storeName"
                label="Store Name"
                placeholder="BBQ 부천점"
                :rules="[required]"
                :disabled="nameOk"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" lg="1">
              <v-btn
                v-if="!nameOk"
                @click="checkNameRedundancy"
                color="primary"
                class="font-weight-bold text-h5"
                small
                >중복 확인</v-btn
              >
              <v-btn
                v-else
                @click="nameOk = false"
                color="primary"
                class="font-weight-bold"
                small
                >수정 하기</v-btn
              >
            </v-col>
          </v-row>

          <v-row justify="center" align="center">
            <v-col cols="12" sm="2" lg="2">
              <h3>주소 입력</h3>
            </v-col>
            <v-col cols="12" sm="3" lg="3">
              <v-text-field
                id="addressField"
                label="Address"
                placeholder="도로명 주소"
                suffix-inner-icon="mdi-map-marker"
                v-model="address"
                :rules="[required]"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" lg="1">
              <v-btn
                @click="execDaumPostcod"
                color="primary"
                class="font-weight-bold text-h5"
                small
                >주소 찾기</v-btn
              >
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="2" lg="2"></v-col>
            <v-col cols="12" sm="4" lg="4">
              <div
                id="map-chicken-house"
                style="
                width: 100%;
                height: 200px;
                margin-top: 10px;
                display: none;
              "
              ></div>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="2" lg="2">
              <h3>메뉴 등록</h3>
            </v-col>
            <v-col cols="12" sm="2" lg="1">
              <v-text-field
                v-model="chicken"
                color="purple darken-2"
                label="치킨 이름"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" lg="1">
              <v-text-field
                v-model="price"
                color="blue darken-2"
                label="가격"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" lg="1">
              <v-checkbox v-model="sunsal" label="순살?"></v-checkbox>
            </v-col>
            <v-col cols="12" sm="1" lg="1">
              <v-btn
                @click="addMenu"
                class="mx-1"
                fab
                dark
                small
                color="indigo"
              >
                <v-icon large dark>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="1"></v-col>
            <v-col cols="5">
              <v-textarea
                v-model="description"
                label="메뉴 설명"
                clearable
                no-resize
                outlined
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row class="mb-10" justify="center" align="start">
            <v-col cols="12" sm="2" lg="2">
              <h3>등록된 메뉴</h3>
            </v-col>
            <v-col cols="12" sm="7" lg="6">
              <v-row>
                <template v-for="(menu, idx) in menus">
                  <v-col
                    v-if="menu.appended"
                    :key="idx"
                    cols="12"
                    sm="6"
                    lg="6"
                  >
                    <base-material-menu-card
                      color="#FF8C00"
                      icon="mdi-food-drumstick"
                      :title="menu.chicken"
                      :value="`${menu.price}`"
                      :sub-icon="
                        menu.sunsal
                          ? 'mdi-checkbox-marked'
                          : 'mdi-checkbox-blank-outline'
                      "
                      :menu-description="menu.description"
                      sub-text="순살 치킨! "
                      smallValue="ETH"
                      @removeMenu="menu.appended = false"
                    />
                  </v-col>
                </template>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card>
    </v-dialog>
    <base-material-snackbar
      v-model="alert"
      :type="color"
      v-bind="{
        top: true,
        center: true
      }"
    >
      <span class="font-weight-bold">{{ color }}</span> — {{ content }}
    </base-material-snackbar>
  </div>
</template>

<script>
import ContractInstance from "../ContractInstance";
const contractInstance = new ContractInstance();

export default {
  data() {
    return {
      AdminInstance: contractInstance.getAdminInstance(), // Admin Instance data
      latitude: null,
      longitude: null,
      storeName: "",
      chicken: "",
      price: "",
      sunsal: false,
      description: "",
      menus: [],
      address: "",
      map: null,
      required: value => !!value || "Required.",
      nameOk: false,
      alert: false,
      content: "",
      color: "",
      collapseOnScroll: true
    };
  },
  computed: {},
  props: {
    registerCH: Object
  },
  methods: {
    async registerChickenHouse() {
      console.log("=== Register Chicken House ===");
      if (!this.nameOk) {
        this.alert = true;
        this.color = "warning";
        this.content = "치킨집 이름 중복을 확인해주세요.";
        return;
      }
      if (
        this.storeName === "" ||
        this.latitude == null ||
        this.longitude == null
      ) {
        this.alert = true;
        this.color = "warning";
        this.content = "양식을 올바르게 작성하였는지 다시 확인해주세요.";
        return;
      }
      // make lists of chicke and price
      const chickens = this.menus
        .filter(menu => menu.appended)
        .map(menu => menu.chicken);
      const prices = this.menus
        .filter(menu => menu.appended)
        .map(menu => menu.price);
      const isSunsals = this.menus
        .filter(menu => menu.appended)
        .map(menu => (menu.sunsal ? 2 : 1));

      console.log(`---- Chicken Admin Set Menu: ${chickens}, ${prices} ----`);
      try {
        const transaction = await this.AdminInstance.registerChickenHouse(
          this.storeName,
          this.latitude,
          this.longitude,
          chickens,
          prices,
          isSunsals
        );
        console.log(`---- Register Succeed : ${transaction}`);
        this.$router.push({
          name: "OwnerPage2",
          params: { storeName: this.storeName }
        });
      } catch (e) {
        this.error = e.message;
        console.error(this.error);
      }

      let mapContainer = document.getElementById("map-chicken-house");
      mapContainer.style.display = "none";
      this.menus = [];
      this.latitude = null;
      this.longitude = null;
      this.storeName = "";
      this.address = "";
      this.registerCH.dialog = false;
      console.log("=== Done Register ===");
    },
    addMenu() {
      if (
        this.chicken === "" ||
        this.price < 0 ||
        this.price == "" ||
        isNaN(Number(this.price))
      ) {
        this.alert = true;
        this.color = "warning";
        this.content = "다시 입력해주세요!!";
        this.chicken = "";
        this.description = "";
        this.price = null;
        this.sunsal = false;
        return;
      }
      const id = this.menus.length;
      this.menus.push({
        chicken: this.chicken,
        price: Number(this.price),
        appended: true,
        sunsal: this.sunsal,
        description: this.description
      });
      this.chicken = "";
      this.description = "";
      this.price = null;
      this.sunsal = false;
      console.log(this.menus);
    },
    setAddress(data) {
      this.address = data.address; // 최종 주소 변수
      // 주소 정보를 해당 필드에 넣는다.
      // 주소로 상세 정보를 검색
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(this.address, this.setMapAndCoords);
    },
    setMapAndCoords(results, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const result = results[0]; //첫번째 결과의 값을 활용
        this.latitude = result.y;
        this.longitude = result.x;
        const coords = new kakao.maps.LatLng(result.y, result.x);

        let mapContainer = document.getElementById("map-chicken-house"); // 지도를 표시할 div
        let mapOption = {
          center: coords,
          level: 5
        };

        //지도를 미리 생성
        this.map = new kakao.maps.Map(mapContainer, mapOption);
        //주소-좌표 변환 객체를 생성
        //   const geocoder = new daum.maps.services.Geocoder();
        //마커를 미리 생성
        let marker = new kakao.maps.Marker({
          position: coords,
          map: this.map
        });
        mapContainer.style.display = "block";
        // 해당 주소에 대한 좌표를 받아서
        //   // 지도를 보여준다.
        this.map.relayout();
        //   // 지도 중심을 변경한다.
        this.map.setCenter(coords);
        //   // 마커를 결과값으로 받은 위치로 옮긴다.
        //   marker.setPosition(coords);
      }
    },
    execDaumPostcod() {
      //   let _address = this.address;

      new daum.Postcode({
        oncomplete: this.setAddress
      }).open();
      //   console.log(_address);
    },
    checkNameRedundancy() {
      this.AdminInstance.findChickenHouse(this.storeName).then(result => {
        console.log(result);
        if (result == 0) {
          this.alert = true;
          this.color = "success";
          this.content = "사용가능한 이름입니다.";
          this.nameOk = true;
        } else {
          this.alert = true;
          this.color = "warning";
          this.content = "이미 사용되는 이름입니다. 다시설정해주세요";
          this.storeName = "";
          this.nameOk = false;
        }
      });
    }
  },
  mounted() {
    const postCodeScript = document.createElement("script");
    postCodeScript.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(postCodeScript);
  }
};
</script>

<style>
.item {
  width: 180px;
  height: 50px;
  border-radius: 20px;
  margin: 10px;
  text-align: center;
  background-color: lightblue;
}
</style>
