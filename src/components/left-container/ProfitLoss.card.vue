<template>
    <div class="ca-box-sold">
        <span class="sold-title">Profit / Loss</span>

        <span class="sold-data" v-if="winLostValue-userData.depositSelect <= 0 && winLostValue != 0">
            {{ winLostValue-userData.depositSelect }} $
        </span>
        <span class="sold-data" v-else-if="winLostValue-userData.depositSelect >= 0 && winLostValue != 0">
            + {{ winLostValue-userData.depositSelect }} $
        </span>
        <span class="sold-data" v-else>
            0 $
        </span>

        <span class="sold-data-convert inferior"
            v-if="(((winLostValue/userData.depositSelect)-1)*100).toFixed(2) <= 0 && winLostValue != 0">
            {{ (((winLostValue/userData.depositSelect)-1)*100).toFixed(2) }} %
        </span>
        <span class="sold-data-convert superior"
            v-else-if="(((winLostValue/userData.depositSelect)-1)*100).toFixed(2) >= 0 && winLostValue != 0">
            + {{ (((winLostValue/userData.depositSelect)-1)*100).toFixed(2) }} %
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
        ...mapState(['winLostValue', 'userData']),
    }
}
</script>

<style scoped type="scss">
</style>