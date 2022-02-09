<template>
    <div class="depositContener">
        <div class="titleStatisticContener">Deposit</div>
        <div class="DataConterner">
            <div class="dataTextDeposit dataTextDeposit-align">
                <div class="topBox">
                    {{ deposit }} $
                </div>
                <div class="bottomBox">
                    {{ Math.round(deposit*0.89) }} €
                </div>
            </div>  
            <div class="dataTextDeposit dataTextDepositAlign">
                <img src="../assets/pencil.png" alt="add deposit" class="img"/>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
    name: "Deposit",
    props: {
        deposit: Number,
    },
    data: function () {
        return {
            depositEur: (this.deposit) / 0.89, 
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