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
                        <input type="email" placeholder="Crypto" class="input" v-model="email">
                    </div><br>
                    <div>
                        <input type="text" placeholder="Buy price" class="input" v-model="password">
                    </div><br>
                    <div>
                        <input type="text" placeholder="Quantity" class="input" v-model="password">
                    </div>
                </div>
                <div id="addCryptoButton">
                    <div>
                        <button @click="AddCrypto" class="CryptoButton">Add new Crypto</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WidgetAddCrypto",
        methods: {
            AddCrypto: function () {
                this.$emit('ChangeValueAddCrypto', true);
            },
        }
    }
</script>

<style scoped lang="scss">
    #addCryptoContener {
        /* border: 1px solid red; */
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.678);
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

    .CryptoButton {
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
        margin-top: 10px;
        cursor: pointer;
    }

</style>