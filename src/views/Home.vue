<template>  
    <div v-if="addCrypto == true">
      <WidgetAddCrypto :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto"/>
    </div>
    <div class="topContener">
      <div class="logoContener">
        <img alt="Logo" src="../assets/logov1.png" class="logoBox"/>
      </div>
      
    </div>
    <div class="mainContener">
            <div class="leftHomeContener">
              <div class="assetsList">
                <WidgetCryptoList :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto"/>
              </div>
              <div class="walletsList">
                zefzeezf
              </div>
              <!-- <div class="leftStatContener">
                <WidgetStat/>
              </div> -->
            </div>
            <div class="rightHomeContener">
              <div class="chartsLine">
                <WidgetStat/>
              </div>
              <div class="statisticList">
                <WidgetDeposit v-bind:deposit="userData.deposit"/> un widget en fonction de chaque element
                <WidgetWinLoss v-bind:deposit="userData.deposit"/>
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
import WidgetDeposit from "@/components/WidgetDeposit.vue";
import WidgetStat from "@/components/WidgetStat.vue";

import WidgetWinLoss from "@/components/WidgetWinLoss.vue";
import WidgetCryptoList from "@/components/WidgetCryptoList.vue";
import WidgetAddCrypto from '@/components/WidgetAddCrypto.vue'
import { mapState } from 'vuex'
import { auth, signOut } from '../plug-in/firebase.js';


export default {
  name: "Home",
  components: {
    WidgetDeposit,
    WidgetStat,
    WidgetWinLoss,
    WidgetAddCrypto,
    WidgetCryptoList,
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
  height: 100px;
    width: 100%;
    position: absolute;
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
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}.disconnectButton {
  padding: 8px 30px 8px 30px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background: linear-gradient(95deg, #e67429, #f3422b);
  color: aliceblue;
  font-size: 18px;
  cursor: pointer;
}


.mainContener {
  /* border: 1px solid blue; */
    height: 100%;
    width: 100%;
    display: flex;
}

.mainBigContener {
  display: flex;
  flex-direction: row;
}.leftHomeContener {
  /* border: 1px solid green; */
  width: 65%;
  margin-top: 100px;
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
}
.chartsLine {
  border: 1px solid red;
    height: 60%;
    width: 100%;
}

.rightHomeContener {
  border: 1px solid red;
  width: 35%;
  margin-top: 100px;
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

</style>