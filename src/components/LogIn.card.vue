<template>
  <div class="ca-account-container">
    <img src="../assets/logov2.png" v-if="userTheme == 'light'">
    <img src="../assets/logov1.png" v-if="userTheme == 'dark'">

    <div class="ca-container-form">
      <div class="asset-input">
        <label for="">Email</label>
        <input type="text" v-model="email">
      </div>

      <div class="asset-input">
        <label for="">Password</label>
        <input type="password" v-model="password">
      </div>

      <button class="asset-button" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}" @click="MethodLogIn">Log In</button>
      <span>New to CryptoAnalyze, <colorButton @click="SwitchTypeForm">Create account</colorButton></span>
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
      MethodLogIn: function () {
        const self = this;
        this.$store.dispatch("UserLogIn", {
            userEmail: this.email,
            userPassword: this.password,
        }).then((e) => {
          if (e) {
            self.$router.push('/home')
          }
        })
      },
      SwitchTypeForm: function () {
        this.$emit('SwitchTypeForm', true);
      },
  },
  beforeMount() {
    this.userTheme = localStorage.getItem("user-theme")
    if (this.userTheme == null) {
      this.userTheme = "light"
      localStorage.setItem("user-theme", this.userTheme)
    }
    document.documentElement.className = this.userTheme;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only / css unique au composent -->
<style scoped lang="scss">

</style>
