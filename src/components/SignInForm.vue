<template>
  <div class="hello">
    <div class="contener">
      <h2>{{ msg }}</h2>
      <p>If you don't have a account, <router-link to="/signup" class="buttonLink">Sign Up</router-link></p>
      <div>
        <input type="email" placeholder="Email" class="email" v-model="email">
      </div><br>
      <div>
        <input type="password" placeholder="Password" class="password" v-model="password">
      </div><br>
      <div v-if="error == 'err_mail'" class="error">
        Password or Email incorrect
      </div>
      <div>
        <button @click="signIn" id="buttonSignIn" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Sign In</button>
      </div><br>
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
      if (this.email != '' && this.password != '' && this.confirm_pass != '' && this.deposit != '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
      signIn: function () {
        const self = this;
        this.$store.dispatch("signIn", {
            email: this.email,
            password: this.password,
        }).then(() => {
          self.$router.push('/home')
        })
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only / css unique au composent -->
<style scoped lang="scss">
.hello {
  margin-top: 30px;
  /*border: 1px solid yellow;*/
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  color: whitesmoke;
}
.contener {
  background-color: rgb(39, 37, 37);
  width: 400px;
  border-radius: 10px;
}
.email, .password {
  padding: 12px 130px 12px 40px;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
  font-weight: bold;
  background-color: rgb(233, 233, 233);
}
::placeholder {
  color: #9c9c9c;
}
#buttonSignIn {
  padding: 12px 130px 12px 130px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: linear-gradient(95deg, #e67429, #f3422b);
  color: aliceblue;
  font-size: 18px;
}
.buttonLink {
  color: #e67429;
}
p {
  font-style: oblique;
}
.error {
  margin-bottom: 17px;
  font-style: italic;
}
.unactive {
  background-image: linear-gradient(95deg, #444444, #1c1c1c) !important;
  color: #707070 !important;
  transition: 0.5s;
}
</style>
