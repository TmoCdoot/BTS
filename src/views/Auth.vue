<template>
  <LogIn v-if="isUser" @SwitchTypeForm="SwitchTypeForm" />
  <SignUp v-else @SwitchTypeForm="SwitchTypeForm" />
</template>

<script>
  // @ is an alias to /src
  import SignUp from "@/components/SignUp.card.vue";
  import LogIn from "@/components/LogIn.card.vue";

  export default {
    name: "Auth",
    data: function () {
      return {
        isUser: true,
      }
    },
    components: {
      SignUp,
      LogIn
    },
    methods: {
      SwitchTypeForm: function (data) {
        if (data == true) {
          if (this.isUser == true) {
            this.isUser = false
          } else {
            this.isUser = true
          }
        }
      },
    }
  };
</script>

<style lang="scss">
  .ca-account-container {
    /*border: 1px solid green;*/
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
    background-color: var(--background-color-card);
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
    border: var(--delete-border);
    width: 240px;
    height: 40px;
    box-sizing: border-box;
    background-color: var(--background-input);
    color: var(--color-font);
  }

  .asset-input label {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-font);
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
    cursor: pointer;
  }

  text {
    color: #5DB5AA;
    font-size: 12px;
    font-weight: 700;
  }

  .ca-container-form span {
    cursor: pointer;
  }

  .unactive {
    background-color: #5d6d6b !important;
    cursor: none;
  }
</style>