<template>
    <div class="addWalletContener">
        <img src="../assets/close.png" alt="Close" class="imgClose" @click="AddWallet">
        <div class="alignContener">
            <div class="mainAddWalletContener">
                <div class="titleAddWalletContener">
                    <h2>Add new wallet</h2>
                </div>
                <div class="walletForm">
                    <div>
                        <input type="text" placeholder="Wallet name" class="input" v-model="walletName" required>
                    </div><br>
                    <div>
                        <input type="number" placeholder="Deposit" class="input" v-model="deposit" required>
                    </div>
                </div>
                <div class="walletSubmitButton">
                    <button @click="AddNewWallet" class="addWalletButton" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Add new Crypto</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "AddWallet",
        data: function () {
            return {
                walletName: '',
                deposit: '',
            }
        },
        computed: {
            ...mapState(['error']),
            noEmptyField: function () {
                if (this.walletName != '' && this.deposit != '') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            AddWallet: function () {
                this.$emit('AddWallet', true);
            },
            AddNewWallet: function () {
                const self = this;
                this.$store.dispatch("AddNewWallet", {
                    walletName: this.walletName,
                    deposit: this.deposit
                }).then((e) => {
                    if (e) {
                        self.$store.dispatch('loadUserWallet').then((e) => {
                            if (e) {
                                self.$emit('AddWallet', true);
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .addWalletContener {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.863);
        position: absolute;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        z-index: 900;
    }
    .alignContener {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mainAddWalletContener {
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 15px;
        background-color: #29353E;
        color: white;
    }
    .titleAddWalletContener {
        font-weight: bold;
        font-size: 20px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .walletForm {
        margin-bottom: 10px;
    }
    .walletSubmitButton {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 5px;
    }
    .addWalletButton {
        padding: 10px 30px 10px 30px;
        font-weight: bold;
        border: none;
        width: 200px;
        border-radius: 20px;
        background: #6C9FC4;
        color: aliceblue;
        font-size: 18px;
        cursor: pointer;
    }
    .imgClose {
        width: 20px;
        position: absolute;
        margin-top: 20px;
        cursor: pointer;
    }

    .imgClose:hover {
        animation: rotate 1s cubic-bezier(0.69, 0, 0.62, 1) infinite alternate;

    }
    @keyframes rotate {
        from {
        }

        to {
            transform: scale(1.2);
        }
    }
</style>