<template>
    <div class="box1">
      <div class="logo">
        <img alt="Logo" src="../assets/logo.png"/>
      </div>
      <div class="div">
        <div class="nav">
          <div class="sousnav">
            <div>Home</div>
            <div>Trade</div>
            <div>Swap</div>
          </div>
        </div>
      </div>
      <div class="div2">
        <button @click="dz">fe</button>
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
    test: function() {
      onAuthStateChanged(auth, user => { 
        console.log(user)
        if (user) {
          this.email = user.email
          this.uid = user.uid
        }
      });
    }
  },
  beforeMount() {
    this.test()
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
  border: 1px solid red;
  width: 20%;
}
.div {
  border: 1px solid green;
  width: 60%;
}

.widget {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
}
.div2 {
  width: 20%;
}
img {
  width: 100%;
}

.nav {
  background-color: #272525;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  height: 40px;
  border-radius: 20px;
}
.sousnav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>