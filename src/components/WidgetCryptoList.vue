<template>
    <div class="statContener">
      <div class="navStatContener">
        <h1>Your Assets</h1>
        <div class="buttonContener">
          <div>
            <button @click="AddCrypto" class="addButton">Add assets</button>
        </div>
      </div>
      </div>
     <!--  <div class="listContener">
        <table class="tabList">
          <tr>
            <td>Crypto</td>
            <td>Buy Price</td>
            <td>Price</td>
            <td>QTT</td>
            <td>Q/L</td>
          </tr>
          <tr>
            <td class="bottomBorder" colspan="5"></td>
          </tr>
            <tr v-for="value in userData.dataCrypto" :key="value">
              <td>{{ value.crypto }}</td>
              <td>{{ value.buyPrice }}$</td>
              <td>{{ value.priceNow }}$</td>
              <td>{{ value.quantity }}</td>
              <td>{{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }}%</td>
            </tr>           
          </table>
      </div> -->
      <div class="listContener">
        <div class="box" v-for="value in userData.dataCrypto" :key="value">
          <div class="sousBox">
            <img :src="'/img/' + value.crypto + '.png'" :alt="value.crypto" class="img">
          </div>
          <div class="sousBox text">
            <div class="font">
              Crypto
            </div>
            <div class="data">
              {{ value.crypto }}
            </div>           
          </div>
          <div class="sousBox text">
            <div class="font">
              Buy price
            </div>
            <div class="data">
              {{ value.buyPrice }}$
            </div>  
          </div>
          <div class="sousBox text">  
            <div class="font">
              Actual price
            </div>
            <div class="data">
              {{ value.priceNow }}$
            </div>  
          </div>
          <div class="sousBox text">
            <div class="font">
              Quantity
            </div>
            <div class="">
              {{ value.quantity }}
            </div>  
          </div>
          <div class="sousBox text">
            <div class="font">
              Win / Loss
            </div>
            <div class="data">
              {{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }}%
            </div>  
          </div>
          <div class="sousBox">
            <img src="../assets/pencil.png" alt="Bitcoin" class="img">
          </div>
          <div class="sousBox">
            <img src="../assets/poubelle.png" alt="Bitcoin" class="img">
          </div>
        </div>
      </div>
    </div>
</template>


<script>
  import { mapState } from 'vuex'

  export default {
    name: "WidgetStat",
    data: function () {
      return {
        graph: 'wky',
        url: '../assets/'
      }
    },
    computed: {
      ...mapState(['userData', 'actualPrice']),
      activeButtonMty: function () {
        if (this.graph == "mty") {
          return true
        } else {
          return false
        }
      },
      activeButtonDly: function () {
        if (this.graph == "dly") {
          return true
        } else {
          return false
        }
      },
      activeButtonWky: function () {
        if (this.graph == "wky") {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      changeButton: function (graphLoad) {
        if (this.graph != graphLoad) {
          this.graph = graphLoad
        }
      },
      AddCrypto: function () {
        this.$emit('ChangeValueAddCrypto', true);
      },
      /* getImgUrl(val) {
        console.log(val)
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + val + '.png')
      } */
    },
  }
</script>

<style scoped lang="scss">
    .statContener {
      color: aliceblue;
    /* background-color: #272525; */
    /* width: 100%; */
    height: 100%;
    margin-left: 60px;
    margin-right: 60px;
/*     padding-bottom: 10px; */
    border-radius: 15px;
    border: 1px solid green;
    }.navStatContener {
     /*  border: 1px solid blue; */
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    }.navStatContener-align {
      /*border: 1px solid yellow;*/
      width: 200px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }.navList {
      list-style: none;
      margin: 5px 0px 5px 5px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      /*border: 1px solid yellow;*/
      padding: 4px 5px;
      border-radius: 15px;
      background-color: #272525;
    }.liAlign {
      display: flex;
    }.butttonBox {
      /*border: 1px solid red;*/
      border-radius: 13px;
      padding: 7px 14px 7px 14px;
    }.activeButtonStat {
      border: 2px solid #EF4E2A;
      color: #EF4E2A;
    }
    
    .listContener {
      /* border: 1px solid red; */
      margin-bottom: 15px;
      scroll-behavior: auto;
      height: 85%;
      overflow-y: scroll;
    }.tabList {
      width: 100%;
    }.bottomBorder {
      border-bottom: 1px solid white;
    }.tr {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }

    .addButton {
      padding: 8px 30px 8px 30px;
      font-weight: bold;
      border: none;
      border-radius: 20px;
      background: #6C9FC4;
      color: aliceblue;
      font-size: 18px;
      cursor: pointer;
    }

    .box {
      /* border: 1px solid yellowgreen; */
      height: 80px;
      background-color: #29353E;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-bottom: 20px;
      margin-right: 15px;
    }

    .sousBox {
      /* border: 1px solid yellow; */
      height: 100%;
      display: flex;
      align-content: center;
      align-items: center;
    }

    .img {
      /* border: 1px solid blue; */
      height: 40px;
      width: 40px;
    }

    .font {
      font-weight: normal;
      font-style: italic;
      color: #919191;
    }

    .text {
      flex-direction: column;
      justify-content: space-evenly;
    }

    .data {
      font-weight: bold;
    }

    ::-webkit-scrollbar {
      width: 7px;
    }

    ::-webkit-scrollbar-thumb {
      background: #D1D1D1; 
      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #28333B;
      border-radius: 10px;
    }
</style>