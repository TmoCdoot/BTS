<template>
    <div class="ca-box-asset">
        <span>Add new asset</span>

        <div class="asset-switch">
            <switch id="crypto" class="active-switch">Crypto</switch>
            <switch id="etf">ETF</switch>
            <switch id="forex">Forex</switch>
        </div>

        <div class="asset-input">
            <label for="">Actif</label>
            <select v-model="crypto">
                <option value="ChooseAsset" disabled>Choose asset</option>
                <option v-for="(listValue, index) in listCryptoForGekoApi" :key="listValue" :value="listValue">
                    {{ listCryptoForCryptoCompare[index] }}
                </option>
            </select>
        </div>

        <div class="asset-input">
            <label for="">Quantity</label>
            <input type="text" v-model="quantity" required>
        </div>

        <div class="asset-input">
            <label for="">Buy price</label>
            <input type="text" v-model="buyprice">
        </div>

        <button class="asset-button" @click="AddOnWallet" :="{'disabled' : !noEmptyField}"
            :class="{'unactive' : !noEmptyField}">Add asset</button>

    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "AddCrypto",
        data: function () {
            return {
                crypto: 'ChooseAsset',
                buyprice: '',
                quantity: '',
            }
        },
        computed: {
            ...mapState(['listCryptoForGekoApi', 'listCryptoForCryptoCompare', 'ListCryptoFullName']),
            noEmptyField: function () {
                if (this.quantity != '' && this.crypto != "ChooseAsset") {
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
                var index = this.$store.state.listCryptoForGekoApi.findIndex(element => element == this.crypto)
                index = this.$store.state.ListCryptoFullName[index]

                this.$store.dispatch("addOnWallet", {
                    crypto: this.crypto,
                    buyprice: this.buyprice,
                    quantity: this.quantity,
                    Name: index,
                    uid: this.$store.getters.getUserUid
                }).then((e) => {
                    if (e) {
                        //load user crypto
                        self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
                            if (e) {
                                //load crypto price
                                self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then((e) => {
                                    if (e) {
                                        //load win loss value
                                        self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                                            if (e) {
                                                //calcul graph
                                                self.$store.dispatch('loadCryptoPriceHistoryHour').then(() => {
                                                    self.$store.dispatch('loadCryptoPriceHistoryWly').then(() => {
                                                        self.$store.dispatch('loadCryptoPriceHistoryMth', this.$store.getters.getUserData).then(() => {
                                                            self.$emit('ChangeValueAddCrypto', true)
                                                            self.$store.state.readyForLoadGraph = 3
                                                            this.crypto = "BTC"
                                                            this.buyprice = ""
                                                            this.quantity = ""
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
                })
            },
        }
    }
</script>

<style scoped type="scss">
    .ca-box-asset {
    padding-top: 21px;
    padding-bottom: 21px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 276px;
    border-radius: 15px;
    background-color: var(--background-color-card);
}
.ca-box-asset span {
    color: var(--color-font);
}
.ca-box-asset span {
    font-size: 16px;
    font-weight: 600;
    width: 240px;
}
.asset-switch {
    background-color: var(--background-switch);
    width: 244px;
    height: 47px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 19px;
    margin-bottom: 29px;
    color: var(--color-font);
}
switch {
    border-radius: 10px;    
    width: 75px;
    height: 39px;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
}
.active-switch {
    background-color: #1157c0;
    color: #ffffff;
}
.asset-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 29px;
    
}
.asset-input input, .asset-input select {
    background-color: var(--background-input);
    color: var(--color-font);
    border: var(--delete-border) !important;
}
.asset-input input {
    border-radius: 10px;
    margin-top: 6px;
    border: 1px solid #DADADA;
    width: 240px;
    height: 40px;
    box-sizing: border-box;
}
.asset-input label {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-label);
}
.asset-input select {
    border-radius: 10px;
    margin-top: 6px;
    border: 1px solid #DADADA;
    width: 240px;
    height: 40px;
    box-sizing: border-box;
}
.asset-button {
    width: 240px;
    height: 40px;
    background-color: #5DB5AA;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
}
</style>