<template>
    <div id="addCryptoContener">
        <img src="../assets/close.png" alt="" class="imgClose" @click="AddCrypto">
        <div id="alignHozi">
            <div id="mainAddCrypotContener">
                <div id="titre">
                    Ajouter une nouvelle cryptomonnaie au porte-feuille
                </div>
                <div id="mainCryptoChoose">
                    <div>
                        <select class="input" v-model="crypto">
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
                    <div>
                        <button @click="AddOnWallet" id="CryptoButton" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Add new Crypto</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "WidgetAddCrypto",
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
                    uid: this.$store.state.userData.uid
                }).then((e) => {
                /* self.$router.push('/home') */
                    if (e) {
                        self.$store.dispatch("loadDataCrypto", this.$store.state.userData.uid).then((e) => {
                            if (e) {
                                self.$store.dispatch("loadCryptoPrice", this.$store.state.userData.listCryptoUser).then((e) => {
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
        width: 600px;
        height: 400px;
        border-radius: 15px;
        background-color: #252525;
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
        border: 1px solid green;
        height: 200px;
    }#addCryptoButton {
        border: 1px solid yellow;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .mainCryptoChoose {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #CryptoButton {
        padding: 8px 30px 8px 30px;
        font-weight: bold;
        border: none;
        border-radius: 20px;
        background: linear-gradient(95deg, #e67429, #f3422b);
        color: aliceblue;
        font-size: 18px;
        cursor: pointer;
    }

    .input {
        padding: 12px 130px 12px 40px;
        border: none;
        border-radius: 15px;
        padding-left: 10px;
        font-weight: bold;
        background-color: rgb(233, 233, 233);
    }
    .imgClose {
        width: 20px;
        position: absolute;
        /* border: 1px solid blue; */
        margin-top: 5px;
        cursor: pointer;
    }

    .unactive {
        background-image: linear-gradient(95deg, #444444, #1c1c1c) !important;
        color: #707070 !important;
        transition: 0.5s;
        cursor: initial !important;
    }

</style>