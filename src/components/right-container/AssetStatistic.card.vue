<template>
    <div class="container-wallet-statistic end-container-wallet"  v-if="this.$store.state.readyForLoadGraph == 3">
        <div class="container-top-row">
          <div class="box-asset-select">
            <img :src="'/img/' + userData.userAssetSelected.symbol + '.png'" :alt="userData.userAssetSelected.symbol ">
            <span class="container-wallet-title">{{ (userData.userAssetSelected.symbol).toUpperCase() }}</span>
          </div>
          <img src="../../assets/pencil.png">
        </div>
        

        <div class="box-statistic">
          <div>
            <span class="statistic-title">Price</span>
            <span class="statistic-data">{{ userData.userAssetSelected.price }} $</span>
          </div>
          <div>
            <span class="statistic-title">Buy price</span>
            <span class="statistic-data" v-if="userData.userAssetSelected.buyPrice != ''">{{ userData.userAssetSelected.buyPrice }} $</span>
            <span class="statistic-data" v-else>Not specified</span>
          </div>
        </div>

        <div class="box-statistic end-box">
          <div>
            <span class="statistic-title">Quantity</span>
            <span class="statistic-data">{{ userData.userAssetSelected.quantity}}</span>
          </div>
          <div>
            <span class="statistic-title">Profit / Loss</span>
           <!--  <span class="statistic-data green">+ 100 %</span> -->

            <span v-if="(((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) <= 0 && userData.userAssetSelected.buyPrice != ''" class="orange">
              {{ (((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else-if="(((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) >= 0 && userData.userAssetSelected.buyPrice != ''" class="green">
              + {{ (((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else>
              0 %
            </span>
          </div>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "AssetStatistic",
    computed: {
      ...mapState(['userData']),
    },
  }
</script>

<style scoped type="scss">
    .container-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
</style>