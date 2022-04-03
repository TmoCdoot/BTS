<template>
  <div class="cryptoListContener">
    <div class="titleCryptoList">
      <h1 class="title">Your Assets</h1>
      <div class="buttonContener">
        <div class="buttonbox">
          <button @click="AddCrypto" class="addButton">Add assets</button>
        </div>
      </div>
    </div>
    <div class="cryptoContener" v-if="userData.dataCrypto.length > 0">
      <div class="rowCrypto" v-for="value in userData.dataCrypto" :key="value" :id="value.crypto">
        <div class="column">
          <img :src="'/img/' + value.crypto + '.png'" :alt="value.crypto" class="img">
        </div>
        <div class="column titleAlign">
          <div class="titleData">
            Crypto
          </div>
          <div class="styleBold">
            {{ value.crypto }}
          </div>
        </div>
        <div class="column titleAlign mobileDisplay">
          <div class="titleData">
            Buy price
          </div>
          <div class="styleBold" v-if="value.buyPrice != ''">
            {{ value.buyPrice }} $
          </div>
          <div class="styleBold" v-else>
            Not specified
          </div>
        </div>
        <div class="column titleAlign">
          <div class="titleData">
            Actual price
          </div>
          <div class="styleBold">
            {{ value.priceNow }} $
          </div>
        </div>
        <div class="column titleAlign ">
          <div class="titleData">
            Quantity
          </div>
          <div class="styleBold">
            {{ value.quantity }}
          </div>
        </div>
        <div class="column titleAlign mobileDisplay">
          <div class="titleData">
            Win / Loss
          </div>
          <div class="styleBold" v-if="value.buyPrice != ''">
            <div v-if="(((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) <= 0" class="inferior">
              {{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }} %
            </div>
            <div v-else class="superior">
              +{{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }} %
            </div>
          </div>
          <div class="styleBold" v-else>
            Not specified
          </div>
        </div>
        <div class="column">
          <button v-on:click="cryptoName = value.crypto; cryptoBuy = value.buyPrice; cryptoQtt = value.quantity" @click="updateCryptoUser"><img src="../assets/pencil.png" alt="Edit" class="img"></button>
        </div>
        <div class="column">
          <button v-on:click="cryptoName = value.crypto" @click="deleteCryptoUser"><img src="../assets/poubelle.png" alt="Delete" class="img"></button>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>You don't have assets</h3>
    </div>
  </div>
</template>


<script>
  import { mapState } from 'vuex'

  export default {
    name: "CryptoList",
    data: function () {
      return {
        graph: 'wky',
        url: '../assets/',
        cryptoName: '',
        cryptoBuy: 0,
        cryptoQtt: 0
      }
    },
    computed: {
      ...mapState(['userData', 'actualPrice']),
      activeButtonMty: function () {
        if (this.graph == "mty") {
          return true
        } else {
          return false
        }
      },
      activeButtonDly: function () {
        if (this.graph == "dly") {
          return true
        } else {
          return false
        }
      },
      activeButtonWky: function () {
        if (this.graph == "wky") {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      changeButton: function (graphLoad) {
        if (this.graph != graphLoad) {
          this.graph = graphLoad
        }
      },
      AddCrypto: function () {
        this.$emit('ChangeValueAddCrypto', true);
      },
      deleteCryptoUser: function () {
        const self = this
        this.$store.dispatch("deleteCryptoUser", {
          cryptoName: this.cryptoName
        }).then((e) => {
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
                                self.$store.state.ready = 3
                              })
                            })
                          })
                        }
                      })
                    }
                  })
                } else {
                  self.$store.state.loadCryptoPrice = 0
                  self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto)
                }
              })
            }, 400)
          }
        })
      },
      updateCryptoUser: function () {
        this.$emit('UpdateValueCrypto', {state: true, cryptoName: this.cryptoName, cryptoBuy: this.cryptoBuy, cryptoQtt: this.cryptoQtt});
      }
    },
  }
</script>

<style scoped lang="scss">
  .cryptoListContener {
    color: aliceblue;
    height: 100%;
    margin-left: 60px;
    margin-right: 60px;
    border-radius: 15px;
  }

  .titleCryptoList {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }

  .cryptoContener {
    margin-bottom: 15px;
    scroll-behavior: auto;
    height: 85%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .rowCrypto {
    width: 80%;
    background-color: #29353E;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
    margin-right: 15px;
    margin-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    transition: 0.4s;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: #D1D1D1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #28333B;
    border-radius: 10px;
  }

  @media (max-width: 686px) and (max-height: 850px) {
    .mobileDisplay {
      display: none;
    }

    .cryptoListContener {
      margin-left: 0px;
      margin-right: 0px;
    }

    .title {
      padding-left: 15px;
      font-size: 25px;
    }

    .buttonbox {
      padding-right: 15px;
    }

    .rowCrypto {
      background-color: #29353E;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-bottom: 20px;
      margin-right: 15px;
      margin-left: 15px;
      width: auto;
    }

    .cryptoContener {
      margin-bottom: 15px;
      scroll-behavior: auto;
      height: 85%;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: normal;
    }

    .addButton {
      padding: 5px 20px 5px 20px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 920px) {
    .mobileDisplay {
      display: none;
    }
  }
</style>