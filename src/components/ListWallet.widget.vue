<template>
    <div class="walletListContener">
        <div class="mainWalletListContener">
            <div class="title">
                <h1>Your wallets</h1>
                <div>
                    <button class="addButton" @click="AddWallet">Add new wallet</button> 
                </div>
            </div>
            {{userData.walletList[0]}}
            <div class="listWalletBox">
                <div class="rowWallet" v-for="(value,name) in userData.walletList" :key="value" @click="test(value)" v-on:click="walletName = value" :class="{active : value == selectedWallet}">
                    <div class="column">
                        <img src="../assets/wallet.png" alt="Binance Wallet" class="img">
                    </div>
                    <div class="column">
                      <div>
                        <h2>{{ value }}</h2>
                      </div>      
                    </div>
                    <div class="column titleAlign">
                        <div class="titleData">
                            Deposit
                        </div>
                        <div class="styleBold">
                            {{ deposit[name].deposit }} $
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
      return {
        walletName: '',
        selectedWallet: ''
      }
    },
    props: {
        deposit: Array,
    },
    computed: {
        ...mapState(['winLostValue', 'userData']),
    },
    methods: {
        AddWallet: function () {
            this.$emit('AddWallet', true);
        },
        test: function (value) {
            this.$store.dispatch('selectWallet', value)
            this.selectedWallet = this.$store.state.userData.walletSelected
            console.log(this.selectedWallet)
        }
    },
}
</script>

<style>
    .walletListContener {
        padding-left: 60px;
        padding-right: 60px;
        height: 100%;
    }
    .mainWalletListContener {
        height: 100%;
    }
    .listWalletBox {
        scroll-behavior: auto;
        height: 60%;
        overflow-y: scroll;
    }
    .rowWallet {
        height: 60px;
        width: 80%;
        background-color: #29353e63;;
        border-radius: 20px;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        margin-bottom: 20px;
        margin-right: 15px;
    }
    ::-webkit-scrollbar {
        width: 7px;
    }

    ::-webkit-scrollbar-thumb {
        background: #D1D1D1;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #28333B;
        border-radius: 10px;
    }
    .active {
        background-color: #365164;  
    }
</style>