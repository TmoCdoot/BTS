<template>
    <div class="navWalletContener">
        <div class="contenerNav">
            <div class="jsp">
                <div class="button">
                    <img src="../assets/close.png" alt="Close" class="imgWallet" @click="closeNav">
                </div>
                <div class="title">
                    <h1>Your Wallets</h1>
                </div>
                <div class="walletList">
                    <div class="boxwallet tablette">
                        <div class="sousBox">
                            <img src="../assets/wallet.png" alt="Wallet1" class="img">
                        </div>
                        <div class="sousBox">
                          <div class="">
                            <h2>Binance Wallet</h2>
                          </div>      
                        </div>
                        <div class="sousBox">
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
 .navWalletContener {
     width: 100%;
     height: 100%;
     position: absolute;
     background-color: rgba(0, 0, 0, 0.863);
 }
    .contenerNav {
        width: 30%;
        height: 100%;
        background-color: #1E2124;
    }
    .imgWallet {
        width: 30px;
        height: 30px;
    }
    .jsp {
        padding-top: 50px;
    border: 1px solid red;
    }
    .button {
        text-align: left;
    padding-left: 30px;
    }
    .title {
        padding-left: 20px;
    }
    .walletList {
        padding-left: 20px;
    }
    .tablette {
        margin-right: 20px;
        width: auto;
    }

    @media (min-width: 0px) and (max-width: 1060px) {
        .contenerNav {
            width: 315px;
        }
    }
    @media screen and (max-height: 815px) {
        .navWalletContener {
            height: 815px;
        }
    }
</style>