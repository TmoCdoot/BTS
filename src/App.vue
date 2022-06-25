<template>
  <router-view/>
</template>

<style lang="scss">
  @font-face {
    font-family: Epilogue;
    src: url(assets/fonts/epilogue.regular.ttf);
  }

  #app {
    /*background-color: red;*/
    font-family: Epilogue;
    display: flex;
    height: 100vh;
    width: 100vw;
  }
  html, body {
    height: 100vh;
    width: 100vw;
    margin: 0;
  }
</style>
