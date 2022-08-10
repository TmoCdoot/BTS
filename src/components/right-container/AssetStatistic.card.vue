<template>
    <div class="container-wallet-statistic end-container-wallet"  v-if="this.$store.state.readyForLoadGraph == 3 && userData.userDataCrypto.length > 0">

        <div class="container-top-row">
          <div class="box-asset-select">
            <img :src="'/img/' + userData.userAssetSelected.symbol + '.png'" :alt="userData.userAssetSelected.symbol">
            <span class="container-wallet-title">{{ (userData.userAssetSelected.symbol).toUpperCase() }}</span>
          </div>
          
          <img src="../../assets/pencil.png"  @click="editAsset" v-if="onEdit == false">
          <img src="../../assets/validate.png"  @click="SubmitUpdateCrypto" v-if="onEdit == true">
        </div>

        <div class="box-statistic">
          <div>
            <span class="statistic-title">Price</span>
            <span class="statistic-data">{{ userData.userAssetSelected.price }} $</span>
          </div>

          <div v-if="onEdit == false">
            <span class="statistic-title">Buy price</span>
            <span class="statistic-data" v-if="userData.userAssetSelected.buyPrice != ''">{{ userData.userAssetSelected.buyPrice }} $</span>
            <span class="statistic-data" v-else>Not specified</span>
          </div>
          <div v-else>
            <span class="statistic-title">Buy price</span>
            <input type="text" v-model="buyPrice" required>
          </div>
        </div>

        <div class="box-statistic end-box">
          <div v-if="onEdit == false">
            <span class="statistic-title">Quantity</span>
            <span class="statistic-data">{{ userData.userAssetSelected.quantity }}</span>
          </div>
          <div v-else>
            <span class="statistic-title">Quantity</span>
            <input type="text" v-model="quantity" required>
          </div>

          <div>
            <span class="statistic-title">Profit / Loss</span>
            <span v-if="(((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) <= 0 && userData.userAssetSelected.buyPrice != ''" class="orange">
              {{ (((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else-if="(((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) >= 0 && userData.userAssetSelected.buyPrice != ''" class="green">
              + {{ (((userData.userAssetSelected.price-userData.userAssetSelected.buyPrice)/userData.userAssetSelected.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else>
              0 %
            </span>
          </div>
        </div>
        
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "AssetStatistic",
    data: function () {
      return {
        onEdit: false,
        buyPrice: "",
        quantity: "",
      }
    },
    computed: {
      ...mapState(['userData']),
    },
    methods: {
      editAsset: function () {
        if (this.onEdit == false) {
          this.onEdit = true
          this.buyPrice = this.$store.state.userData.userAssetSelected.buyPrice
          this.quantity = this.$store.state.userData.userAssetSelected.quantity
        } else {
          this.onEdit = false
        }
      },
      SubmitUpdateCrypto: function () {
        const self = this
        this.$store.dispatch("updateCryptoUser", {
          cryptoName: this.$store.state.userData.userAssetSelected.nameForEdit,
          buyprice: this.buyPrice,
          quantity: this.quantity
        }).then((e) => {
          if (e) {
            self.onEdit = false
            self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
              if (e != false) {
                self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then((e) => {
                  if (e) {
                    self.$store.dispatch('UserSelectedAsset', {
                      symbol: self.$store.state.userData.userDataCrypto[0].symbol,
                      nameForEdit: self.$store.state.userData.userDataCrypto[0].crypto,
                    })
                    self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                      if (e) {
                        //calcul graph
                        self.$store.dispatch('loadCryptoPriceHistoryHour').then(() => {
                          self.$store.dispatch('loadCryptoPriceHistoryWly').then(() => {
                            self.$emit('UpdateValueCrypto', { state: true })
                          })
                        })
                      }
                    })
                  }
                })
              } else {
                self.$store.state.loadCryptoPrice = 0
                self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto).then((e) => {
                  if (e) {
                    //calcul graph
                    self.$store.dispatch('loadCryptoPriceHistoryHour').then(() => {
                      self.$store.dispatch('loadCryptoPriceHistoryWly').then(() => {
                        self.$emit('UpdateValueCrypto', { state: true })
                      })
                    })
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

<style scoped type="scss">
    .container-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
</style>