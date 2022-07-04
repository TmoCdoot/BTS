<template>
    <div class="ca-box-sold">
        <span class="sold-title">Current balance</span>
        <span class="sold-data">{{ userData.depositSelect }} $</span>
        <span class="sold-data-convert">{{ Math.round(userData.depositSelect*eurPrice) }} €</span>
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

<style scoped lang="scss">
</style>