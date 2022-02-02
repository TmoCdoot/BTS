<template>
  <div class="signup">
    <div>
      <img alt="Logo" src="../assets/logov1.png" />
      <SignUpForm msg="Sign up"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "SignUp",
  components: {
    SignUpForm,
  },
};
</script>

<style lang="scss">
.signup {
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
