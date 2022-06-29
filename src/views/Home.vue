<!-- <template>  

  <div id="loading_page">
    <img alt="Logo" src="../assets/test.png" id="logoBox_loading"/>
  </div>

  <div v-if="addCrypto == true">
    <AddCrypto :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto" id="add_crypto"/>
  </div>

  <div v-if="navWallet == true">
    <NavWallet :navWallet="navWallet" @ChangeValueWalletNav="ChangeValueWalletNav" @AddWallet="AddWallet" id="test"/>
  </div>

  <div v-if="updateCrypto == true">
    <UpdateCrypto :updateCryptoName="updateCryptoName" :updateCryptoBuy="updateCryptoBuy" :updateCryptoQtt="updateCryptoQtt" @UpdateValueCrypto="UpdateValueCrypto" id="update_crypto"/>
  </div>

  <div v-if="updateDeposit == true">
    <UpdateDeposit :updateDeposit="userData.depositSelect" @UpdateDeposit="UpdateDeposit" id="update_deposit"/>
  </div>

  <div v-if="addWallet == true">
    <AddWallet @AddWallet="AddWallet" id="add_wallet"/>
  </div>

  <div class="topContener">
    <div class="burgerNav">
      <img src="../assets/burger-bar.png" alt="Burger" class="burger" @click="closeNav">
    </div>
    <div class="logoContener">
      <img alt="Logo" src="../assets/test.png" class="logoBox"/>
    </div>
  </div>

  <div class="mainContener">

    <div class="leftHomeContener">
      <div class="assetsList">
        <CryptoList :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto" @UpdateValueCrypto="UpdateValueCrypto"/>
      </div>
      <div class="walletsList">
        <ListWallet @AddWallet="AddWallet"/>
      </div>
    </div>

    <div class="rightHomeContener">
      <div class="chartsLine">
        <ChartStat/>
      </div>
      <div class="statisticList">
        <div class="userblock">
          <div class="titleuser">
            <h1 class="titleStat">Statistic</h1>
          </div>
          <div class="conternsuer">
            <Deposit @UpdateDeposit="UpdateDeposit"/>
            <WinLost/>
          </div>
          <div class="disconnectContener">
            <button @click="logOutUser" class="disconnectButton"><h3>Disconnect</h3></button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template> -->


<template>

  <div class="ca-lft-container">

    <div class="ca-container-logo">
      <img src="../assets/logov2.png">
    </div>

    <div class="ca-container-sold">
      <div class="ca-box-sold">
        <span class="sold-title">Current balance</span>
        <span class="sold-data">8 240 $</span>
        <span class="sold-data-convert">7 856 $</span>
      </div>

      <div class="ca-box-sold">
        <span class="sold-title">Current balance</span>
        <span class="sold-data">+ 320 $</span>
        <span class="sold-data-convert">+ 3.05 %</span>
      </div>
    </div>

    <div class="ca-container-asset">
      <div class="ca-box-asset">
        <span>Add new asset</span>

        <div class="asset-switch">
          <switch id="crypto" class="active-switch">Crypto</switch>
          <switch id="etf">ETF</switch>
          <switch id="forex">Forex</switch>
        </div>

        <div class="asset-input">
          <label for="">Actif</label>
          <select name="" id="">
            <option value="">CHZ</option>
          </select>
        </div>

        <div class="asset-input">
          <label for="">Quantity</label>
          <input type="text" name="" id="">
        </div>

        <div class="asset-input">
          <label for="">Buy price</label>
          <input type="text" name="" id="">
        </div>

        <button class="asset-button">Add asset</button>

      </div>
    </div>

    <div class="ca-container-data">

      <div class="box-data">
        <div class="box-data-row">
          <span class="box-data-title">Balance</span>
          <span class="box-data-data">10 000 $</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">ETF number</span>
          <span class="box-data-data">1</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">Crypto number</span>
          <span class="box-data-data">2</span>
        </div>

        <div class="box-data-row">
          <span class="box-data-title">FOREX number</span>
          <span class="box-data-data">1</span>
        </div>

        <div class="box-data-row end">
          <span class="box-data-title">Action number</span>
          <span class="box-data-data">1</span>
        </div>
      </div>
      

    </div>

  </div>

  <div class="ca-ctr-container">
    <div class="ca-container-asset-list">

      <div class="ca-container-wallet">
        <span>Wallet name</span>
        <button>New wallet</button>
      </div>

      <div class="ca-container-top-list">
        <span>Asset</span>
        <span>Price</span>
        <span>Buy price</span>
        <span> Quantity</span>
        <span>Profit / Loss</span>
        <span>Edit</span>
      </div>

      <div class="ca-row-asset-data">
        <div class="asset">
          <img src="../../public/img/cardano.png">
          <span>ADA</span>
        </div>
        
        <span>0.34 $</span>

        <span>0.24 $</span>

        <span>10</span>

        <span>+ 100 %</span>

        <div class="center-img">
          <img src="../assets/pencil.png">
        </div>
        
      </div>

      <div class="ca-row-asset-data">
        <div class="asset">
          <img src="../../public/img/DENT.png">
          <span>DENT</span>
        </div>
        
        <span>240 200 $</span>

        <span>12.4 $</span>

        <span>2 105 500</span>

        <span>+ 120 200 %</span>

        <div class="center-img">
          <img src="../assets/pencil.png">
        </div>
        
      </div>

    </div>
  </div>

  <div class="ca-rht-container">
    <div class="ca-container-user">
      <span>test@gmail.com</span>
      <button>Disconnect</button>
    </div>

    <div class="ca-container-wallet-data">
      <div class="wallet-name">
        <span>Wallet name</span>
        <span class="number-asset">3 asset</span>
      </div>

      <!-- graphique -->

      <div class="container-wallet-statistic">
        <span class="container-wallet-title">Statistic</span>

        <div class="box-statistic">
          <div>
            <span class="statistic-title">Max balance</span>
            <span class="statistic-data">9 540 $</span>
          </div>
          <div>
            <span class="statistic-title">Min balance</span>
            <span class="statistic-data">7 240 $</span>
          </div>
        </div>

        <div class="box-statistic end-box">
          <div>
            <span class="statistic-title">Mean balance</span>
            <span class="statistic-data">8 450 $</span>
          </div>
          <div>
            <span class="statistic-title">Risk</span>
            <span class="statistic-data orange">45 %</span>
          </div>
        </div>
      </div>

      <div class="container-wallet-statistic end-container-wallet">
        <div class="container-top-row">
          <div class="box-asset-select">
            <img src="../../public/img/cardano.png" >
            <span class="container-wallet-title">ADA</span>
          </div>
          <img src="../assets/pencil.png">
        </div>
        

        <div class="box-statistic">
          <div>
            <span class="statistic-title">Price</span>
            <span class="statistic-data">0.34 $</span>
          </div>
          <div>
            <span class="statistic-title">Min balance</span>
            <span class="statistic-data">0.24 $</span>
          </div>
        </div>

        <div class="box-statistic end-box">
          <div>
            <span class="statistic-title">Quantity</span>
            <span class="statistic-data">10</span>
          </div>
          <div>
            <span class="statistic-title">Profit / Loss</span>
            <span class="statistic-data green">+ 100 %</span>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>


<script>
    // @ is an alias to /src
/* import Deposit from "@/components/Deposit.widget.vue";
import ChartStat from "@/components/ChartStat.widget.vue";
import ListWallet from "@/components/ListWallet.widget.vue";
import WinLost from "@/components/WinLost.widget.vue";
import CryptoList from "@/components/CryptoList.widget.vue";
import AddCrypto from '@/components/AddCrypto.widget.vue'
import NavWallet from '@/components/NavWallet.widget.vue'
import UpdateCrypto from '@/components/UpdateCrypto.widget.vue'
import UpdateDeposit from '@/components/UpdateDeposit.widget.vue'
import AddWallet from '@/components/AddWallet.widget.vue' */
import { mapState } from 'vuex'
import { auth, signOut } from '../plug-in/firebase.js';


export default {
  name: "Home",
  components: {
    /* Deposit,
    ChartStat,
    WinLost,
    AddCrypto,
    CryptoList,
    ListWallet,
    NavWallet,
    UpdateCrypto,
    UpdateDeposit,
    AddWallet */
  },
  data: function () {
    return {
      page: 'home',
      graph: 'wky',
      addCrypto: false,
      navWallet: false,
      updateCrypto: false,
      updateDeposit: false,
      addWallet: false,
      updateCryptoName: '',
      updateCryptoBuy: 0,
      updateCryptoQtt: 0
    }
  },
  computed: {
    ...mapState(['userData']),
    activeButtonHome: function () {
      if (this.page == 'home') {
        return true
      } else {
        return false
      }
    },
    activeButtonTrade: function () {
      if (this.page == 'trade') {
        return true
      } else {
        return false
      }
    },
    activeButtonSwap: function () {
      if (this.page == 'swap') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    logOutUser: function () {
      signOut(auth);
      this.$router.push({name: "Auth"})
    },
    changePage: function (pageLoad) {
      if (this.page != pageLoad) {
        this.page = pageLoad
      }
    },
    ChangeValueAddCrypto: function ( data ) {
      if (data == true) {
        if (this.addCrypto == true) {
          document.getElementById('add_crypto').style.opacity = "0%";
          document.getElementById('app').style.overflow = "initial";
          setTimeout(()=> {this.addCrypto = false}, 400)
        } else {
          this.addCrypto = true
          document.getElementById('app').style.overflow = "hidden";
        }
      }
    }, 
    ChangeValueWalletNav: function ( data ) {
      if (data == true) {
        if (this.navWallet == true) {
          document.getElementById('test').style.transform = "translateX(-100%)";
          document.getElementById('app').style.overflow = "initial";
          setTimeout(()=> {this.navWallet = false}, 1000)
          
        } else {
          
          document.getElementById('test').style.transform = "translateX(100%)";
          document.getElementById('app').style.overflow = "hidden";
          setTimeout(()=> {this.navWallet = false}, 1000)
        }
      }
    },
    UpdateValueCrypto: function ( data ) {
      if (data['state'] == true) {
        if (this.updateCrypto == true) {
          document.getElementById('update_crypto').style.opacity = "0%";
          this.updateCryptoName = data['cryptoName']
          this.updateCryptoBuy = data['cryptoBuy']
          this.updateCryptoQtt = data['cryptoQtt']
          document.getElementById('app').style.overflow = "initial";
          setTimeout(()=> {this.updateCrypto = false}, 400)
        } else {
          this.updateCryptoName = data['cryptoName']
          this.updateCryptoBuy = data['cryptoBuy']
          this.updateCryptoQtt = data['cryptoQtt']
          this.updateCrypto = true
          document.getElementById('app').style.overflow = "hidden";
        }
      }
    },
    UpdateDeposit: function (data) {
      if (data == true) {
        if (this.updateDeposit == true) {
          document.getElementById('update_deposit').style.opacity = "0%";
          document.getElementById('app').style.overflow = "initial";
          setTimeout(()=> {this.updateDeposit = false}, 400)
        } else {
          this.updateDeposit = true
          document.getElementById('app').style.overflow = "hidden";
        }
      }
    },
    AddWallet: function (data) {
      if (data == true) {
        if (this.addWallet == true) {
          document.getElementById('add_wallet').style.opacity = "0%";
          document.getElementById('app').style.overflow = "initial";
          setTimeout(()=> {this.addWallet = false}, 400)
        } else {
          this.addWallet = true
          document.getElementById('app').style.overflow = "hidden";
        }
      }
    },
    closeNav: function () {
      this.navWallet = true;  
      document.getElementById('app').style.overflow = "hidden";
    }
  },
  beforeMount() {
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
                    self.$store.dispatch('loadUserCrypto',this.$store.getters.getUserUid).then((e) => {
                      if (e != false) {
                        //load crypto price
                        self.$store.dispatch('loadCryptoPrice', this.$store.getters.getUserListCrypto).then(() => {
                          //calcul win loss user
                          self.$store.dispatch('loadEurPrice').then((e) => { if(!e) {self.$store.state.eurPrice = 0.90} })
                          self.$store.dispatch('loadWinLostValue', this.$store.getters.getUserDataCrypto).then(() => {
                            //calcul graph dly
                            self.$store.dispatch('loadCryptoPriceHistoryHour').then(() => {
                              self.$store.state.readyForLoadGraph = self.$store.state.readyForLoadGraph+1

                              self.$store.dispatch('loadCryptoPriceHistoryWly').then(() => {
                                self.$store.state.readyForLoadGraph = self.$store.state.readyForLoadGraph+1

                                self.$store.dispatch('loadCryptoPriceHistoryMth').then(() => {
                                  self.$store.state.readyForLoadGraph = self.$store.state.readyForLoadGraph+1
                                  
                                  if (self.$store.state.readyForLoadGraph == 3) {
                                    document.getElementById('loading_page').style.opacity = '0'
                                    document.getElementById('loading_page').style.pointerEvents = 'none'
                                    document.getElementById('logoBox_loading').style.opacity = '0'
                                    document.getElementById('logoBox_loading').style.pointerEvents = 'none'
                                    document.getElementById('logoBox_loading').style.width = '400px'
                                    document.getElementById('app').style.overflow = 'initial'
                                  }
                                })
                              })                            
                            })
                          })
                        })
                      } else {
                        self.$store.dispatch('loadEurPrice').then((e) => { if(!e) {self.$store.state.eurPrice = 0.90} })
                        document.getElementById('loading_page').style.opacity = '0'
                        document.getElementById('loading_page').style.pointerEvents = 'none'
                        document.getElementById('logoBox_loading').style.opacity = '0'
                        document.getElementById('logoBox_loading').style.pointerEvents = 'none'
                        document.getElementById('logoBox_loading').style.width = '400px'
                        document.getElementById('app').style.overflow = 'initial'
                      }            
                    })
                  })
                }
              })
            }
          })
        })
      })
    }
};
</script>

<!-- <style lang="scss">
  .topContener {
    height: 10%;
    width: 100%;
    display: flex;
  }
  .disconnectContener {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
  .disconnectButton {
    padding: 15px 50px 15px 50px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    background: #E04F5F;
    color: aliceblue;
    font-size: 18px;
    cursor: pointer;
  }
  .logoContener {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 40px;
  }
  .logoBox  {
    margin-top: 5px;
    width: 120px;
  }
  .mainContener {
    height: 90%;
    width: 100%;
    display: flex;
  }
  .mainBigContener {
    display: flex;
    flex-direction: row;
  }
  .leftHomeContener {
    width: 65%;
  }
  .leftStatContener {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .assetsList {
    height: 70%;
    width: 100%;
  }
  .walletsList {
    height: 30%;
    width: 100%;
  }
  .statisticList {
    height: 40%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chartsLine {
    height: 60%;
    margin-right: 60px;
  }
  .rightHomeContener {
    width: 35%;
  }
  .depoWinWidgetContener {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .userblock {
    background-color: #29353E;
    border-radius: 20px;
  }
  .titleuser {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .conternsuer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
  h3 {
    margin: 0px;
  }
  .burgerNav {
    display: none;
  }
  .inferior {
    color: #fd1717;
  }
  .superior {
    color: green;
  }
  #loading_page {
    background-color: #29353e;
    position: absolute;
    width: 100%;
    height: 100vh;
    transition: 1.5s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #logoBox_loading {
    transition: 0.8s;
  }
  #app {
    overflow: hidden;
  }

  #test {
    animation: slidein 0.5s cubic-bezier(0.09, -0.01, 0.24, 0.99);
    transition: 0.5s;
  }

  @keyframes slidein {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0%);
    }
  }

  #add_crypto, #update_crypto, #add_wallet, #update_deposit {
    animation: pop 0.4s cubic-bezier(0, 0.15, 0, 0.99);
    transition: 0.4s;
  }
  @keyframes pop {
    from {
      opacity: 0%;
    }

    to {
      opacity: 100%;
    }
  }


  @media screen and (max-width: 1361px) {
    .mainContener {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .logoContener {
      padding-right: 15px;
      justify-content: flex-end;
      width: 100%;
    }
    .leftHomeContener {
      width: 100%;
      height: 80%;
    }
    .assetsList {
      height: 100%;
    }
    .walletsList {
      display: none;
    }
    .rightHomeContener {
      width: 100%;
    }
    .chartsLine {
      height: 80%;
      margin-right: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .statisticList {
      padding-bottom: 10px;
    }
    .userblock {
      width: auto;
      height: auto;
    }
    .conternsuer {
      margin-left: 10px;
      margin-right: 10px;
    }
    .disconnectContener {
      padding-bottom: 15px;
    }
    .burgerNav {
      display: initial;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .burger {
      width: 30px;
    }
    .img {
      width: 30px;
      height: 30px;
    }
  }
  @media (max-width: 400px) and (max-height: 850px) {
      .disconnectContener {
          margin-bottom: 0px;
      }
  }
  @media (max-width: 686px) and (max-height: 850px) {
    .titleStat {
      font-size: 25px;
    }
    h2 {
      font-size: 25px;
    }
  }
  @media (min-width: 0px) and (max-width: 1060px) {
        .navWalletContener {
            width: 100%;
        }
  }
  @media screen and (max-height: 815px) {
      .navWalletContener {
          height: 815px;
      }
  }
</style> -->

<style lang="scss">
  .ca-lft-container {
    border: 1px solid blue;
    height: 100vh;
    width: 20%;
    min-width: 300px;
  }
  .ca-ctr-container {
    border: 1px solid rgb(255, 0, 0);
    height: 100vh;
    width: 55%;
    min-width: 730px;
    display: flex;
    justify-content: center;
  }
  .ca-rht-container {
    border: 1px solid rgb(0, 255, 94);
    height: 100vh;
    width: 25%;
    min-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px;
  }

  .ca-container-logo {
    border: 1px solid green;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .ca-container-sold {
    border: 1px solid green;
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
  }
  .ca-box-sold {
    background-color: #F7F7F7;
    height: 93px;
    width: 135px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-left: 17px;
  }
  .sold-title {
    font-size: 12px;
    font-weight: 500;
  }
  .sold-data {
    font-size: 20px;
    font-weight: 500;
  }
  .sold-data-convert {
    font-size: 12px;
    font-weight: 400;
    color: #686868;
  }
  .ca-container-asset{
    border: 1px solid green;
    display: flex;
    justify-content: space-evenly;
    margin-top: 15px;
  }
  .ca-box-asset {
    padding-top: 21px;
    padding-bottom: 21px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 276px;
    border-radius: 15px;
    background-color: #F7F7F7;
  }
  .ca-box-asset span {
    font-size: 16px;
    font-weight: 600;
    width: 240px;
  }
  .asset-switch {
    background-color: #e3e3e3;
    width: 244px;
    height: 47px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 19px;
    margin-bottom: 29px;
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
    color: #686868;
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
  .ca-container-data {
    border: 1px solid green;
    display: flex;
    justify-content: space-evenly;
    margin-top: 15px;
  }
  .box-data {
    width: 276px;
    background-color: #f7f7f7;
    border-radius: 15px;
  }
  .box-data-row {
    padding: 10px 20px;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    justify-content: space-between;
  }
  .box-data-title {
    font-size: 12px;
    font-weight: 500;
    color: #686868;
  }
  .box-data-data {
    font-size: 12px;
    font-weight: 500;
  }
  .end {
    border: none;
  }

  .ca-container-asset-list {
    width: 700px;
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

  .ca-container-user {
    text-align: right;
    padding: 0px 21px 12px;
    width: 90%;
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

  .ca-container-wallet-data {
    background-color: #f2f2f2;
    width: 351px;
    height: 925px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .wallet-name {
    padding: 22px;
    display: flex;
  }
  .wallet-name span {
    font-size: 12px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .number-asset {
    width: 80px;
    height: 17px;
    font-size: 10px;
    font-weight: 600;
    color: #686868;
    background-color: #ffffff;
    border-radius: 15px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-wallet-statistic {
    width: 275px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
  }
  .container-wallet-title {
    font-weight: 700;
    font-size: 16px;
    margin-left: 5px;
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
  }
  .box-statistic div .statistic-title {
    color: #686868;
    font-size: 12px;
    font-weight: 500;
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
  .container-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .box-asset-select {
    display: flex;
    align-items: center;
  }
  .container-top-row img {
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
  
</style>