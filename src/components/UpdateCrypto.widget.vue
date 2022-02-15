<template>
    <div class="updateCryptoContener">
        <img src="../assets/close.png" alt="Close" class="imgClose" @click="updateCrypto">
        <div class="alignContener">
            <div class="mainUpdateCrypotContener">
                <div class="titleUpdateCryptoContener">
                    <h2>Edit {{updateCryptoName}}</h2>
                </div>
                <div class="updatecryptoForm">
                    <label>Buy price</label>
                    <div v-if="updateCryptoBuy != ''" class="marginTop">
                        <input type="number" :placeholder="updateCryptoBuy" class="input" v-model="buyprice">
                    </div>
                    <div v-else class="marginTop">
                        <input type="number" placeholder="Buy price" class="input" v-model="buyprice">
                    </div><br>
                    <label>Quantity</label>
                    <div class="marginTop">
                        <input type="number" :placeholder="updateCryptoQtt" class="input" v-model="quantity" required>
                    </div>
                </div>
                <div class="updateCryptoSubmitButton">
                    <button @click="SubmitUpdateCrypto" class="updateCryptoButton" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Edit Crypto</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "UpdateCrypto",
        data: function () {
            return {
                buyprice: this.updateCryptoBuy,
                quantity: this.updateCryptoQtt,
            }
        },
        props: {
            updateCryptoName: String,
            updateCryptoBuy: [String, Number],
            updateCryptoQtt: Number
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
            updateCrypto: function () {
                this.$emit('UpdateValueCrypto', {state: true});
            },
            SubmitUpdateCrypto: function () {
                const self = this
                this.$store.dispatch("updateCryptoUser", {
                    cryptoName: this.updateCryptoName,
                    buyprice: this.buyprice,
                    quantity: this.quantity
                }).then((e) => {
                    if (e) {
                        self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
                        if (e != false) {
                            self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then((e) => {
                            if (e) {
                                self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                                if (e) {
                                    self.$emit('UpdateValueCrypto', {state: true});
                                }
                                })
                            }
                            })
                        } else {
                            self.$store.state.loadCryptoPrice = 0
                            self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                            if (e) {
                                self.$emit('UpdateValueCrypto', {state: true});
                            }
                            })
                        }
                        })
                    }
                })
                
            }
        }
    }
</script>

<style scoped lang="scss">
    .updateCryptoContener {
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
    .mainUpdateCrypotContener {
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 15px;
        background-color: #29353E;
        color: white;
    }
    .titleUpdateCryptoContener {
        font-weight: bold;
        font-size: 20px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .updatecryptoForm {
        margin-bottom: 10px;
        text-align: left;
    }
    .updateCryptoSubmitButton {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 5px;
    }
    .updateCryptoButton {
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
    .marginTop {
        margin-top: 5px;
    }
    label {
        font-style: italic;
        color: #727272;
    }
</style>