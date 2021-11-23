<template>
  <div class="signin">
    <div>
      <img alt="Logo" src="../assets/logo.png" />
      <SignInForm msg="Sign in"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignInForm from "@/components/SignInForm.vue";

export default {
  name: "SignIn",
  components: {
    SignInForm,
  },
};
</script>

<style lang="scss">
.signin {
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

</style>
