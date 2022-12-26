<template>
    <area-chart :data="loadGraphMty" :colors="['#479EDD']" class="graph" label="Wallet"
        v-if="this.$store.state.readyForLoadGraph == 3"></area-chart>
</template>

<script>
    export default {
        computed: {
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