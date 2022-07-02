<template>
    <area-chart :data="chartDataDly" :colors="['#479EDD']" class="graph" label="Wallet"></area-chart>
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
          chartDataDly: [[10, 2], [20, 4]],
        }
    },
}
</script>

<style scoped type="scss">
.graph {
    width: 315px !important;
    margin: 20px;
}
.graph canvas {
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
}
</style>