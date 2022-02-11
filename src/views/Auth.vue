<template>
  <div class="userBox" v-if="state == true">
    <div>
      <img alt="Logo" src="../assets/logov1.png" class="logo"/>
      <SignInForm msg="Sign in" @ChangeState="ChangeState"/>
    </div>
  </div>
  <div class="userBox" v-if="state == false">
    <div>
      <img alt="Logo" src="../assets/logov1.png" class="logo"/>
      <SignUpForm msg="Sign up" @ChangeState="ChangeState"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignInForm from "@/components/SignInForm.widget.vue";
import SignUpForm from "@/components/SignUpForm.widget.vue";

export default {
  name: "Auth",
  data: function () {
    return {
      state: true,
    }
  },
  components: {
    SignInForm,
    SignUpForm
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

<style lang="scss">
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

</style>
