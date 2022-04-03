<template>
    <div class="addCryptoContener">
        <img src="../assets/close.png" alt="Close" class="imgClose" @click="AddCrypto">
        <div class="alignContener">
            <div class="mainAddCrypotContener">
                <div class="titleAddCryptoContener">
                    <h2>Add new assets</h2>
                </div>
                <div class="cryptoForm">
                    <div>
                        <select class="input" v-model="crypto">
                            <option value="" selected disabled>Crypto</option>
                            <option v-for="listValue in valuesList" :key="listValue">{{ listValue }}</option>
                        </select>
                    </div><br>
                    <div>
                        <input type="number" placeholder="Buy price" class="input" v-model="buyprice">
                    </div><br>
                    <div>
                        <input type="number" placeholder="Quantity" class="input" v-model="quantity" required>
                    </div>
                </div>
                <div class="cryptoSubmitButton">
                    <button @click="AddOnWallet" class="addCryptoButton" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Add new Crypto</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "AddCrypto",
        data: function () {
            return {
                crypto: 'BTC',
                buyprice: '',
                quantity: '',
            }
        },
        computed: {
            ...mapState(['error']),
            ...mapState(['valuesList']),
            noEmptyField: function () {
                if (this.quantity != '') {
                    /* console.log("fe") */
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            AddCrypto: function () {
                this.$emit('ChangeValueAddCrypto', true);
            },
            AddOnWallet: function () {
                const self = this;
                this.$store.dispatch("addOnWallet", {
                    crypto: this.crypto,
                    buyprice: this.buyprice,
                    quantity: this.quantity,
                    uid: this.$store.getters.getUserUid
                }).then((e) => {
                    if (e) {
                        self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
                            if (e) {
                                self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then((e) => {
                                    if (e) {
                                        self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                                            if (e) {
                                                //calcul graph
                                                self.$store.dispatch('loadCryptoPriceHistoryHour').then(() => {
                                                    self.$store.dispatch('loadCryptoPriceHistoryWly').then(() => {
                                                        self.$store.dispatch('loadCryptoPriceHistoryMth').then(() => {
                                                            self.$emit('ChangeValueAddCrypto', true)
                                                            self.$store.state.ready = 3
                                                        })
                                                    })
                                                })
                                            }
                                        })
                                    }    
                                })
                            }
                        })
                    }
                /* console.log(this.uid) */
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .addCryptoContener {
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
    .mainAddCrypotContener {
        padding-left: 15px;
        padding-right: 15px;
        height: 320px;
        border-radius: 15px;
        background-color: #29353E;
        color: white;
    }
    .titleAddCryptoContener {
        font-weight: bold;
        font-size: 20px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .cryptoForm {
        margin-bottom: 10px;
    }
    .cryptoSubmitButton {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mainCryptoChoose {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .addCryptoButton {
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
    select {
        color: white;
        width: 250px;
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