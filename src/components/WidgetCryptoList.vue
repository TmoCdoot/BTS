<template>
    <div class="statContener">
      <div class="navStatContener">
        <div class="navStatContener-align">
          <ul class="navList">
            <li class="liAlign"><button class="butttonBox" @click="changeButton('wky')" :class="{'activeButtonStat' : activeButtonWky}">WKY</button></li>
            <li class="liAlign"><button class="butttonBox" @click="changeButton('dly')" :class="{'activeButtonStat' : activeButtonDly}">DLY</button></li>
            <li class="liAlign"><button class="butttonBox" @click="changeButton('mty')" :class="{'activeButtonStat' : activeButtonMty}">MTY</button></li>
          </ul>
        </div>
      </div>
      <div class="listContener">
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
          <tr>
            <td>BTC</td>
            <td>61 347</td>
            <td>58 241</td>
            <td>0.156</td>
            <td>-2.14%</td>
          </tr>
          <tr>
            <td>BTC</td>
            <td>61 347</td>
            <td>58 241</td>
            <td>0.156</td>
            <td>-2.14%</td>
          </tr>
          <tr>
            <td>BTC</td>
            <td>61 347</td>
            <td>58 241</td>
            <td>0.156</td>
            <td>-2.14%</td>
          </tr>
        </table>
      </div>
      <div class="buttonContener">
        <div>
          <button @click="AddCrypto" class="addButton">Add new Crypto</button>
        </div>
      </div>
    </div>
</template>


<script>
  export default {
    name: "WidgetStat",
    components: {
    },
    data: function () {
      return {
        graph: 'wky',
        addCrypto: false,
      }
    },
    computed: {
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
        if (this.addCrypto == false) {
          this.$emit('ChangeValueAddCrypto', true);
        } else {
          this.$emit('ChangeValueAddCrypto', false);
        }
      }
    },
  }
</script>

<style scoped lang="scss">
    .statContener {
      color: aliceblue;
      background-color: #272525;
      width: 500px;
      padding-bottom: 10px;
      border-radius: 15px;
      /*border: 1px solid green;*/
    }.navStatContener {
      /*border: 1px solid blue;*/
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
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
      border: 1px solid red;
      margin-bottom: 15px;
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
      background: linear-gradient(95deg, #e67429, #f3422b);
      color: aliceblue;
      font-size: 18px;
      cursor: pointer;
    }
</style>