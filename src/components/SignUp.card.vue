<template>
  <div class="ca-account-container" >
    <img src="../assets/logov2.png">

    <div class="ca-container-form create-account">
      <div class="asset-input">
        <label for="">Email</label>
        <input type="text" v-model="email">
      </div>

      <div class="asset-input">
        <label for="">Password</label>
        <input type="password" v-model="password">
      </div>

      <div class="asset-input">
        <label for="">Confirm password</label>
        <input type="password" v-model="confirm_pass">
      </div>

      <div class="asset-input">
        <label for="">Deposit</label>
        <input type="text" v-model="deposit">
      </div>

      <div class="asset-input">
        <label for="">Name account</label>
        <input type="text" v-model="account">
      </div>

      <button class="asset-button" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}" @click="SignUp">Sign Up</button>
      <span>Already have an account, <colorButton @click="ChangeIsUser">Log In</colorButton></span>
    </div>

    <div v-if="error == 'err_mail'" class="error">
      Email incorrect
    </div>

    <div v-if="error == 'err_depo'" class="error">
      Your deposit is not good
    </div>

    <div v-if="error == 'err_pass'" class="error">
      Confirm password not good
    </div>

    <div v-if="error == 'auth/weak-password'" class="error">
      Your password must have 6 character minimum
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "SignUp",
  data: function () {
    return {
      email: '',
      password: '',
      confirm_pass: '',
      deposit: '',
      account: '',
    }
  },
  computed: {
    ...mapState(['error']),
    noEmptyField: function () {
      if (this.email != '' && this.password != '' && this.confirm_pass != '' && this.deposit != '' && this.account != '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    SignUp: function () {
        const self = this
        this.$store.dispatch("signUp", {
            email: this.email,
            password: this.password,
            confirm_pass: this.confirm_pass,
            deposit: this.deposit,
            account: this.account,
        }).then(() => {
          self.$emit('ChangeIsUser', true);
      })
    },
    ChangeIsUser: function () {
      this.$emit('ChangeIsUser', true);
    },
  }
};
</script>

<style scoped lang="scss">
  .create-account {
    height: 570px;
  }
</style>