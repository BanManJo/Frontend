<template>
  <div>
     <!-- 가게 이름 부분 -->
     <h1 class="storeName"> 다글다글 </h1>

         <!-- 시작 종료 토글버튼 -->
         <div class="toggle">
            <v-btn-toggle v-model="icon">
              <v-btn flat value="left">
                <v-icon>영업 시작</v-icon>
              </v-btn>
              <v-btn flat value="center">
                <v-icon>영업 종료</v-icon>
              </v-btn>
            </v-btn-toggle>
         </div>

          <!-- My page로 가는 부분 -->
          <div class="myPage">
            <v-btn color="info">My Page</v-btn>
         </div>

         
<v-card >
   <div class="flex-container">
   <div>
   <h1>1</h1>
      <v-card-text>
       <h2>메뉴 이름 : 닭강정</h2>
       <h2>가격 : 0.000001 이더</h2>
      </v-card-text>

    <v-card-actions>
      <v-btn color="info" >
            주문 받기
      </v-btn>
      <v-btn color="info" >
            거절하기
      </v-btn>
    </v-card-actions>
    </div>
    <div>
   <h1>2</h1>
      <v-card-text>
       <h2>메뉴 이름 : 닭강정</h2>
       <h2>가격 : 0.000001 이더</h2>
      </v-card-text>

    <v-card-actions>
      <v-btn color="info" >
            주문 받기
      </v-btn>
      <v-btn color="info" >
            거절하기
      </v-btn>
    </v-card-actions>
    </div>
    <div>
   <h1>3</h1>
      <v-card-text>
       <h2>메뉴 이름 : 닭강정</h2>
       <h2>가격 : 0.000001 이더</h2>
      </v-card-text>

    <v-card-actions>
      <v-btn color="info" >
            주문 받기
      </v-btn>
      <v-btn color="info" >
            거절하기
      </v-btn>
    </v-card-actions>
    </div>
    
    </div>
  </v-card>
               


  </div>
</template>

<script>
export default {
      data () {
      return {
        text: 'center',
        icon: 'justify',
        toggle_none: null,
        toggle_one: 0,
        toggle_exclusive: 2,
        toggle_multiple: [0, 1, 2]
      }
    }
}
</script>

<style>
.storeName{
            position:fixed;
            top:35px;
            left:50px;
      }
.toggle{
    position:fixed; 
    top:35px; 
    left:200px; 
  }
.myPage{
    position:fixed; 
    top:30px; 
    left:1000px;        
}

.flex-container {
     position:fixed;
      width:300px;
      height:300px;
      top:200px;
      left:300px;
  display: flex;
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
}

</style>