<template>
    <div class="depositContener">
        <div class="titleContener">Profit / Gain</div>
        <div class="widgetBoxConterner">
            <div class="widgetText widgetText-align">
                <div class="topBox">
                    {{ winLostValue-deposit }} $
                </div>
                <div class="bottomBox">
                    {{ ((winLostValue-deposit)*0.89).toFixed(2) }} €
                </div>
            </div>
            <div class="widgetText pnl">
                <div class="topBox pnltext">
                    {{ (((winLostValue/deposit)-1)*100).toFixed(2) }} %
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
    /*border: 1px solid red;*/
    color: aliceblue;
    background-color: #272525;
    width: 180px;
    height: 100px;
    border-radius: 15px;
}.titleContener {
    height: 30%;
    font-weight: bold;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    padding-left: 10px;
    padding-top: 2px;
}.widgetBoxConterner {
    /* border: 1px solid pink; */
    height: 70%;
    display: flex;
    flex-direction: row;
}.widgetText {
    /* border: 1px solid yellow; */
    
    margin-top: 5px;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    text-align: initial;
}.widgetText-align {
    display: flex;
    width: 60%;
    flex-direction: column;
}.topBox {
    font-weight: bold;
    font-size: 22px;
    padding-left: 10px;
}.bottomBox {
    font-style: italic;
    padding-left: 10px;
    font-size: 13px;
    color: #5c5c5c;
}

.pnl {
    text-align: right;
    width: auto;
    display: flex;
    align-items: flex-end;
    
    width: 40%;
/*     margin-top: 0px; */
}
.pnltext {
    font-size: 14px;
    padding-bottom: 20px;
}
@media (max-width: 400px) and (max-height: 850px) {
    .depositContener {
        width: 150px;
    }
    .pnltext {
        font-size: 10px;
    }
}

</style>