<template>
    <div class="walletContener">
        <div class="wallet">
            <div class="title">
                <h1>Your wallets</h1>
                <div class="buttonContener">
                    <div>
                      <button class="addButton">Add new wallet</button>
                    </div>    
                </div>
            </div>
            <div class="listwallet">
                <div class="boxwallet">
                    <div class="sousBox">
                        <img src="../assets/wallet.png" alt="Wallet1" class="img">
                    </div>
                    <div class="sousBox">
                      <div class="">
                        <h2>Binance Wallet</h2>
                      </div>      
                    </div>
                    <div class="sousBox text">
                        <div class="font">
                            Deposit
                        </div>
                        <div class="data">
                            {{ deposit }} $
                        </div>       
                    </div>
                    <div class="sousBox text">
                        <div class="font">
                            Win / Loss
                        </div>
                        <div class="data">
                            {{ winLostValue-deposit }} $
                        </div>           
                    </div>
                    <div class="sousBox text">
                        <div class="data">
                            {{ (((winLostValue/deposit)-1)*100).toFixed(2) }} %
                        </div>           
                    </div>
                    <div class="sousBox">
                        <img src="../assets/poubelle.png" alt="Bitcoin" class="img">
                    </div>
                </div>
            </div>
           
        </div>
    </div>
    
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "CryptoList",
    data: function () {
      return {}
    },
    props: {
        deposit: Number,
    },
    computed: {
        ...mapState(['winLostValue']),
    },
    methods: {

    },
}
</script>

<style>
    .walletContener {
    /*     border: 1px solid blue; */
        padding-left: 60px;
        padding-right: 60px;
    }
    .wallet {
        border: 1px solid yellow;
    }
    .title {
        display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .boxwallet {
      /* border: 1px solid yellowgreen; */
      height: 60px;
      width: 80%;
      background-color: #29353E;
      border-radius: 20px;
      display: flex;
        justify-content: space-around;
      flex-direction: row;
      margin-bottom: 20px;
      margin-right: 15px;
    }
    .img {
        /* border: 1px solid blue; */
      height: 40px;
      width: 40px;
    }
    .sousBox {
      /* border: 1px solid yellow; */
      height: 100%;
      display: flex;
      align-content: center;
      align-items: center;
    }
    .font {
      font-weight: normal;
      font-style: italic;
      color: #919191;
    }

    .text {
      flex-direction: column;
      justify-content: space-evenly;
    }

    .data {
      font-weight: bold;
    }

    .addButton {
      padding: 8px 30px 8px 30px;
      font-weight: bold;
      border: none;
      border-radius: 20px;
      background: #6C9FC4;
      color: aliceblue;
      font-size: 18px;
      cursor: pointer;
    }
</style>