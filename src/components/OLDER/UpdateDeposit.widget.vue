<template>
    <div class="updateDepositContener">
        <img src="../assets/close.png" alt="Close" class="imgClose" @click="UpdateDeposit">
        <div class="alignContener">
            <div class="mainUpdateDepositContener">
                <div class="titleUpdateDepositContener">
                    <h2>Edit deposit</h2>
                </div>
                <div class="updateDepositForm">
                    <div class="marginTop">
                        <input type="number" :placeholder="updateDeposit" class="input" v-model="deposit" required>
                    </div>
                </div>
                <div class="updateDepositSubmitButton">
                    <button @click="SubmitUpdateCrypto" class="updateDepositButton" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Edit Crypto</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "updateDeposit",
        data: function () {
            return {
                deposit: this.updateDeposit,
            }
        },
        props: {
            updateDeposit: Number,
        },
        computed: {
            ...mapState(['error']),
            noEmptyField: function () {
                if (this.deposit != '') {
                    /* console.log("fe") */
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            UpdateDeposit: function () {
                this.$emit('UpdateDeposit', true);
            },
            SubmitUpdateCrypto: function () {
                const self = this
                this.$store.dispatch("updateDeposit", {
                    deposit: this.deposit
                }).then((e) => {
                    if (e) {
                        self.$store.dispatch('loadUserWallet').then((e) => {
                            if (e) {
                                //select wallet 
                                self.$store.dispatch('loadUserDeposit', this.$store.getters.getUserUid).then(() => {
                                    self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
                                        if (e != false) {
                                            self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then((e) => {
                                                if (e) {
                                                    self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                                                        if (e) {
                                                            self.$emit('UpdateDeposit', true);
                                                        }
                                                    })
                                                }
                                            })
                                        } else {
                                            self.$store.state.loadCryptoPrice = 0
                                            self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                                                if (e) {
                                                    self.$emit('UpdateDeposit', true);
                                                }
                                            })
                                        }
                                    })
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
    .updateDepositContener {
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
    .mainUpdateDepositContener {
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 15px;
        background-color: #29353E;
        color: white;
    }
    .titleUpdateDepositContener {
        font-weight: bold;
        font-size: 20px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .updateDepositForm {
        margin-bottom: 10px;
        text-align: left;
    }
    .updateDepositSubmitButton {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 5px;
    }
    .updateDepositButton {
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