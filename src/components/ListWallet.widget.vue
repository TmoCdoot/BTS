<template>
    <div class="walletListContener">
        <div class="mainWalletListContener">
            <div class="title">
                <h1>Your wallets</h1>
                <div>
                    <button class="addButton" @click="AddWallet">Add new wallet</button> 
                </div>
            </div>
            <div class="listWalletBox">
                <div class="rowWallet" v-for="(value,name) in userData.walletList" :key="value" @click="selectWallet(value)" v-on:click="walletName = value" :class="{active : value == userData.walletSelected}">
                    <div class="column">
                        <img src="../assets/wallet.png" :alt="value" class="img">
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
                            {{ userData.depositList[name].deposit }} $
                        </div>       
                    </div>
                    <div class="column titleAlign">
                        <div class="titleData">
                            Win / Loss
                        </div>
                        <div class="styleBold" v-if="winLostValue-userData.depositList[name].deposit <= 0 && winLostValue != 0">
                            {{ winLostValue-userData.depositList[name].deposit }} $
                        </div>    
                        <div v-else-if="winLostValue-userData.depositList[name].deposit >= 0 && winLostValue != 0">
                            +{{ (((winLostValue/userData.depositList[name].deposit)-1)*100).toFixed(2) }} %
                        </div>    
                        <div v-else>
                            +0 %
                        </div>      
                    </div>
                    <div class="column titleAlign">
                        <div class="styleBold inferior" v-if="(((winLostValue/userData.depositList[name].deposit)-1)*100).toFixed(2) <= 0 && winLostValue != 0">
                            {{ (((winLostValue/userData.depositList[name].deposit)-1)*100).toFixed(2) }} %
                        </div>        
                        <div class="superior" v-else-if="(((winLostValue/userData.depositList[name].deposit)-1)*100).toFixed(2) >= 0 && winLostValue != 0">
                            +{{ (((winLostValue/userData.depositList[name].deposit)-1)*100).toFixed(2) }} %
                        </div>   
                        <div class="superior" v-else>
                            +0 %
                        </div>   
                    </div>
                    <div class="column">
                        <button v-on:click="walletName = value" @click="deleteWalletUser"><img src="../assets/poubelle.png" alt="Delete" class="img"></button>
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
        /* deposit: this.$store.getters.getUserDepositSelect, */
      }
    },
    computed: {
        ...mapState(['winLostValue', 'userData']),
    },
    methods: {
        AddWallet: function () {
            this.$emit('AddWallet', true);
        },
        selectWallet: function (value) {
            const self = this
            this.$store.dispatch('selectWallet', value).then(() => {
                self.$store.dispatch('loadUserDeposit').then(() => {
                    self.$store.dispatch('loadUserCrypto',this.$store.getters.getUserUid).then((e) => {
                      if (e != false) {
                        //load crypto price
                        self.$store.dispatch('loadCryptoPrice', this.$store.getters.getUserListCrypto).then(() => {
                          //calcul win loss user
                          self.$store.dispatch('loadWinLostValue', this.$store.getters.getUserDataCrypto)
                        })
                      } else {
                        self.$store.dispatch('loadWinLostValue', this.$store.getters.getUserDataCrypto)
                      }            
                    })
                })
            })
           /*  console.log(this.$store.state.userData.walletSelected) */
        },
        deleteWalletUser: function () {
            const self = this
            this.$store.dispatch("deleteWalletUser", {
            walletName: this.walletName
            }).then(() => {
                self.$store.dispatch('loadUserWallet').then((e) => {
                    if (e) {
                    //select wallet 
                        self.$store.dispatch('selectWallet', this.$store.getters.getUserWalletList[0]).then((e) => {
                            if (e) {
                            //load deposit user
                                self.$store.dispatch('loadUserDeposit').then(() => {
                                    self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
                                        if (e != false) {
                                            self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then(() => {
                                                self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto)
                                            })
                                        } else {
                                            self.$store.state.loadCryptoPrice = 0
                                            self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto)
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            })
        },
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