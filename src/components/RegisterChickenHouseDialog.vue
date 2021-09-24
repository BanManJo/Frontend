<template>
  <div>
    <v-dialog
      v-model="registerCH.dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="registerCH.dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>치킨 집 등록하기</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="registerChickenHouse">등록</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>치킨집 이름</v-subheader>
          </v-flex>
          <v-flex xs5>
            <v-text-field
              v-model="storeName"
              label="Store Name"
              placeholder="BBQ 부천점"
              :rules="[required]"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>주소 입력</v-subheader>
          </v-flex>
          <v-flex xs5>
            <v-text-field
              id="addressField"
              label="Address"
              placeholder="도로명 주소"
              suffix-inner-icon="mdi-map-marker"
              v-model="address"
              :rules="[required]"
              readonly
            ></v-text-field>
          </v-flex>
          <v-btn @click="execDaumPostcod" color="primary">주소 찾기</v-btn>
        </v-layout>
        <v-layout>
          <v-flex xs4></v-flex>
          <v-flex xs5>
            <div
              id="map-chicken-house"
              style="
                width: 100%;
                height: 200px;
                margin-top: 10px;
                display: none;
              "
            ></div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>메뉴 등록</v-subheader>
          </v-flex>
          <v-flex xs2>
            <v-text-field
              v-model="chicken"
              color="purple darken-2"
              label="치킨 이름"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs1></v-flex>
          <v-flex xs2>
            <v-text-field
              v-model="price"
              color="blue darken-2"
              label="가격"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-checkbox v-model="sunsal" label="순살?"></v-checkbox>
          </v-flex>
          <v-btn @click="addMenu" class="mx-1" fab dark small color="indigo">
            <v-icon dark> add </v-icon>
          </v-btn>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>치킨 메뉴</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-layout style="padding-bottom: 100px" wrap>
              <template mb4 v-for="(menu, idx) in menus">
                <v-chip :key="idx" v-model="menu.appended" close>
                  <span>{{ menu.chicken }}</span> / 가격:
                  <span> {{ menu.price }} </span>원
                </v-chip>
              </template>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      storeName: "",
      chicken: "",
      price: "",
      sunsal: false,
      menus: [],
      address: "",
      map: null,
      required: (value) => !!value || "Required.",
    };
  },
  computed: {
    ...mapState({
      AdminInstance: (state) => state.AdminTestRepoInstance,
    }),
  },
  props: {
    registerCH: Object,
  },
  methods: {
    async registerChickenHouse() {
      console.log("=== Register Chicken House ===");
      // check User input right info
      // if (storeName){

      // }
      // make lists of chicke and price
      const chickens = this.menus
        .filter((menu) => menu.appended)
        .map((menu) => menu.chicken);
      const prices = this.menus
        .filter((menu) => menu.appended)
        .map((menu) => menu.price);
      const isSunsals = this.menus
        .filter((menu) => menu.appended)
        .map((menu) => (menu.sunsal ? 2 : 1));

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
      if (this.chicken === "" || this.price < 0 || this.price == "") {
        alert("다시 입력해주세요.");
        this.chicken = "";
        this.price = "";
        this.sunsal = false;
        return;
      }
      this.menus.push({
        chicken: this.chicken,
        price: parseInt(this.price),
        appended: true,
        sunsal: this.sunsal,
      });
      this.chicken = "";
      this.price = "";
      this.sunsal = false;
      console.log(this.menus);
    },
    setAddress(data) {
      console.log("setData");
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
          level: 5,
        };

        //지도를 미리 생성
        this.map = new kakao.maps.Map(mapContainer, mapOption);
        //주소-좌표 변환 객체를 생성
        //   const geocoder = new daum.maps.services.Geocoder();
        //마커를 미리 생성
        let marker = new kakao.maps.Marker({
          position: coords,
          map: this.map,
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
        oncomplete: this.setAddress,
      }).open();
      //   console.log(_address);
    },
  },
  mounted() {
    const postCodeScript = document.createElement("script");
    postCodeScript.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(postCodeScript);
  },
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