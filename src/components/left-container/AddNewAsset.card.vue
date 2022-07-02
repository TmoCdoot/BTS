<template>
    <div class="ca-box-asset">
        <span>Add new asset</span>

        <div class="asset-switch">
          <switch id="crypto" class="active-switch">Crypto</switch>
          <switch id="etf">ETF</switch>
          <switch id="forex">Forex</switch>
        </div>

        <div class="asset-input">
          <label for="">Actif</label>
          <select name="" id="">
            <option value="">CHZ</option>
          </select>
        </div>

        <div class="asset-input">
          <label for="">Quantity</label>
          <input type="text" name="" id="">
        </div>

        <div class="asset-input">
          <label for="">Buy price</label>
          <input type="text" name="" id="">
        </div>

        <button class="asset-button">Add asset</button>

    </div>
</template>

<script>

</script>

<style scoped type="scss">
.ca-box-asset {
    padding-top: 21px;
    padding-bottom: 21px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 276px;
    border-radius: 15px;
    background-color: #F7F7F7;
}
.ca-box-asset span {
    font-size: 16px;
    font-weight: 600;
    width: 240px;
}
.asset-switch {
    background-color: #e3e3e3;
    width: 244px;
    height: 47px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 19px;
    margin-bottom: 29px;
}
switch {
    border-radius: 10px;    
    width: 75px;
    height: 39px;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
}
.active-switch {
    background-color: #1157c0;
    color: #ffffff;
}
.asset-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 29px;
}
.asset-input input {
    border-radius: 10px;
    margin-top: 6px;
    border: 1px solid #DADADA;
    width: 240px;
    height: 40px;
    box-sizing: border-box;
}
.asset-input label {
    font-size: 12px;
    font-weight: 500;
    color: #686868;
}
.asset-input select {
    border-radius: 10px;
    margin-top: 6px;
    border: 1px solid #DADADA;
    width: 240px;
    height: 40px;
    box-sizing: border-box;
}
.asset-button {
    width: 240px;
    height: 40px;
    background-color: #5DB5AA;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
}
</style>