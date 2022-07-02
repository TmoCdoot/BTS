<!-- <template>
  <div class="userBox" v-if="state == true">
    <div>
      <img alt="Logo" src="../assets/logov2.png" class="logo"/>
      <SignInForm msg="Sign in" @ChangeState="ChangeState"/>
    </div>
  </div>
  <div class="userBox" v-if="state == false">
    <div>
      <img alt="Logo" src="../assets/logov1.png" class="logo"/>
      <SignUpForm msg="Sign up" @ChangeState="ChangeState"/>
    </div>
  </div>
</template> -->

<template>
  <div class="ca-account-container">
    <img src="../assets/logov2.png">

    <div class="ca-container-form">
      <div class="asset-input">
        <label for="">Email</label>
        <input type="text" name="" id="">
      </div>

      <div class="asset-input">
        <label for="">Password</label>
        <input type="text" name="" id="">
      </div>

      <button class="asset-button">Add asset</button>
      <span>New to CryptoAnalyze, <colorButton>Create account</colorButton></span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/*import SignInForm from "@/components/SignInForm.widget.vue";
import SignUpForm from "@/components/SignUpForm.widget.vue";*/

export default {
  name: "Auth",
  data: function () {
    return {
      state: true,
    }
  },
  components: {
    /*SignInForm,
    SignUpForm*/
  },
  methods: {
    ChangeState: function ( data ) {
      if (data == true) {
        if (this.state == true) {
          this.state = false
        } else {
          this.state = true
        }
      }
    }, 
  }
};
</script>

<!-- <style lang="scss">
.userBox {
  /*border: 1px solid green;*/
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-around;
}

img {
  width: 200px;
}

.logo {
  margin-left: 40px;
}

</style> -->

<style lang="scss">
  .ca-account-container {
    border: 1px solid green;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ca-account-container img {
    width: 200px;
    margin-left: 25px;
  }

  .ca-container-form {
    width: 332px;
    height: 322px;
    background-color: #f7f7f7;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
  }
  .ca-container-form span {
    font-size: 12px;
    font-weight: 500;
    color: #686868;
    margin-top: 17px;
  }

  .asset-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 29px;
}
.asset-input input {
    border-radius: 10px;
    margin-top: 2px;
    border: 1px solid #DADADA;
    width: 240px;
    height: 40px;
    box-sizing: border-box;
}
.asset-input label {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
}
.asset-button {
  width: 240px;
  height: 40px;
  background-color: #5DB5AA;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
}
colorButton {
 color: #5DB5AA;
 font-size: 12px;
 font-weight: 700;
}
</style>