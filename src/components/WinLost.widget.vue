<template>
    <div class="depositContener">
        <div class="titleStatisticContener">Profit / Gain</div>
        <div class="DataConterner">
            <div class="dataTextWinLos dataTextWinLos-align">
                <div class="topBox" v-if="winLostValue-deposit <= 0">
                    {{ winLostValue-deposit }} $
                </div>
                <div v-else>
                    +{{ winLostValue-deposit }} $
                </div>
                <div class="bottomBox" v-if="((winLostValue-deposit)*0.89).toFixed(2) <= 0">
                    {{ ((winLostValue-deposit)*0.89).toFixed(2) }} €
                </div>
                <div v-else>
                    +{{ ((winLostValue-deposit)*0.89).toFixed(2) }} €
                </div>
            </div>
            <div class="dataText dataText-pnl">
                <div class="topBox textPnl inferior" v-if="(((winLostValue/deposit)-1)*100).toFixed(2) <= 0">
                    {{ (((winLostValue/deposit)-1)*100).toFixed(2) }} %
                </div>
                <div class="superior" v-else>
                    +{{ (((winLostValue/deposit)-1)*100).toFixed(2) }} %
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

export default {
  name: "WinLost",
  props: {
    deposit: Number,
  },
  computed: {
    ...mapState(['winLostValue']),
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
        width: 60%;
        flex-direction: column;
    }
    .dataText-pnl {
        text-align: right;
        width: auto;
        display: flex;
        align-items: flex-end;
        width: 40%;
    }
    .textPnl {
        font-size: 14px;
        padding-bottom: 20px;
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