<template>
    <div class="ca-container-asset-list">

        <div class="ca-container-wallet">
          <span>{{ userData.userWalletSelected }}</span>
          <button>New wallet</button>
        </div>
  
        <div class="ca-container-top-list">
          <span>Asset</span>
          <span>Price</span>
          <span>Buy price</span>
          <span> Quantity</span>
          <span>Profit / Loss</span>
          <span>Delete</span>
        </div>

        <div v-if="userData.userDataCrypto.length > 0 && this.$store.state.readyForLoadGraph == 3 && this.$store.state.userData.userAssetSelected != []">
          <div class="ca-row-asset-data" :class="{'selected' : cryptoName == value.symbol}" v-for="value in userData.userDataCrypto" :key="value" :id="value.symbol" v-on:click="cryptoName = value.symbol ; assetNameForEdit = value.crypto"  @click="SelectAsset">
            <div class="asset">
              <img :src="'/img/' + value.symbol + '.png'" :alt="value.name">
              <span>{{ value.name }}</span>
            </div>

            <span>{{ value.priceNow }} $</span>
    
            <span v-if="value.buyPrice != ''">
              {{ value.buyPrice }} $
            </span>
            <span v-else>
              Not specified
            </span>
    
            <span>{{ value.quantity }}</span>
            
            <span v-if="(((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) <= 0 && value.buyPrice != ''" class="orange">
              {{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else-if="(((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) >= 0 && value.buyPrice != ''" class="green">
              + {{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else>
              Not specified
            </span>
    
            <div class="center-img">
              <button v-on:click="cryptoName = value.crypto; cryptoBuy = value.buyPrice; cryptoQtt = value.quantity" @click="deleteCryptoUser">
                <img src="../../assets/poubelle.png" alt="Edit" class="img">
              </button>
            </div>
          </div>
        </div>

        <div v-if="userData.userDataCrypto.length == 0" class="no-asset">
         NO ASSET
        </div>

    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "CryptoList",
    data: function () {
      return {
        cryptoName: this.$store.state.userData.userDataCrypto.length != 0 ? this.$store.state.userData.userDataCrypto[0].symbol : "",
        assetNameForEdit: this.$store.state.userData.userDataCrypto.length != 0 ? this.$store.state.userData.userDataCrypto[0].crypto : "",
        cryptoBuy: 0,
        cryptoQtt: 0,
      }
    },
    computed: {
      ...mapState(['userData']),
    },
    methods: {
      AddCrypto: function () {
        this.$emit('ChangeValueAddCrypto', true);
      },
      deleteCryptoUser: function () {
        const self = this
        this.$store.dispatch("deleteCryptoUser", {
          cryptoName: this.cryptoName
        }).then((e) => {
          this.cryptoName = self.$store.state.userData.userDataCrypto[0].symbol
          this.$store.dispatch("UserSelectedAsset", this.cryptoName)
          if (e) {
            document.getElementById(this.cryptoName).style.opacity = "0%"
            setTimeout(()=> {
              self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
                if (e != false) {
                  self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then((e) => {
                    if (e) {
                      self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                        if (e) {
                          self.$store.dispatch('loadCryptoPriceHistoryHour').then(() => {
                            self.$store.dispatch('loadCryptoPriceHistoryWly').then(() => {
                              self.$store.dispatch('loadCryptoPriceHistoryMth').then(() => {
                                self.$store.state.readyForLoadGraph = 3
                              })
                            })
                          })
                        }
                      })
                    }
                  })
                } else {
                  self.$store.state.readyForLoadGraph = 0
                  self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto)
                }
              })
            }, 400)
          }
        })
      },
      updateCryptoUser: function () {
        this.$emit('UpdateValueCrypto', {state: true, cryptoName: this.cryptoName, cryptoBuy: this.cryptoBuy, cryptoQtt: this.cryptoQtt});
      },
      SelectAsset: function () {
        this.$store.dispatch("UserSelectedAsset", { 
          symbol : this.cryptoName,
          nameForEdit : this.assetNameForEdit
        })
      }
    },
  }
</script>

<style scoped type="scss">
.ca-container-asset-list {
    width: 800px;
    min-height: 850px;
    background-color: var(--background-color-card);
    border-radius: 15px;
    margin: 20px 0px;
    height: 700px;
}
.ca-container-wallet {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--colo-row-asset-list);
    color: var(--color-font);
}
.ca-container-wallet span {
    margin: 25px 0px 25px 21px;
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
}
.ca-container-wallet button {
    width: 100px;
    height: 39px;
    background-color: #1157c0;
    border: none;
    margin: 13px 21px 0px 0px;
    border-radius: 10px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
}
.ca-container-top-list {
    display: flex;
    justify-content: space-evenly;
    padding: 16px 0px;
    border-bottom: 1px solid var(--colo-row-asset-list);
    color: var(--color-font);
}
.ca-container-top-list span {
    font-size: 12px;
    font-weight: 500;
    width: 115px;
    text-align: center;
}
.ca-row-asset-data {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 15px 0px;
    border-bottom: 1px solid var( --colo-row-asset-list);
    cursor: pointer;
    color: var(--color-font);
}
.ca-row-asset-data span, .asset, .center-img {
    width: 115px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
}
.ca-row-asset-data .center-img {
  display: flex;
  justify-content: center;
}
.center-img button {
  border-radius: 100px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.center-img img {
  border-radius: 100px;
}
.ca-row-asset-data img {
    width: 20px;
    cursor: pointer;
}
.asset {
    display: flex;
    align-items: center;
    justify-content: center;
}
.asset span {
    width: 0;
    text-align: unset;
    margin-left: 7px;
    margin-right: 30px;
    font-size: 12px;
    font-weight: 700;
}
.no-asset {
  font-family: "EpilogueBold";
  font-weight: 700;
    font-size: 20px;
    color: #383737;
    display: flex;
    height: 100%;
    align-content: center;
    justify-content: center;
    align-items: center;
}
.selected {
  background-color: var(--background-selected);
}
</style>