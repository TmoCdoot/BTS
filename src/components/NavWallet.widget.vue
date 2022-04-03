<template>
    <div class="mobileWalletContener">
        <div class="navWalletContener">
            <div>
                <div class="buttonClose">
                    <img src="../assets/close.png" alt="Close" class="imgWallet" @click="closeNav">
                </div>
                <div class="title">
                    <h2>Your Wallets</h2>
                </div>
                <div class="walletMobileContener">
                    <div class="rowWallet tablette" v-for="value in userData.walletList" :key="value" @click="selectWallet(value)" v-on:click="walletName = value" :class="{active : value == userData.walletSelected}">
                        <div class="column">
                            <img src="../assets/wallet.png" alt="Wallet1" class="img">
                        </div>
                        <div class="column">
                            <div class="">
                                <h3>{{ value }}</h3>
                            </div>
                        </div>
                        <div class="column">
                            <button v-on:click="walletName = value" @click="deleteWalletUser"><img src="../assets/poubelle.png" alt="Delete" class="img"></button>
                        </div>
                    </div>
                </div>
                <div class="buttonAddWallet">
                    <div>
                        <button class="addButton" @click="AddWallet">Add new wallet</button>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "NavWallet",
        data: function () {
            return {
                walletName: '',
                /* deposit: this.$store.getters.getUserDepositSelect, */
            }
        },
        methods: {
            closeNav: function () {
                this.$emit('ChangeValueWalletNav', true);
            },
            AddWallet: function () {
                this.$emit('ChangeValueWalletNav', true)
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
                            this.$emit('ChangeValueWalletNav', true)
                            })
                        } else {
                            self.$store.dispatch('loadWinLostValue', this.$store.getters.getUserDataCrypto)
                            this.$emit('ChangeValueWalletNav', true)
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
        computed: {
        ...mapState(['winLostValue', 'userData']),
        },
    }
</script>

<style>
    .mobileWalletContener {
        width: 100%;
        height: 100%;
        position: absolute;
        /* background-color: rgba(0, 0, 0, 0.863); */
    }
    .navWalletContener {
        width: 30%;
        height: 100%;
        background-color: #1E2124;
        padding-top: 50px;
    }
    .imgWallet {
        width: 20px;
        height: 20px;
    }
    .buttonClose {
        text-align: left;
        padding-left: 30px;
    }
    .walletMobileContener {
        padding-left: 20px;
    }
    .tablette {
        margin-right: 20px;
        width: auto;
    }
    .active {
        background-color: #365164;  
    }
</style>