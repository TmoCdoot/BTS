<template>
  <div class="ca-lft-container">

    <div class="ca-container-logo">
      <img src="../assets/logov2.png" v-if="this.$store.state.userTheme == 'light'">
      <img src="../assets/logov1.png" v-if="this.$store.state.userTheme == 'dark'">
    </div>

    <div class="ca-container-sold">
      <CurrentBalance />
      <ProfitLoss />
    </div>

    <div class="ca-container-asset">
      <AddNewAsset />
    </div>

    <div class="ca-container-data">
      <UserData />
    </div>

  </div>

  <div class="ca-ctr-container">
    <AssetList v-if="userData.userAssetSelected.length >= 0 || userData.userDataCrypto.length >= 0" />
  </div>

  <div class="ca-rht-container">
    <div class="ca-container-user">
      <span>{{ userData.userEmail }}</span>
      <button @click="logOutUser">Disconnect</button>
      <img src="../assets/moon.png" @click="switchTheme" v-if="this.$store.state.userTheme == 'light'">
      <img src="../assets/sun.png" @click="switchTheme" v-if="this.$store.state.userTheme == 'dark'">
    </div>

    <div class="ca-container-wallet-data">

      <div class="wallet-name">
        <div>
          <span>{{ userData.userWalletSelected }}</span>
          <span class="number-asset">{{userData.userAssetCounter}} asset</span>
        </div>

        <button @click="deleteWalletUser()">Delete wallet</button>
      </div>

      <WalletGraph />

      <WalletStatistic />

      <AssetStatistic />

    </div>
  </div>


  <div class="ca-mobile-container">
    <!-- top de la page -->
    <div class="ca-mobile-container-top">

      <div class="mbl-container-wallet-name">
        <span>Binance wallet</span>
        <img src="../assets/menu.png">
      </div>

      <div class="mbl-container-balance">
        <span>Current balance</span>
        <span class="balance">$ 23,909.34</span>

        <div class="ratio">
          <span>+ 5.78%</span>
          <span class="cut">|</span>
          <span>+ $23.87</span>
        </div>
      </div>

      <div class="mbl-container-button">
        <div>
          <img src="../assets/plus2.png">
          Add
        </div>

        <div>
          <img src="../assets/pencil2.png">
          Edit
        </div>
      </div>

    </div>

    <!-- list crypto dans autre comopnent -->
    bite
  </div>

</template>


<script>
  import CurrentBalance from "@/components/left-container/CurrentBalance.card.vue";
  import ProfitLoss from "@/components/left-container/ProfitLoss.card.vue";
  import AddNewAsset from "@/components/left-container/AddNewAsset.card.vue";
  import UserData from "@/components/left-container/UserData.card.vue";
  import AssetList from "@/components/middle-container/AssetList.card.vue";
  import WalletGraph from "@/components/right-container/WalletGraph.card.vue";
  import WalletStatistic from "@/components/right-container/WalletStatistic.card.vue";
  import AssetStatistic from "@/components/right-container/AssetStatistic.card.vue";
  import { mapState } from 'vuex'
  import { auth, signOut } from '../plug-in/firebase.js';


  export default {
    name: "Home",
    components: {
      CurrentBalance,
      ProfitLoss,
      AddNewAsset,
      UserData,
      AssetList,
      WalletGraph,
      WalletStatistic,
      AssetStatistic,
    },
    data: function () {
      return {
        page: 'home',
        addCrypto: false,
        addWallet: false,
      }
    },
    computed: {
      ...mapState(['userData']),
    },
    methods: {
      logOutUser: function () {
        signOut(auth);
        location.reload()
        //this.$router.push({name: "Auth"})
      },
      deleteWalletUser: function () {
        const self = this
        this.$store.dispatch("deleteWalletUser", {
          walletName: this.$store.state.userData.userWalletSelected
        }).then(() => {
          self.$store.dispatch('loadUserWallet').then((e) => {
            if (e) {
              //select wallet 
              self.$store.dispatch('selectWallet', this.$store.getters.getUserWalletList[0]).then((e) => {
                if (e) {
                  //load deposit user
                  self.$store.dispatch('loadUserDeposit').then(() => {
                    self.$store.dispatch("loadUserCrypto", this.$store.getters.getUserUid).then((e) => {
                      if (e != false) {
                        self.$store.dispatch("loadCryptoPrice", this.$store.getters.getUserListCrypto).then(() => {
                          self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto)
                        })
                      } else {
                        self.$store.state.loadCryptoPrice = 0
                        self.$store.dispatch("loadWinLostValue", this.$store.getters.getUserDataCrypto)
                      }
                    })
                  })
                }
              })
            }
          })
        })
      },
      switchTheme: function () {
        if (this.$store.state.userTheme == "light") {
          this.$store.state.userTheme = "dark"
          document.documentElement.className = this.$store.state.userTheme;
          localStorage.setItem("user-theme", this.$store.state.userTheme)
        } else {
          this.$store.state.userTheme = "light"
          document.documentElement.className = this.$store.state.userTheme;
          localStorage.setItem("user-theme", this.$store.state.userTheme)
        }
      }
    },
    beforeMount() {
      this.$store.state.userTheme = localStorage.getItem("user-theme")
      document.documentElement.className = this.$store.state.userTheme
      const self = this;

      //load uid email
      this.$store.dispatch('loadUserData').then(() => {
        //load crypto list server
        self.$store.dispatch('loadCryptoList').then(() => {
          //load wallet user
          self.$store.dispatch('loadUserWallet').then((e) => {
            if (e) {
              //select wallet 
              self.$store.dispatch('selectWallet', this.$store.getters.getUserWalletList[0]).then((e) => {
                if (e) {
                  //load deposit user
                  self.$store.dispatch('loadUserDeposit').then(() => {
                    //load crypto user
                    self.$store.dispatch('loadUserCrypto', this.$store.getters.getUserUid).then((e) => {
                      if (e != false) {
                        //load crypto price
                        self.$store.dispatch('loadCryptoPrice', this.$store.getters.getUserListCrypto).then(() => {
                          self.$store.dispatch('UserSelectedAsset', {
                            symbol: self.$store.state.userData.userDataCrypto[0].symbol,
                            nameForEdit: self.$store.state.userData.userDataCrypto[0].crypto,
                          })
                          //calcul win loss user
                          self.$store.dispatch('loadEurPrice').then((e) => { if (!e) { self.$store.state.eurPrice = 0.90 } })
                          self.$store.dispatch('loadWinLostValue', this.$store.getters.getUserDataCrypto).then(() => {
                            self.$store.dispatch('loadCryptoPriceHistoryMth', this.$store.getters.getUserData).then(() => {
                              self.$store.state.readyForLoadGraph = 3
                              self.$store.dispatch('loadMeanPriceWallet')
                              self.$store.dispatch('loadMinPriceWallet')
                              self.$store.dispatch('loadMaxPriceWallet')
                            })
                          })
                        })
                      } else {
                        self.$store.dispatch('loadEurPrice').then((e) => { if (!e) { self.$store.state.eurPrice = 0.90 } })
                        self.$store.state.readyForLoadGraph = 3
                      }
                    })
                  })
                }
              })
            }
          })
        })
      })
    },
  };
</script>

<style lang="scss">
  :root {
    --background-color: white;
    --background-color-card: #f7f7f7;
    --background-color-card-statistic: #ffffff;
    --background-input: #ffffff;
    --background-switch: #E3E3E3;
    --color-font: #000000;
    --delete-border: 1px solid #DADADA;
    --color-label: #686868;
    --border-bottom: 1px solid #e1e1e1;
    --background-selected: #e3e3e3;
    --colo-row-asset-list: #d6d6d6;
  }

  :root.dark {
    --background-color: #222222;
    --background-color-card: #2A2B31;
    --background-color-card-statistic: #36383F;
    --background-input: #4C4E56;
    --color-font: #ffffff;
    --delete-border: 1px solid #414141;
    --color-label: #AFAFAF;
    --border-bottom: none;
    --background-switch: #4C4E56;
    --background-selected: #3A3B42;
    --colo-row-asset-list: #424242;
  }

  #app {
    background-color: var(--background-color);
  }

  * {
    transition: 0.3s;
  }

  /* GLOBAL STYLE */

  .ca-box-sold {
    background-color: var(--background-color-card);
    height: 93px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 0px 17px;
    margin: 8px;
    min-width: 100px;
  }

  .sold-title {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-font);
  }

  .sold-data {
    font-size: 18px;
    font-weight: 500;
    color: var(--color-font);
  }

  .sold-data-convert {
    font-size: 12px;
    font-weight: 400;
    color: #686868;
  }

  .container-wallet-statistic {
    width: 275px;
    background-color: var(--background-color-card-statistic);
    border-radius: 10px;
    padding: 20px;
    color: var(--color-font);
  }

  .box-statistic {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 15px 0px;
    border-top: 1px solid #e9e9e9;
    padding: 15px 0px;
    border-bottom: 1px solid #e9e9e9;
  }

  .box-statistic div {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .box-statistic div .statistic-title {
    color: var(--color-label);
    font-size: 12px;
    font-weight: 500;
  }

  .box-statistic input {
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

  .end-box {
    border: none;
    padding: 0;
    margin: 0;
  }

  .statistic-data {
    font-size: 16px;
    font-weight: 500;
    margin-top: 5px;
  }

  .box-asset-select {
    display: flex;
    align-items: center;
  }

  .box-asset-select span {
    margin-left: 5px;
  }

  .container-top-row img {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  .end-container-wallet {
    margin-top: 24px;
  }

  .orange {
    color: #C96203;
  }

  .green {
    color: #09A706;
  }

  .red {
    color: #e25454 !important;
  }

  .graph canvas {
    padding: 10px;
    background-color: var(--background-color-card-statistic);
    border-radius: 10px;
  }

  /*--------------*/



  /* CENTER CONTAINER */

  .ca-ctr-container {
    /*border: 1px solid rgb(255, 0, 0);*/
    width: 50%;
    min-width: 730px;
    display: flex;
    justify-content: center;
  }

  /*---------------*/



  /* LEFT CONTAINER */

  .ca-lft-container {
    /*border: 1px solid blue;*/
    width: 25%;
    min-width: 300px;
    margin-left: 1%;
  }

  .ca-container-logo {
    /*border: 1px solid green;*/
    display: flex;
    justify-content: center;
    margin-top: 27px;
  }

  .ca-container-logo img {
    width: 180px;
  }

  .ca-container-sold {
    /*border: 1px solid green;*/
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .ca-container-asset {
    /*border: 1px solid green;*/
    display: flex;
    justify-content: space-evenly;
    margin-top: 6px;
  }

  .ca-container-data {
    /*border: 1px solid green;*/
    display: flex;
    justify-content: space-evenly;
    margin-top: 15px;
    padding-bottom: 10px;
  }

  /*--------------*/



  /* RIGHT CONTAINER */

  .ca-rht-container {
    /*border: 1px solid rgb(0, 255, 94);*/
    width: 25%;
    min-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px;
    margin-right: 1%;
  }

  .ca-container-user {
    text-align: right;
    padding: 0px 21px 12px;
    display: flex;
    align-items: center;
  }

  .ca-container-user button {
    width: 100px;
    height: 33px;
    background-color: #ba3333;
    border-radius: 10px;
    border: none;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    margin-left: 17px;
  }

  .ca-container-user span {
    font-size: 12px;
    font-weight: 600;
    color: #686868;
    font-style: italic;
  }

  .ca-container-user img {
    width: 30px;
    margin-left: 20px;
  }

  .ca-container-wallet-data {
    background-color: var(--background-color-card);
    width: 351px;
    height: 810px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 810px;
  }

  .wallet-name {
    padding: 22px 22px 0px 22px;
    display: flex;
    justify-content: space-between;
    width: 90%;
  }

  .wallet-name div {
    font-size: 12px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-font);
  }

  .wallet-name button {
    width: 110px;
    height: 25px;
    background-color: #ba3333;
    border-radius: 10px;
    border: none;
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    /* margin-left: 17px; */
  }

  .number-asset {
    width: 80px;
    height: 17px;
    font-size: 10px !important;
    font-weight: 600;
    color: #686868;
    background-color: var(--background-color-card-statistic);
    border-radius: 15px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*--------------*/





  @media screen and (max-width: 450px) {
    .ca-lft-container, .ca-rht-container, .ca-ctr-container {
      display: none;
    }

    .ca-mobile-container-top {
      border: 1px solid red;
      height: 300px;
      width: 100vw;
    }
    .mbl-container-wallet-name {
      /* border: 1px solid pink; */
      display: flex;
      padding: 20px 20px 0px;
      justify-content: flex-end;
      align-items: center;
    }
    .mbl-container-wallet-name span {
      color: var(--color-font);
    }
    .mbl-container-wallet-name img {
      width: 20px;
      margin-left: 10px;
    }

    .mbl-container-balance {
     /*  border: 1px solid green; */
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 35px 0px 15px 0px;
    }
    .mbl-container-balance span {
      color: var(--color-font);
    }

    .mbl-container-balance .balance {
      font-size: 40px;
      font-weight: 700;
      margin-top: 15px;
    }

    .mbl-container-balance .ratio {
      background-color: #85B9A0;
      border-radius: 20px;
      padding: 7px 15px;
      margin: 10px 0px 0px;
    }

    .mbl-container-balance .ratio span {
      color: black;
    }

    .mbl-container-balance .ratio .cut {
      margin: 0px 10px 0px 15px;
      color: black;
      font-weight: 700;
    }

    .mbl-container-button{
      display: flex;
      justify-content: center;
    }
    .mbl-container-button img {
      background-color: #E3E3E3;
      margin: 8px;
      padding: 15px;
      border-radius: 20px;
    }
    .mbl-container-button div {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--color-font);
    }


  }
  @media screen and (min-width: 451px) {
    .ca-mobile-container {
      display: none;
    }
    
  }
</style>