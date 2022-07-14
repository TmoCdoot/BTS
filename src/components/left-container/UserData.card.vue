<template>
    <div class="box-data">
        <div class="box-data-row">
          <span class="box-data-title">Balance</span>
          <span class="box-data-data">{{ userData.depositSelect }} $</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">ETF number</span>
          <span class="box-data-data">1</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">Crypto number</span>
          <span class="box-data-data">2</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">FOREX number</span>
          <span class="box-data-data">1</span>
        </div>

        <div class="box-data-row end">
          <span class="box-data-title">Action number</span>
          <span class="box-data-data">1</span>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
      name: "Deposit",
      computed: {
          ...mapState(['userData', 'eurPrice']),
      },
      methods: {
          updateDeposit: function () {
              this.$emit('UpdateDeposit', true);
          }
      },
  }
</script>

<style scoped type="scss">
.box-data {
    width: 276px;
    background-color: #f7f7f7;
    border-radius: 15px;
}
.box-data-row {
    padding: 10px 20px;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    justify-content: space-between;
}
.box-data-title {
    font-size: 12px;
    font-weight: 500;
    color: #686868;
}
.box-data-data {
    font-size: 12px;
    font-weight: 500;
}
.end {
    border: none;
}
</style>