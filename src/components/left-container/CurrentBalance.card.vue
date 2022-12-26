<template>
    <div class="ca-box-sold">
        <span class="sold-title">Current balance</span>
        <span class="sold-data">{{ userData.userDepositSelected }} $</span>
        <span class="sold-data-convert">{{ Math.round(userData.userDepositSelected*eurPrice) }} €</span>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "Deposit",
        computed: {
            ...mapState(['userData', 'eurPrice']),
        },
    }
</script>

<style scoped lang="scss">
</style>