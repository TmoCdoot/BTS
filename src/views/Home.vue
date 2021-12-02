<template>
  {{ addCrypto }}
    <div v-if="addCrypto == true">
      <WidgetAddCrypto/>
    </div>
    <div class="topContener">
      <div class="logoContener">
        <img alt="Logo" src="../assets/logo.png" class="logoBox"/>
      </div>
      <div class="navContener">
        <div class="navContener-align">
          <ul class="navList">
            <li><button class="butttonBox" @click="changePage('home')" :class="{'activeButton' : activeButtonHome}">Home</button></li>
            <li><button class="butttonBox" @click="changePage('trade')" :class="{'activeButton' : activeButtonTrade}">Trade</button></li>
            <li><button class="butttonBox" @click="changePage('swap')" :class="{'activeButton' : activeButtonSwap}">Swap</button></li>
          </ul>
        </div>
      </div>
      <div class="disconnectContener">
        <div>
          <button @click="logOutUser" class="disconnectButton">Disconnect</button>
        </div>
      </div>
    </div>
    <div class="mainContener">
        <div v-if="page == 'home'"> 
          <div class="mainBigContener">
            <div class="leftHomeContener">
              <div class="leftStatContener">
                <WidgetStat/>
              </div>
            </div>
            <div class="rightHomeContener">
              <div class="depoWinWidgetContener">
                <WidgetDeposit/> <!-- un widget en fonction de chaque element-->
                <WidgetWinLoss/>
              </div>
              <div class="cryptoListContener">
                <WidgetCryptoList :addCrypto="addCrypto" @ChangeValueAddCrypto="ChangeValueAddCrypto"/>
              </div>
            </div>
          </div>
        </div>
        <div v-if="page == 'trade'"> 
          <WidgetStat title="trade"/>
        </div>
        <div v-if="page == 'swap'"> 
          <WidgetSwap title="swap"/>
        </div>
        
    </div>
    <div style="color: aliceblue;">{{ email }}</div><br>
    <div style="color: aliceblue;">{{ uid }}</div>
</template>

<script>
    // @ is an alias to /src
import WidgetDeposit from "@/components/WidgetDeposit.vue";
import WidgetStat from "@/components/WidgetStat.vue";
import WidgetSwap from "@/components/WidgetSwap.vue";
import WidgetWinLoss from "@/components/WidgetWinLoss.vue";
import WidgetCryptoList from "@/components/WidgetCryptoList.vue";
import WidgetAddCrypto from '@/components/WidgetAddCrypto.vue'
import { mapState } from 'vuex'
import { auth, signOut, onAuthStateChanged } from '../plug-in/firebase.js';


export default {
  name: "Home",
  components: {
    WidgetDeposit,
    WidgetStat,
    WidgetSwap,
    WidgetWinLoss,
    WidgetAddCrypto,
    WidgetCryptoList,
  },
  data: function () {
    return {
      page: 'home',
      email: '',
      uid: '',
      graph: 'wky',
      addCrypto: false,
    }
  },
  computed: {
    ...mapState(['user']),
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
    loadUser: function() {
      onAuthStateChanged(auth, user => { 
        //console.log(user)
        if (user) {
          this.email = user.email
          this.uid = user.uid
        }
      });
    },
    changePage: function (pageLoad) {
      if (this.page != pageLoad) {
        this.page = pageLoad
      }
      //console.log(this.page)
    },
    ChangeValueAddCrypto: function ( data ) {
      this.addCrypto = data;
    }
  },
  beforeMount() {
    this.loadUser()
  }
};
</script>

<style lang="scss">
.topContener {
  /*border: 1px solid green;*/
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: linear-gradient(180deg, #080808, #0e0909);
}.logoContener {
  /*border: 1px solid red;*/
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}.logoBox  {
  /*border: 1px solid yellow;*/
  margin-top: 5px;
  width: 120px;
}

.navContener {
  /*border: 1px solid green;*/
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}.navContener-align {
  /*border: 1px solid yellow;*/
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}.navList {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /*border: 1px solid yellow;*/
  padding: 4px 5px;
  border-radius: 15px;
  background-color: #272525;
}.butttonBox {
  /*border: 1px solid red;*/
  border-radius: 13px;
  padding: 7px 14px 7px 14px;
  cursor: pointer;
}.activeButton {
  background: linear-gradient(95deg, #e67429, #f3422b);
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
  /*border: 1px solid blue;*/
  margin-top: 50px;
}

.mainBigContener {
  display: flex;
  flex-direction: row;
}.leftHomeContener {
  /*border: 1px solid green;*/
  width: 50%;
}.leftStatContener {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.rightHomeContener {
  /*border: 1px solid red;*/
  width: 50%;
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