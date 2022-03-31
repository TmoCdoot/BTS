<template>
    <div class="statContener">
      <div class="titlestat title">
        <h1 class="h1title">Line Chart</h1>
      </div>
      <div class="grahContener" v-if="this.$store.state.ready == 3">
        <GraphBlock :graph="graph"/>
      </div>
      <div class="navStatContener">
        <ul class="navList">
          <li class="liAlign"><button class="butttonBox" @click="changeButton('dly')" :class="{'activeButtonStat' : activeButtonDly}">1D</button></li>
          <li class="liAlign"><button class="butttonBox" @click="changeButton('wky')" :class="{'activeButtonStat' : activeButtonWky}">1W</button></li>
          <li class="liAlign"><button class="butttonBox" @click="changeButton('mty')" :class="{'activeButtonStat' : activeButtonMty}">1M</button></li>
        </ul>
      </div>
    </div>
</template>

<script>
import GraphBlock from '@/components/GraphBlock.widget.vue'

export default {
  name: "ChartStat",
  components: {
    GraphBlock,
  },
  data: function () {
    return {
      graph: 'dly'
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
  background-color: #29353E;
  /* width: 500px; */
  /* height: 100%; */
  border-radius: 15px;
  padding-bottom: 10px;
  /*border: 1px solid green;*/
}.navStatContener {
  /*border: 1px solid blue;*/
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  /* background-color: #272525; */
}.liAlign {
  display: flex;
}.butttonBox {
  /*border: 1px solid red;*/
  border-radius: 13px;
  padding: 7px 14px 7px 14px;
  font-weight: bold;
}.activeButtonStat {
  background-color: #49667C;
}

.grahContener {
  /* border: 1px solid red; */
  /* height: 70%; */
}

.h1title {
  padding-left: 20px;
}
.titlestat {
  height: 15%;
}

@media screen and (max-width: 1360px) {
  .statContener {
    /* margin-left: 60px;
    margin-right: 60px;*/
    width: 90%; 
  }

}
@media (max-width: 686px) and (max-height: 850px) {
  .h1title {
    font-size: 25px;
  }
}

</style>