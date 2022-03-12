<template>  
    <div v-if="addCrypto == true">
      <AddCrypto :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto"/>
    </div>
    <div v-if="navWallet == true">
      <NavWallet :navWallet="navWallet" @ChangeValueWalletNav="ChangeValueWalletNav" @AddWallet="AddWallet"/>
    </div>
    <div v-if="updateCrypto == true">
      <UpdateCrypto :updateCryptoName="updateCryptoName" :updateCryptoBuy="updateCryptoBuy" :updateCryptoQtt="updateCryptoQtt" @UpdateValueCrypto="UpdateValueCrypto"/>
    </div>
    <div v-if="updateDeposit == true">
      <UpdateDeposit :updateDeposit="userData.depositSelect" @UpdateDeposit="UpdateDeposit"/>
    </div>
    <div v-if="addWallet == true">
      <AddWallet @AddWallet="AddWallet"/>
    </div>
    <div class="topContener">
      <div class="burgerNav">
        <img src="../assets/burger-bar.png" alt="Burger" class="burger" @click="closeNav">
      </div>
      <div class="logoContener">
        <img alt="Logo" src="../assets/logov1.png" class="logoBox"/>
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
</template>

<script>
    // @ is an alias to /src
import Deposit from "@/components/Deposit.widget.vue";
import ChartStat from "@/components/ChartStat.widget.vue";
import ListWallet from "@/components/ListWallet.widget.vue";
import WinLost from "@/components/WinLost.widget.vue";
import CryptoList from "@/components/CryptoList.widget.vue";
import AddCrypto from '@/components/AddCrypto.widget.vue'
import NavWallet from '@/components/NavWallet.widget.vue'
import UpdateCrypto from '@/components/UpdateCrypto.widget.vue'
import UpdateDeposit from '@/components/UpdateDeposit.widget.vue'
import AddWallet from '@/components/AddWallet.widget.vue'
import { mapState } from 'vuex'
import { auth, signOut } from '../plug-in/firebase.js';


export default {
  name: "Home",
  components: {
    Deposit,
    ChartStat,
    WinLost,
    AddCrypto,
    CryptoList,
    ListWallet,
    NavWallet,
    UpdateCrypto,
    UpdateDeposit,
    AddWallet
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
    ...mapState(['userData', 'actualPrice']),
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
      this.$router.push('/')
    },
    changePage: function (pageLoad) {
      if (this.page != pageLoad) {
        this.page = pageLoad
      }
    },
    ChangeValueAddCrypto: function ( data ) {
      if (data == true) {
        if (this.addCrypto == true) {
          this.addCrypto = false
          document.getElementById('app').style.overflow = "initial";
        } else {
          this.addCrypto = true
          document.getElementById('app').style.overflow = "hidden";
        }
      }
    }, 
    ChangeValueWalletNav: function ( data ) {
      if (data == true) {
        if (this.navWallet == true) {
          this.navWallet = false
          document.getElementById('app').style.overflow = "initial";
        } else {
          this.navWallet = true
          document.getElementById('app').style.overflow = "hidden";
        }
      }
    },
    UpdateValueCrypto: function ( data ) {
      if (data['state'] == true) {
        if (this.updateCrypto == true) {
          this.updateCryptoName = data['cryptoName']
          this.updateCryptoBuy = data['cryptoBuy']
          this.updateCryptoQtt = data['cryptoQtt']
          this.updateCrypto = false
          document.getElementById('app').style.overflow = "initial";
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
          this.updateDeposit = false
          document.getElementById('app').style.overflow = "initial";
        } else {
          this.updateDeposit = true
          document.getElementById('app').style.overflow = "hidden";
        }
      }
    },
    AddWallet: function (data) {
      if (data == true) {
        if (this.addWallet == true) {
          this.addWallet = false
          document.getElementById('app').style.overflow = "initial";
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
              /* console.log(this.$store.getters.getUserWalletList[0]) */
              self.$store.dispatch('selectWallet', this.$store.getters.getUserWalletList[0]).then((e) => {
                if (e) {
                  /* console.log(this.$store.state.userData.walletSelected) */
                  //load deposit user
                  self.$store.dispatch('loadUserDeposit').then(() => {
                    //load crypto user
                    self.$store.dispatch('loadUserCrypto',this.$store.getters.getUserUid).then((e) => {
                      if (e != false) {
                        //load crypto price
                        self.$store.dispatch('loadCryptoPrice', this.$store.getters.getUserListCrypto).then(() => {
                          //calcul win loss user
                          self.$store.dispatch('loadWinLostValue', this.$store.getters.getUserDataCrypto).then(() => {
                            //calcul tableau
                            self.$store.dispatch('loadCryptoPriceHistoryHour')
                          })
                        })
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

<style lang="scss">
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
    padding-left: 50px;
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
            width: 315px;
        }
  }
  @media screen and (max-height: 815px) {
      .navWalletContener {
          height: 815px;
      }
  }
</style>