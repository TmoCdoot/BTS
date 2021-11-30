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
      <div class="grahContener">
        graphique
      </div>
    </div>
</template>

<script>
export default {
  name: "WidgetStat",
  data: function () {
    return {
      graph: 'wky'
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
  }
}
</script>

<style scoped lang="scss">
.statContener {
  color: aliceblue;
  background-color: #272525;
  width: 500px;
  height: 300px;
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

.grahContener {
  border: 1px solid red;
  height: 82%;
}
</style>