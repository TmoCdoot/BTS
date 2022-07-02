<template>
    <div class="ca-container-asset-list">

        <div class="ca-container-wallet">
          <span>Wallet name</span>
          <button>New wallet</button>
        </div>
  
        <div class="ca-container-top-list">
          <span>Asset</span>
          <span>Price</span>
          <span>Buy price</span>
          <span> Quantity</span>
          <span>Profit / Loss</span>
          <span>Edit</span>
        </div>
  
        <div class="ca-row-asset-data">
          <div class="asset">
            <img src="../../../public/img/cardano.png">
            <span>ADA</span>
          </div>
          
          <span>0.34 $</span>
  
          <span>0.24 $</span>
  
          <span>10</span>
  
          <span>+ 100 %</span>
  
          <div class="center-img">
            <img src="../../assets/pencil.png">
          </div>
          
        </div>
  
        <div class="ca-row-asset-data">
          <div class="asset">
            <img src="../../../public/img/DENT.png">
            <span>DENT</span>
          </div>
          
          <span>240 200 $</span>
  
          <span>12.4 $</span>
  
          <span>2 105 500</span>
  
          <span>+ 120 200 %</span>
  
          <div class="center-img">
            <img src="../../assets/pencil.png">
          </div>
          
        </div>
  
    </div>
</template>

<script>

</script>

<style scoped type="scss">
.ca-container-asset-list {
    width: 800px;
    min-height: 850px;
    background-color: #f7f7f7;
    border-radius: 15px;
    margin: 20px 0px;
}
.ca-container-wallet {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d6d6d6;
}
.ca-container-wallet span {
    margin: 25px 0px 25px 21px;
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
}
.ca-container-wallet button {
    width: 100px;
    height: 39px;
    background-color: #1157c0;
    border: none;
    margin: 13px 21px 0px 0px;
    border-radius: 10px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
}
.ca-container-top-list {
    display: flex;
    justify-content: space-evenly;
    padding: 16px 0px;
    border-bottom: 1px solid #d6d6d6;
}
.ca-container-top-list span {
    font-size: 12px;
    font-weight: 500;
    width: 115px;
    text-align: center;
}
.ca-row-asset-data {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 15px 0px;
    border-bottom: 1px solid #d6d6d6;
}
.ca-row-asset-data span, .asset, .center-img {
    width: 115px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
}
.ca-row-asset-data img {
    width: 20px;
}
.asset {
    display: flex;
    align-items: center;
    justify-content: center;
}
.asset span {
    width: 0;
    text-align: unset;
    margin-left: 7px;
    margin-right: 30px;
    font-size: 12px;
    font-weight: 700;
}
</style>