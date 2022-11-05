<template>
    <div class="box-data">
        <div class="box-data-row" v-if="onEdit == false">
          <div>
            <span class="box-data-title">Balance</span>
            <img src="../../assets/param-dark.png" @click="editBalance" v-if="this.$store.state.userTheme == 'light'">
            <img src="../../assets/param.png" @click="editBalance" v-if="this.$store.state.userTheme == 'dark'">
          </div>
          <span class="box-data-data">{{ userData.userDepositSelected }} $</span>
        </div>
        <div class="box-data-row" v-else>
          <div>
            <span class="box-data-title">Balance</span>
            <img src="../../assets/validate.png" @click="SubmitUpdateBalance">
          </div>
          <input class="inputBalance" type="text" v-model="balance" required>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">ETF number</span>
          <span class="box-data-data">{{ userData.userEtfCounter }}</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">Crypto number</span>
          <span class="box-data-data">{{ userData.userCryptoCounter }}</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">FOREX number</span>
          <span class="box-data-data">{{ userData.userForexCounter }}</span>
        </div>
        
        <div class="box-data-row end">
          <span class="box-data-title">Action number</span>
          <span class="box-data-data">{{ userData.userActionCounter }}</span>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
      name: "Deposit",
      props: ['theme'],
      data: function () {
        return {
          onEdit: false,
          balance: "",
        }
      },
      computed: {
          ...mapState(['userData', 'eurPrice']),
      },
      methods: {
          editBalance: function () {
            if (this.onEdit == false) {
              this.onEdit = true
              this.balance = this.$store.state.userData.userDepositSelected
            } else {
              this.onEdit = false
            }
          },
          SubmitUpdateBalance: function () {
            const self = this
            this.$store.dispatch("updateDeposit", {
              deposit: this.balance
            }).then((e) => {
              if (e) {
                self.onEdit = false
                self.$store.dispatch('loadUserDeposit').then(() => {
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
                })
              }
            })
          }
      },
  }
</script>

<style scoped type="scss">
.box-data {
    width: 276px;
    background-color: var(--background-color-card);
    border-radius: 15px;
}
.box-data-row {
    padding: 10px 20px;
    border-bottom: var(--border-bottom);
    display: flex;
    justify-content: space-between;
}
.box-data-title {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-label);
}
.box-data-data {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-font);
}
.end {
    border: none;
}
img {
  width: 10px;
    cursor: pointer;
    margin-left: 5px;
}
.box-data-row div {
  display: flex;
    align-items: center;
}
.inputBalance {
  border-radius: 10px;
    margin-top: 6px;
    border: 1px solid #DADADA;
    width: 120px;
    height: 26px;
    box-sizing: border-box;
    background-color: var(--background-input);
    border: var(--delete-border) !important;
    color: var(--color-font);
}
</style>