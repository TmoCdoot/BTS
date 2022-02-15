<template>
  <router-view/>
</template>

<style lang="scss">
  #app {
    font-family:  Helvetica;
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
    zoom: 100%;
  }
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  input {
    color: white;
  }
  .img {
    width: 40px;
    height: 40px;
  }
  .titleData {
    font-weight: normal;
    font-style: italic;
    color: #919191;
  }
  .column {
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
  }
  .titleAlign {
    flex-direction: column;
    justify-content: space-evenly;
  }
  .styleBold {
    font-weight: bold;
  }
  .addButton {
    padding: 8px 30px 8px 30px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    background: #6C9FC4;
    color: aliceblue;
    font-size: 18px;
    cursor: pointer;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input {
    padding: 12px 0px 12px 10px;
    border: none;
    border-radius: 15px;
    font-weight: bold;
    background-color: #1E2124;
    width: 250px;
  }
  .unactive {
    background-image: linear-gradient(95deg, #444444, #1c1c1c) !important;
    color: #707070 !important;
    transition: 0.5s;
    cursor: initial !important;
  }
  h2 {
    font-size: 25px;
  }
  .titleStatisticContener {
    height: 30%;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-top: 2px;
  }
  .DataConterner {
    height: 70%;
    display: flex;
    flex-direction: row;
  }
  .topBox {
    font-weight: bold;
    font-size: 20px;
    padding-left: 10px;
  }
  .bottomBox {
    font-style: italic;
    font-size: 13px;
    color: #5c5c5c;
    padding-left: 10px;
  }
  .title {
        padding-left: 20px;
  }
  button {
    cursor: pointer;
    text-decoration: none;  
    border: none;
    background: none;
    color: whitesmoke;
    padding: 0px;
  }

  @media screen and (max-height: 815px) and (min-width: 1361px) {
    #app {
      height: 815px;
    }
  }
</style>
