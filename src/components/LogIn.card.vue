<template>
  <div class="ca-account-container">
    <img src="../assets/logov2.png">

    <div class="ca-container-form">
      <div class="asset-input">
        <label for="">Email</label>
        <input type="text" v-model="email">
      </div>

      <div class="asset-input">
        <label for="">Password</label>
        <input type="password" v-model="password">
      </div>

      <button class="asset-button" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}" @click="LogIn">Log In</button>
      <span>New to CryptoAnalyze, <colorButton @click="ChangeIsUser">Create account</colorButton></span>
    </div>

    <div v-if="error == 'err_mail'" class="error">
      Password or Email incorrect
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Connect",
  props: {
    msg: String,
  },
  data: function () {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState(['error']),
    noEmptyField: function () {
      if (this.email != '' && this.password != '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
      LogIn: function () {
        const self = this;
        this.$store.dispatch("signIn", {
            email: this.email,
            password: this.password,
        }).then((e) => {
          if (e) {
            self.$router.push('/home')
          }
        })
      },
      ChangeIsUser: function () {
        this.$emit('ChangeIsUser', true);
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only / css unique au composent -->
<style scoped lang="scss">

</style>
