<template>
    <div class="depositContener">
        <div class="titleStatisticContener">Deposit</div>
        <div class="DataConterner">
            <div class="dataTextDeposit dataTextDeposit-align">
                <div class="topBox">
                    {{ userData.depositSelect }} $
                </div>
                <div class="bottomBox">
                    {{ Math.round(userData.depositSelect*0.89) }} €
                </div>
            </div>  
            <div class="dataTextDeposit dataTextDepositAlign">
                <button @click="updateDeposit"><img src="../assets/pencil.png" alt="add deposit" class="img"/></button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
    name: "Deposit",
/*     props: {
        deposit: Number,
    }, */
    data: function () {
        return {
            
        }
    },
    computed: {
        ...mapState(['userData']),
    },
    methods: {
        updateDeposit: function () {
            this.$emit('UpdateDeposit', true);
        }
    },
    }
</script>

<style scoped lang="scss">
    .depositContener {
        color: aliceblue;
        background-color: #272525;
        width: 180px;
        height: 100px;
        border-radius: 15px;
        margin-right: 10px;
    }
    .dataTextDeposit {
        width: 50%;
        margin-top: 5px;
        text-align: initial;
    }
    .dataTextDeposit-align {
        display: flex;
        flex-direction: column;
    }
    .dataTextDepositAlign {
        text-align: center;
    }

    @media screen and (max-width: 1360px) {
        .depositContener {
            margin-right: 10px;
        }
    }
    @media (max-width: 686px) and (max-height: 850px) {
        .img {
            width: 30px;
            height: 30px;
        }
        .depositContener {
            width: 150px;
        }
    }

</style>