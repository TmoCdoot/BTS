<template>
    <div class="hello">
        <div class="contener">
          <h2>{{ msg }}</h2>
          <p>If you have a account,<button class="buttonLink" @click="ChangeState">Sign In</button></p>
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
              <button @click="signUp" id="buttonSignIn" :="{'disabled' : !noEmptyField}" :class="{'unactive' : !noEmptyField}">Sign Up</button>
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
    signUp: function () {
        const deposit = this.deposit
        const self = this
        this.$store.dispatch("signUp", {
            email: this.email,
            password: this.password,
            confirm_pass: this.confirm_pass,
            deposit: this.deposit,
        }).then((userUid) => {
          setDoc(doc(db, "UserCrypto", userUid), { 
            deposit: deposit,
          }).then(() => {
            self.$router.push('/')
          })
      })
    },
    ChangeState: function () {
        this.$emit('ChangeState', true);
      },
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
  background-color: #29353E;
  padding-left: 15px;
    padding-right: 15px;
  border-radius: 15px;
}
.email, .password, .deposit {
  padding: 12px 130px 12px 40px;
  border: none;
  border-radius: 15px;
  padding-left: 10px;
  font-weight: bold;
  background-color: #1E2124;
}
::placeholder {
  color: #919191;
}
#buttonSignIn {
  padding: 12px 115px 12px 115px;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  background: #65AEE3;
  color: aliceblue;
  font-size: 18px;
  transition: 0.5s;
}
.buttonLink {
  color: #6C9FC4;
  font-size: 17px;
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