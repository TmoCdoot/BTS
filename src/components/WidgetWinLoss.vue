<template>
    <div class="depositContener">
        <div class="titleContener">GAIN / LOST</div>
        <div class="widgetBoxConterner">
            <div class="widgetText widgetText-align">
                <div class="topBox">
                    {{ winLostValue-deposit }}$
                </div>
                <div class="bottomBox">
                    {{ (winLostValue-deposit)*0.89 }}€
                </div>
            </div>
            <div class="widgetText">
                <div class="topBox">
                    {{ (((winLostValue/deposit)-1)*100).toFixed(2) }}%
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

export default {
  name: "WidgetDeposit",
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
    justify-content: center;
}.widgetBoxConterner {
    /*border: 1px solid pink;*/
    height: 70%;
    display: flex;
    flex-direction: row;
}.widgetText {
    /*border: 1px solid yellow;*/
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}.widgetText-align {
    display: flex;
    flex-direction: column;
}.topBox {
    font-weight: bold;
    font-size: 20px;
}.bottomBox {
    font-style: italic;
    font-size: 13px;
    color: #5c5c5c;
}

</style>