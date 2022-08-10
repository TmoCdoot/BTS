<template>
    <div class="ca-box-sold">
        <span class="sold-title">Profit / Loss</span>

        <span class="sold-data" v-if="userData.userWinLostValue-userData.userDepositSelected <= 0 && userData.userWinLostValue != 0">
            {{ userData.userWinLostValue-userData.userDepositSelected }} $
        </span>
        <span class="sold-data" v-else-if="userData.userWinLostValue-userData.userDepositSelected >= 0 && userData.userWinLostValue != 0">
            + {{ userData.userWinLostValue-userData.userDepositSelected }} $
        </span>
        <span class="sold-data" v-else>
            0 $
        </span>

        <span class="sold-data-convert orange"
            v-if="(((userData.userWinLostValue/userData.userDepositSelected)-1)*100).toFixed(2) <= 0 && userData.userWinLostValue != 0">
            {{ (((userData.userWinLostValue/userData.userDepositSelected)-1)*100).toFixed(2) }} %
        </span>
        <span class="sold-data-convert green"
            v-else-if="(((userData.userWinLostValue/userData.userDepositSelected)-1)*100).toFixed(2) >= 0 && userData.userWinLostValue != 0">
            + {{ (((userData.userWinLostValue/userData.userDepositSelected)-1)*100).toFixed(2) }} %
        </span>
        <span class="sold-data-convert" v-else>
            0 %
        </span>
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
</style>