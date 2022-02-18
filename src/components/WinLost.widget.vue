<template>
    <div class="depositContener">
        <div class="titleStatisticContener">Profit / Gain</div>
        <div class="DataConterner contenerWinLoss">
            <div class="dataTextWinLos dataTextWinLos-align">
                <div class="topBox" v-if="winLostValue-userData.depositSelect <= 0 && winLostValue != 0">
                    {{ winLostValue-userData.depositSelect }} $
                </div>
                <div class="topBox" v-else-if="winLostValue-userData.depositSelect >= 0 && winLostValue != 0">
                    +{{ winLostValue-userData.depositSelect }} $
                </div>
                <div class="topBox" v-else>
                    0 $
                </div>
                <div class="bottomBox" v-if="((winLostValue-userData.depositSelect)*0.89).toFixed(2) <= 0 && winLostValue != 0">
                    {{ ((winLostValue-userData.depositSelect)*0.89).toFixed(2) }} €
                </div>
                <div class="bottomBox" v-else-if="((winLostValue-userData.depositSelect)*0.89).toFixed(2) >= 0 && winLostValue != 0">
                    +{{ ((winLostValue-userData.depositSelect)*0.89).toFixed(2) }} €
                </div>
                <div class="bottomBox" v-else>
                    0 €
                </div>
            </div>
            <div class="dataTextWinLos dataText-pnl">
                <div class="topBox textPnl inferior" v-if="(((winLostValue/userData.depositSelect)-1)*100).toFixed(2) <= 0 && winLostValue != 0">
                    {{ (((winLostValue/userData.depositSelect)-1)*100).toFixed(2) }} %
                </div>
                <div class="topBox textPnl superior" v-else-if="(((winLostValue/userData.depositSelect)-1)*100).toFixed(2) >= 0 && winLostValue != 0">
                    +{{ (((winLostValue/userData.depositSelect)-1)*100).toFixed(2) }} %
                </div>
                <div class="topBox textPnl superior" v-else>
                    +0 %
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

export default {
  name: "WinLost",
/*   props: {
    deposit: Number,
  }, */
  computed: {
    ...mapState(['winLostValue', 'userData']),
  }
}
</script>

<style scoped lang="scss">
    .depositContener {
        color: aliceblue;
        background-color: #272525;
        width: 180px;
        height: 100px;
        border-radius: 15px;
    }
    .dataTextWinLos {
        margin-top: 5px;
        text-align: initial;
    }
    .dataTextWinLos-align {
        display: flex;
        flex-direction: column;
    }
    .dataText-pnl {
        text-align: right;
        width: auto;
        display: flex;
        justify-content: flex-end;
    }
    .textPnl {
        font-size: 14px;
        margin-right: 10px;
    }
    .contenerWinLoss {
        flex-direction: column;
    }

    @media (max-width: 400px) and (max-height: 850px) {
        .depositContener {
            width: 150px;
        }
        .textPnl {
            font-size: 10px;
        }
    }
</style>