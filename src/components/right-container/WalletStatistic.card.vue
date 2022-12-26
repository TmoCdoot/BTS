<template>
  <div class="container-wallet-statistic">
    <span class="container-wallet-title">Statistic</span>

    <div class="box-statistic">
      <div>
        <span class="statistic-title">Max balance</span>
        <span class="statistic-data">{{ userData.userMaxBalanceValue }} $</span>
      </div>
      <div>
        <span class="statistic-title">Min balance</span>
        <span class="statistic-data">{{ userData.userMinBalanceValue }} $</span>
      </div>
    </div>

    <div class="box-statistic end-box">
      <div>
        <span class="statistic-title">Mean balance</span>
        <span class="statistic-data">{{ userData.userMeanBalanceValue }} $</span>
      </div>
      <div>
        <span class="statistic-title">Risk</span>
        <span class="statistic-data orange">45 %</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "ProfitLoss",
    computed: {
      ...mapState(['userData']),
    }
  }
</script>

<style scoped type="scss">
  .container-wallet-title {
    font-weight: 700;
    font-size: 16px;
    margin-left: 5px;
}
</style>