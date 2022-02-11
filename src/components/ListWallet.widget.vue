<template>
    <div class="walletListContener">
        <div>
            <div class="title">
                <h1>Your wallets</h1>
                <div>
                    <button class="addButton">Add new wallet</button> 
                </div>
            </div>
            <div>
                <div class="rowWallet">
                    <div class="column">
                        <img src="../assets/wallet.png" alt="Binance Wallet" class="img">
                    </div>
                    <div class="column">
                      <div>
                        <h2>Binance Wallet</h2>
                      </div>      
                    </div>
                    <div class="column titleAlign">
                        <div class="titleData">
                            Deposit
                        </div>
                        <div class="styleBold">
                            {{ deposit }} $
                        </div>       
                    </div>
                    <div class="column titleAlign">
                        <div class="titleData">
                            Win / Loss
                        </div>
                        <div class="styleBold" v-if="winLostValue-deposit <= 0">
                            {{ winLostValue-deposit }} $
                        </div>    
                        <div v-else>
                            +{{ (((winLostValue/deposit)-1)*100).toFixed(2) }} %
                        </div>       
                    </div>
                    <div class="column titleAlign">
                        <div class="styleBold inferior" v-if="(((winLostValue/deposit)-1)*100).toFixed(2) <= 0">
                            {{ (((winLostValue/deposit)-1)*100).toFixed(2) }} %
                        </div>        
                        <div class="superior" v-else>
                            +{{ (((winLostValue/deposit)-1)*100).toFixed(2) }} %
                        </div>   
                    </div>
                    <div class="column">
                        <img src="../assets/poubelle.png" alt="Delete" class="img">
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
    .walletListContener {
        padding-left: 60px;
        padding-right: 60px;
    }
    .rowWallet {
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
</style>