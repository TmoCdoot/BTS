# CryptoAnalyze
Crypto Analize web site to manage your assets. You have posibility create a many wallets and add differents cryptomonnaies in your wallets

Pour utiliser l'application, vous devez avoir NodeJs d'installer sur votre pc
Une fois NodeJs installer, ouvrer un terminal et aller dans le dossier ou est situé le code de l'application
puis executer les commandes suivantes :

Install all modules
```
npm install
```

Run serveur
```
npm run serve
```

## Add component in a view

Firstly, create new file in components folder and link this file on view

```js

<script>
  import Deposit from "@/components/Deposit.widget.vue";
  ...
  
  export default {
    name: ViewName,
    components: {
      Deposit
    }
  }
</script>

```

After include component in html code with component name defind on export default

```html

<Deposit/>

```

## Global variable

### Defind variable

To defind global variable, add variable in state on store

```js

export default createStore({
  state: {
    error: "",
    variable: 1,
    variable: [array]
  }

```

### Edit global variable data 

To edit global variable data, add your setter in mutations on store

```js

export default createStore({
  state: {},
  mutations: {
    setError: function (state, error) {
      state.error = error
    }
  }

```

## Get global variable

To get global variable, add your getter in getters on store

```js

export default createStore({
  state: {},
  mutations: {},
  getters: {
    getError: state => {
      return state.error
    }
  }
  
```

Get variable in your view 

```js

this.$store.getters.getError

```

### Add function in actions

To add function in your projet, add this on actions in store

```js

export default createStore({
  state: {},
  mutations: {},
  getters: {},
  actions: {
    signUp: ({commit, YourData) => {
      //Your functions
      
      //To add data in global variable
      commit('setError', YourData)
    })
  }
  
```

Get function in view

```js

this.$store.dispatch('signUp', YourData)

```

### Add external plugin

To add other plugin, creat new folder and new file in this folder, after import plugin on store

```js

import { createStore } from "vuex";
import axios from 'axios' 
import { auth, ... } from "../plug-in/firebase.js";

```
