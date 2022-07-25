<template>
    <div class="ca-container-asset-list">

        <div class="ca-container-wallet">
          <span>{{ userData.walletSelected}}</span>
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
  
        <div v-if="userData.dataCrypto.length > 0">
          <div class="ca-row-asset-data" v-for="value in userData.dataCrypto" :key="value" :id="value.crypto">
            <div class="asset">
              <img :src="'/img/' + value.crypto + '.png'" :alt="value.crypto">
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
    
            <span v-if="(((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) <= 0 && value.buyPrice != ''">
              + {{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else-if="(((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) >= 0 && value.buyPrice != ''">
              {{ (((value.priceNow-value.buyPrice)/value.buyPrice)*100).toFixed(2) }} %
            </span>
            <span v-else>
              Not specified
            </span>
    
            <div class="center-img">
              <button v-on:click="cryptoName = value.crypto; cryptoBuy = value.buyPrice; cryptoQtt = value.quantity" @click="updateCryptoUser">
                <img src="../../assets/poubelle.png" alt="Edit" class="img">
              </button>
            </div>
          </div>
        </div>
       
  
        <div class="ca-row-asset-data">
          <div class="asset">
            <img src="../../../public/img/DENT.png">
            <span>DENT</span>
          </div>
          
          <span>240 200 $</span>
  
          <span>12.4 $</span>
  
          <span>2 105 500</span>
  
          <span>+ 120 200 %</span>
  
          <div class="center-img">
            <img src="../../assets/pencil.png">
          </div>
          
        </div>

        <!-- <div class="cryptoContener" v-if="userData.dataCrypto.length > 0">
          <div class="rowCrypto" v-for="value in userData.dataCrypto" :key="value" :id="value.crypto">
            <div class="column">
              <img :src="'/img/' + value.crypto + '.png'" :alt="value.crypto" class="img">
            </div>
            <div class="column titleAlign">
              <div class="titleData">
                Crypto
              </div>
              <div class="styleBold">
                {{ value.name }}
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
              <button v-on:click="cryptoName = value.crypto; cryptoBuy = value.buyPrice; cryptoQtt = value.quantity" @click="updateCryptoUser">
                <img src="../assets/pencil.png" alt="Edit" class="img">
              </button>
            </div>
            <div class="column">
              <button v-on:click="cryptoName = value.crypto" @click="deleteCryptoUser"><img src="../assets/poubelle.png" alt="Delete" class="img"></button>
            </div>
          </div>
        </div> -->
  
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "CryptoList",
    data: function () {
      return {
        url: '../assets/',
        cryptoName: '',
        cryptoBuy: 0,
        cryptoQtt: 0
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
      }
    },
  }
</script>

<style scoped type="scss">
.ca-container-asset-list {
    width: 800px;
    min-height: 850px;
    background-color: #f7f7f7;
    border-radius: 15px;
    margin: 20px 0px;
}
.ca-container-wallet {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d6d6d6;
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
    border-bottom: 1px solid #d6d6d6;
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
    border-bottom: 1px solid #d6d6d6;
}
.ca-row-asset-data span, .asset, .center-img {
    width: 115px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
}
.center-img button {
  border: none;
  background: none;
}
.ca-row-asset-data img {
    width: 20px;
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
</style>