<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family:  Helvetica Neue;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  height: 100%;
}

html {
  height: 100%;
  width: 100%;
  background: #1E2124;
  margin: 0;
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

input {
  color: white;
}

@font-face {
 font-family: "Helvetica";
 src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
        url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
}

@media screen and (max-height: 815px) {
  #app {
    height: 815px;
  }
}

</style>
