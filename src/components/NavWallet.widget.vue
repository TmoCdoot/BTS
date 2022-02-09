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
                    <div class="rowWallet tablette">
                        <div class="column">
                            <img src="../assets/wallet.png" alt="Wallet1" class="img">
                        </div>
                        <div class="column">
                            <div class="">
                                <h3>Binance Wallet</h3>
                            </div>
                        </div>
                        <div class="column">
                            <img src="../assets/poubelle.png" alt="Bitcoin" class="img">
                        </div>
                    </div>
                </div>
                <div class="buttonAddWallet">
                    <div>
                        <button class="addButton">Add new wallet</button>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "NavWallet",
        methods: {
            closeNav: function () {
                this.$emit('ChangeValueWalletNav', true);
            }
        }
    }
</script>

<style>
    .mobileWalletContener {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.863);
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
</style>