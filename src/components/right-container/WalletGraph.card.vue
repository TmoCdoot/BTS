<template>
    <area-chart :data="loadGraphMty" :colors="['#479EDD']" class="graph" label="Wallet" v-if="this.$store.state.readyForLoadGraph == 3"></area-chart>
</template>

<script>
export default {
    data: function () {
        return {
          page: 'home',
          graph: 'wky',
          addCrypto: false,
          navWallet: false,
          updateCrypto: false,
          updateDeposit: false,
          addWallet: false,
          updateCryptoName: '',
          updateCryptoBuy: 0,
          updateCryptoQtt: 0,
        }
    },
    computed: {
            loadGraphDly: function () {
                var chartDataDly = [
                    [this.$store.getters.getHistoTimeDly[0], this.$store.getters.getHistoWalletDly[0]],
                    [this.$store.getters.getHistoTimeDly[1], this.$store.getters.getHistoWalletDly[1]],
                    [this.$store.getters.getHistoTimeDly[2], this.$store.getters.getHistoWalletDly[2]],
                    [this.$store.getters.getHistoTimeDly[3], this.$store.getters.getHistoWalletDly[3]],
                    [this.$store.getters.getHistoTimeDly[4], this.$store.getters.getHistoWalletDly[4]],
                    [this.$store.getters.getHistoTimeDly[5], this.$store.getters.getHistoWalletDly[5]],
                    [this.$store.getters.getHistoTimeDly[6], this.$store.getters.getHistoWalletDly[6]],
                    [this.$store.getters.getHistoTimeDly[7], this.$store.getters.getHistoWalletDly[7]],
                    [this.$store.getters.getHistoTimeDly[8], this.$store.getters.getHistoWalletDly[8]],
                    [this.$store.getters.getHistoTimeDly[9], this.$store.getters.getHistoWalletDly[9]],
                    [this.$store.getters.getHistoTimeDly[10], this.$store.getters.getHistoWalletDly[10]],
                    [this.$store.getters.getHistoTimeDly[11], this.$store.getters.getHistoWalletDly[11]],
                    [this.$store.getters.getHistoTimeDly[12], this.$store.getters.getHistoWalletDly[12]],
                    [this.$store.getters.getHistoTimeDly[13], this.$store.getters.getHistoWalletDly[13]],
                    [this.$store.getters.getHistoTimeDly[14], this.$store.getters.getHistoWalletDly[14]],
                    [this.$store.getters.getHistoTimeDly[15], this.$store.getters.getHistoWalletDly[15]],
                    [this.$store.getters.getHistoTimeDly[16], this.$store.getters.getHistoWalletDly[16]],
                    [this.$store.getters.getHistoTimeDly[17], this.$store.getters.getHistoWalletDly[17]],
                    [this.$store.getters.getHistoTimeDly[18], this.$store.getters.getHistoWalletDly[18]],
                    [this.$store.getters.getHistoTimeDly[19], this.$store.getters.getHistoWalletDly[19]],
                    [this.$store.getters.getHistoTimeDly[20], this.$store.getters.getHistoWalletDly[20]],
                    [this.$store.getters.getHistoTimeDly[21], this.$store.getters.getHistoWalletDly[21]],
                    [this.$store.getters.getHistoTimeDly[22], this.$store.getters.getHistoWalletDly[22]],
                    [this.$store.getters.getHistoTimeDly[23], this.$store.getters.getHistoWalletDly[23]],
                ]
                return chartDataDly
            },
            loadGraphWky: function () {
                var chartDataWky = [
                    [this.$store.getters.getHistoTimeWky[0], this.$store.getters.getHistoWalletWky[0]],
                    [this.$store.getters.getHistoTimeWky[1], this.$store.getters.getHistoWalletWky[1]],
                    [this.$store.getters.getHistoTimeWky[2], this.$store.getters.getHistoWalletWky[2]],
                    [this.$store.getters.getHistoTimeWky[3], this.$store.getters.getHistoWalletWky[3]],
                    [this.$store.getters.getHistoTimeWky[4], this.$store.getters.getHistoWalletWky[4]],
                    [this.$store.getters.getHistoTimeWky[5], this.$store.getters.getHistoWalletWky[5]],
                    [this.$store.getters.getHistoTimeWky[6], this.$store.getters.getHistoWalletWky[6]],   
                ]
                return chartDataWky
            },
            loadGraphMty: function () {
                var chartDatatMty = [
                    [this.$store.getters.getHistoTimeMth[0], this.$store.getters.getHistoWalletMth[0]],
                    [this.$store.getters.getHistoTimeMth[1], this.$store.getters.getHistoWalletMth[1]],
                    [this.$store.getters.getHistoTimeMth[2], this.$store.getters.getHistoWalletMth[2]],
                    [this.$store.getters.getHistoTimeMth[3], this.$store.getters.getHistoWalletMth[3]],
                    [this.$store.getters.getHistoTimeMth[4], this.$store.getters.getHistoWalletMth[4]],
                    [this.$store.getters.getHistoTimeMth[5], this.$store.getters.getHistoWalletMth[5]],
                    [this.$store.getters.getHistoTimeMth[6], this.$store.getters.getHistoWalletMth[6]],
                    [this.$store.getters.getHistoTimeMth[7], this.$store.getters.getHistoWalletMth[7]],
                    [this.$store.getters.getHistoTimeMth[8], this.$store.getters.getHistoWalletMth[8]],
                    [this.$store.getters.getHistoTimeMth[9], this.$store.getters.getHistoWalletMth[9]],
                    [this.$store.getters.getHistoTimeMth[10], this.$store.getters.getHistoWalletMth[10]],
                    [this.$store.getters.getHistoTimeMth[11], this.$store.getters.getHistoWalletMth[11]],
                    [this.$store.getters.getHistoTimeMth[12], this.$store.getters.getHistoWalletMth[12]],
                    [this.$store.getters.getHistoTimeMth[13], this.$store.getters.getHistoWalletMth[13]],
                    [this.$store.getters.getHistoTimeMth[14], this.$store.getters.getHistoWalletMth[14]],
                    [this.$store.getters.getHistoTimeMth[15], this.$store.getters.getHistoWalletMth[15]],
                    [this.$store.getters.getHistoTimeMth[16], this.$store.getters.getHistoWalletMth[16]],
                    [this.$store.getters.getHistoTimeMth[17], this.$store.getters.getHistoWalletMth[17]],
                    [this.$store.getters.getHistoTimeMth[18], this.$store.getters.getHistoWalletMth[18]],
                    [this.$store.getters.getHistoTimeMth[19], this.$store.getters.getHistoWalletMth[19]],
                    [this.$store.getters.getHistoTimeMth[20], this.$store.getters.getHistoWalletMth[20]],
                    [this.$store.getters.getHistoTimeMth[21], this.$store.getters.getHistoWalletMth[21]],
                    [this.$store.getters.getHistoTimeMth[22], this.$store.getters.getHistoWalletMth[22]],
                    [this.$store.getters.getHistoTimeMth[23], this.$store.getters.getHistoWalletMth[23]],
                    [this.$store.getters.getHistoTimeMth[24], this.$store.getters.getHistoWalletMth[24]],
                    [this.$store.getters.getHistoTimeMth[25], this.$store.getters.getHistoWalletMth[25]],
                    [this.$store.getters.getHistoTimeMth[26], this.$store.getters.getHistoWalletMth[26]],
                    [this.$store.getters.getHistoTimeMth[27], this.$store.getters.getHistoWalletMth[27]],
                    [this.$store.getters.getHistoTimeMth[28], this.$store.getters.getHistoWalletMth[28]],
                    [this.$store.getters.getHistoTimeMth[29], this.$store.getters.getHistoWalletMth[29]],
                    [this.$store.getters.getHistoTimeMth[30], this.$store.getters.getHistoWalletMth[30]],
                ]
                return chartDatatMty
            },
        },
}
</script>

<style scoped type="scss">
.graph {
    width: 315px !important;
    margin: 20px;
}
</style>