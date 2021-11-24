<template>
    <div class="box1">
      <div class="logo">
        <img alt="Logo" src="../assets/logo.png"/>
      </div>
      <div class="div">
        <div class="hori">
          <div class="nav">
            <div class="sousnav">
              <div class="active">Home</div>
              <div class="noactive middleNav">Trade</div>
              <div class="noactive">Swap</div>
            </div>
          </div>
        </div>
      </div>
      <div class="div2">
        <div>
          <button @click="dz" class="button">Disconnect</button>
        </div>
      </div>
        
    </div>
    <div class="widget">
        <!-- composent 1 pour depot -->
        <WidgetCustom1 title="Deposit" ammout="200"/>

        <!-- composent 2 pour gain/perte -->
        <div style="color: aliceblue;">{{ email }}</div><br>
        <div style="color: aliceblue;">{{ uid }}</div>
    </div>
</template>

<script>
    // @ is an alias to /src
import WidgetCustom1 from "@/components/WidgetCustom1.vue";
import { mapState } from 'vuex'
import { auth, signOut, onAuthStateChanged } from '../plug-in/firebase.js';


export default {
  name: "Home",
  components: {
    WidgetCustom1,
  },
  data: function () {
    return {
      email: '',
      uid: '',
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    dz: function () {
      signOut(auth);
      this.$store.dispatch('signOut')
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
    }
  },
  beforeMount() {
    this.loadUser()
  }
};
</script>

<style lang="scss">
.box1 {
  border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.logo {
  /*border: 1px solid red;*/
  width: 20%;
}
.div {
  /*border: 1px solid green;*/
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.widget {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
}
.div2 {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.nav {
  background-color: #272525;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 240px;
  height: 42px;
  border-radius: 20px;
}
.sousnav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.hori {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.active {
  background: linear-gradient(95deg, #e67429, #f3422b);
  border-radius: 20px;
  padding: 7px 14px 7px 14px;
}
.noactive {
  padding: 7px 13px 7px 13px;
}
.button {
  padding: 10px 35px 10px 35px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background: linear-gradient(95deg, #e67429, #f3422b);
  color: aliceblue;
  font-size: 18px;
}
</style>