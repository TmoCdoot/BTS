<template>
    <div class="containerWidget">
        <div class="boxWidget">
            <div class="left">
               {{ signe }} {{ ammout }} $
            </div>
            <div class="right">
                {{ title }}
            </div>
        </div>
    </div>
</template>

<script>
import { auth, onAuthStateChanged, } from "../plug-in/firebase.js";

export default {
  name: "Widget",
  props: {
    title: String,
    ammout: String,
    signe: String,
    color1: String,
  },
  created() {
    onAuthStateChanged(auth, user => { 
        console.log(user);
    });
  },
}
</script>

<style scoped lang="scss">
.containerWidget {
    /*border: 1px solid red;*/
    color: aliceblue;
    margin: 10px;
}
.boxWidget {
    /*border: 1px solid yellow;*/
    width: 200px;
    height: 80px;
    background-color: #272525;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.right {
    /*border: 1px solid pink;*/
    height: 50%;
    text-align: start;
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    justify-content: space-around;
    font-weight: bold;
}

.left {
    height: 50%;
    text-align: end;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-style: italic;
}
</style>