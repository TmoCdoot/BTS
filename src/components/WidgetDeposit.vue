<template>
    <div class="depositContener">
        <div class="titleContener">DEPOSIT PRICE</div>
        <div class="widgetBoxConterner">
            <div class="widgetImg">
                <img src="../assets/plus.png" alt="add deposit" class="imgAdd"/>
            </div>
            <div class="widgetImg widgetImg-align">
                <div class="topBox">
                    {{ deposit }}$
                </div>
                <div class="bottomBox">
                    {{ Math.round(deposit*0.89) }}€
                </div>
            </div>  
        </div>
    </div>
</template>

<script>

    export default {
    name: "WidgetDeposit",
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
}.widgetImg {
    /*border: 1px solid yellow;*/
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}.imgAdd {
    width:40px;
}.widgetImg-align {
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