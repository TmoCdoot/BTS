<template>
    <div class="container-wallet-statistic end-container-wallet">
        <div class="container-top-row">
          <div class="box-asset-select">
            <img src="../../../public/img/cardano.png" >
            <span class="container-wallet-title">ADA</span>
          </div>
          <img src="../../assets/pencil.png">
        </div>
        

        <div class="box-statistic">
          <div>
            <span class="statistic-title">Price</span>
            <span class="statistic-data">0.34 $</span>
          </div>
          <div>
            <span class="statistic-title">Min balance</span>
            <span class="statistic-data">0.24 $</span>
          </div>
        </div>

        <div class="box-statistic end-box">
          <div>
            <span class="statistic-title">Quantity</span>
            <span class="statistic-data">10</span>
          </div>
          <div>
            <span class="statistic-title">Profit / Loss</span>
            <span class="statistic-data green">+ 100 %</span>
          </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped type="scss">
    .container-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
</style>