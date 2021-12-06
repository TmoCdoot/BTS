<template>
    <div class="hello">
        <div class="contener">
          <h2>{{ msg }}</h2>
          <p>If you have a account, <router-link to="/" class="buttonLink">Sign In</router-link></p>
            <div>
              <input type="email" placeholder="Email" class="email" v-model="email">
            </div><br>
            <div>
              <input type="password" placeholder="Password" class="password" v-model="password">
            </div><br>
            <div>
                <input type="password" placeholder=" Confirm password" class="password" v-model="confirm_pass">
            </div><br>
            <div>
                <input type="number" placeholder="Deposit" class="deposit" v-model="deposit">
            </div><br>
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
            <div>
              <button @click="createAccount" id="buttonSignIn" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Sign Up</button>
            </div><br>
          
        </div>
      </div>
</template>

<script>
import { mapState } from 'vuex'
import { setDoc, db, doc } from "../plug-in/firebase.js";

export default {
  name: "Form",
  props: {
    msg: String,
  },
  data: function () {
    return {
      email: '',
      password: '',
      confirm_pass: '',
      deposit: '',
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
      createAccount: function () {
        const deposit = this.deposit
        const self = this
        this.$store.dispatch("createAuth", {
            email: this.email,
            password: this.password,
            confirm_pass: this.confirm_pass,
            deposit: this.deposit,
        }).then((userUidReturn) => {
          setDoc(doc(db, "User", userUidReturn), { 
            deposit: deposit,
            crypto: {},
          }).then(() => {self.$router.push('/')})
      })
    }
  }
};
</script>

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
  border-radius: 15px;
}
.email, .password, .deposit {
  padding: 12px 130px 12px 40px;
  border: none;
  border-radius: 15px;
  padding-left: 10px;
  font-weight: bold;
  background-color: rgb(233, 233, 233);
}
::placeholder {
  color: #9c9c9c;
}
#buttonSignIn {
  padding: 12px 125px 12px 125px;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  background-image: linear-gradient(95deg, #e67429, #f3422b);
  color: aliceblue;
  font-size: 18px;
  transition: 0.5s;
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