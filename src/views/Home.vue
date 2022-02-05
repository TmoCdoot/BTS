<template>  
    <div v-if="addCrypto == true">
      <AddCrypto :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto"/>
    </div>
    <div class="topContener">
      <div class="logoContener">
        <img alt="Logo" src="../assets/logov1.png" class="logoBox"/>
      </div>
      
    </div>
    <div class="mainContener">
            <div class="leftHomeContener">
              <div class="assetsList">
                <CryptoList :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto"/>
              </div>
              <div class="walletsList">
                <ListWallet v-bind:deposit="userData.deposit"/>
              </div>
              <!-- <div class="leftStatContener">
                <WidgetStat/>
              </div> -->
            </div>
            <div class="rightHomeContener">
              <div class="chartsLine">
                <ChartStat/>
              </div>
              <div class="statisticList">
                <div class="userblock">
                  <div class="titleuser">
                    <h1>Statistic</h1>
                  </div>
                  <div class="conternsuer">
                    <Deposit v-bind:deposit="userData.deposit"/>
                    <WinLost v-bind:deposit="userData.deposit"/>
                  </div>
                  <div class="disconnectContener">
                      <button @click="logOutUser" class="disconnectButton"><h3>Disconnect</h3></button>
                  </div>
                </div>
                
              </div>
               
              
            </div>
      
        
    </div>
   <!--  <div style="color: aliceblue;">{{ userData.email }}</div><br>
    <div style="color: aliceblue;">{{ userData.uid }}</div>
    <div class="disconnectContener">
      <div>
        <button @click="logOutUser" class="disconnectButton">Disconnect</button>
      </div>
    </div> -->
</template>

<script>
    // @ is an alias to /src
import Deposit from "@/components/Deposit.widget.vue";
import ChartStat from "@/components/ChartStat.widget.vue";
import ListWallet from "@/components/ListWallet.widget.vue";
import WinLost from "@/components/WinLost.widget.vue";
import CryptoList from "@/components/CryptoList.widget.vue";
import AddCrypto from '@/components/AddCrypto.widget.vue'
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
  },
  data: function () {
    return {
      page: 'home',
      graph: 'wky',
      addCrypto: false,
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
      //console.log(this.page)
    },
    ChangeValueAddCrypto: function ( data ) {
      if (data == true) {
        if (this.addCrypto == true) {
          this.addCrypto = false
        } else {
          this.addCrypto = true
        }
      }
    }, 
  },
  beforeMount() {
      const self = this;
      this.$store.dispatch('loadUserData').then(() => {
        self.$store.dispatch('loadDataCrypto', this.$store.getters.getUserUid).then(() => {
          self.$store.dispatch('loadCryptoPrice', this.$store.getters.getUserListCrypto).then(() => {
            self.$store.dispatch('loadWinLostValue', this.$store.getters.getUserDataCrypto)
          })
        })
      })
    }
};
</script>

<style lang="scss">
.topContener {
  /* background-color: yellowgreen; */
  height: 10%;
    width: 100%;
/*     position: absolute; */
  display: flex;
}.logoContener {
  /* border: 1px solid red; */
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 50px;
}.logoBox  {
  /* border: 1px solid yellow; */
  margin-top: 5px;
  width: 120px;
}


.disconnectContener {
  /* width: 20%; */
  display: flex;
  align-items: center;
    justify-content: center;
}.disconnectButton {
  padding: 15px 50px 15px 50px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background: #E04F5F;
  color: aliceblue;
  font-size: 18px;
  cursor: pointer;
}


.mainContener {
  /* border: 1px solid blue; */
    height: 90%;
    width: 100%;
    display: flex;
}

.mainBigContener {
  display: flex;
  flex-direction: row;
}.leftHomeContener {
  /* border: 1px solid green; */
  width: 65%;
  /* margin-top: 100px; */
}.leftStatContener {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.assetsList {
  border: 1px solid red;
  height: 70%;
  width: 100%;
}
.walletsList {
  border: 1px solid yellow;
    height: 30%;
    width: 100%;
}
.statisticList {
  border: 1px solid white;
    height: 40%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.chartsLine {
  /* border: 1px solid red; */
    height: 60%;
    margin-right: 60px;
}

.rightHomeContener {
  border: 1px solid red;
  width: 35%;
  /* margin-top: 100px; */
}.depoWinWidgetContener {
  /*border: 1px solid blue;*/
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}.cryptoListContener {
  /*border: 1px solid pink;*/
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

button {
  text-decoration: none;  
  border: none;
  background: none;
  color: whitesmoke;
}

.userblock {
  background-color: #29353E;
  width: 70%;
    height: 80%;
    border-radius: 20px;
}
.titleuser {
  height: 50px;
    display: flex;
    /* justify-content: center; */
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
}
h3 {
  margin: 0px;
}
</style>