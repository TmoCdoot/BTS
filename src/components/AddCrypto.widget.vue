<template>
    <div id="addCryptoContener">
        <img src="../assets/close.png" alt="" class="imgClose" @click="AddCrypto">
        <div id="alignHozi">
            <div id="mainAddCrypotContener">
                <div id="titre">
                    <h2>Add new assets</h2>
                </div>
                <div id="mainCryptoChoose">
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
                <div id="addCryptoButton">
                    
                        <button @click="AddOnWallet" id="CryptoButton" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Add new Crypto</button>
                    
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
                        self.$store.dispatch("loadDataCrypto", this.$store.getters.getUserUid).then((e) => {
                            if (e) {
                                self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then((e) => {
                                    if (e) {
                                        self.$emit('ChangeValueAddCrypto', true);
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
    #addCryptoContener {
        /* border: 1px solid red; */
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.863);
        position: absolute;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        z-index: 900;
    }#alignHozi {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    }#mainAddCrypotContener {
        border: 1px solid red;
        width: 400px;
        height: 320px;
        border-radius: 15px;
        background-color: #29353E;
        color: white;
    }#titre {
        font-weight: bold;
        font-size: 20px;
        height: 70px;
        /* border: 1px solid blue; */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }#mainCryptoChoose {
        /* border: 1px solid green; */
        margin-bottom: 10px;
    }#addCryptoButton {
        /* border: 1px solid yellow; */
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

    #CryptoButton {
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

    .input {
        padding: 12px 0px 12px 10px;
        border: none;
        border-radius: 15px;
        /* padding-left: 10px; */
        font-weight: bold;
        background-color: #1E2124;
        width: 250px;
    }
    .imgClose {
        width: 20px;
        position: absolute;
        /* border: 1px solid blue; */
        margin-top: 20px;
        cursor: pointer;
    }

    .unactive {
        background-image: linear-gradient(95deg, #444444, #1c1c1c) !important;
        color: #707070 !important;
        transition: 0.5s;
        cursor: initial !important;
    }

    select {
        color: white;
        width: 250px;
    }

</style>