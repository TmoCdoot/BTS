<template>
    <div class="box1">
        <img alt="Logo" src="../assets/logo.png" />
    </div>
    <div class="widget">
        <!-- composent 1 pour depot -->
        <WidgetCustom1 title="Deposit" ammout="200"/>
        <WidgetCustom1 title="Gain / Lost" ammout="124" signe="+" color1="#e67429" color2="#f3422b"/>
        <!-- composent 2 pour gain/perte -->
        <button @click="dz">fe</button>
        {{ $store.state.user }} <br>
    </div>
</template>

<script>
    // @ is an alias to /src
import WidgetCustom1 from "@/components/WidgetCustom1.vue";
//import { mapState } from 'vuex'
import { auth, signOut } from '../plug-in/firebase.js';


export default {
  name: "Home",
  components: {
    WidgetCustom1,
  },
  methods: {
    dz: function () {
      signOut(auth);
      this.$store.dispatch("signOutUser")
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss">
.box1 {
    border: 1px solid green;
}

.widget {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
}
</style>