import { arrayUnion } from "@firebase/firestore";
import { createStore } from "vuex";
import axios from 'axios' 
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateDoc, db, doc, onAuthStateChanged, getDoc } from "../plug-in/firebase.js";
//import createPersistedState from "vuex-persistedstate";

export default createStore({
  //plugins: [createPersistedState()],
  state: {
    error: '',
    valuesList: ['BTC', 'EGLD', 'ADA', 'ETH', 'BNB'],
    userData: {
      email: '',
      uid: '',
      deposit: '',
      dataCrypto: null,
      listCryptoUser: [],
    },
    actualPrice: [ ],
  },
  mutations: {
    setError: function (state, error) {
      state.error = error;
    },
    setUserDataEmail: function (state, email) {
      state.userData.email = email;
    },
    setUserDataUid: function (state, uid) {
      state.userData.uid = uid;
    },
    setUserDataCrypto: function (state, dataCrypto) {
      state.userData.dataCrypto = dataCrypto.cryptoList;
      for (var i=0; i<Object.keys(dataCrypto.cryptoList).length; i++) {
        state.userData.listCryptoUser[i] = dataCrypto.cryptoList[i].crypto
      }
    },
    setUserDataDeposit: function (state, dataCrypto) {
      state.userData.deposit = dataCrypto.deposit;
    },

    setActuelPrice: function (state, returnApi ) {
      for (var i=0; i<Object.keys(returnApi['param']).length; i++) {
        state.userData.dataCrypto[i].priceNow = (returnApi['test'][returnApi['param'][i]].quote.USD.price).toFixed(2)
        /* console.log(state.userData.dataCrypto[i].priceNow) */
      }
      
    },

  },
  getters: {
    getUserDataEmail: state => {
      return state.userData.email
    },
    getUserDataUid: state => {
      return state.userData.uid
    },
    getUserDataCrypto: state => {
      return state.userData.dataCrypto
    },
  },
  actions: {
    createAuth: ({commit}, userInfo) => {
      return new Promise(userUidReturn => {
        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        var depositReg = new RegExp(/-+/);
        if (emailReg.test(userInfo["email"])) {
          if (userInfo["password"] == userInfo["confirm_pass"]) {
            if (!depositReg.test(userInfo["deposit"])) {
              createUserWithEmailAndPassword(auth, userInfo["email"], userInfo["password"]).then((userCredential) => {
                const userUid = userCredential.user.uid;
                //console.log(userCredential.user);
                userUidReturn(userUid);
              }).catch((error) => {
                commit('setError', error.code)
                console.log(error.code)
              })
            } else {
              commit('setError', 'err_depo');
            }
          } else {
            commit('setError', 'err_pass');
          }
        } else {
          commit('setError', 'err_mail');
        }
      })
    },
    signIn: ({commit}, userInfo) => {
      return new Promise(validated => {
        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        if (emailReg.test(userInfo["email"])) {
          signInWithEmailAndPassword(auth, userInfo['email'], userInfo['password']).then(() => {
            //console.log(userInfo['email']);
            validated(true)
          })
          .catch((/*error*/) => {
            //console.log(error)
            commit('setError', 'err_mail')
          })
        } else {
          commit('setError', 'err_mail');
        }
      })
    },
    addOnWallet: ({commit}, cryptoInfo) => {
      return new Promise(validated => {
        if (cryptoInfo['crypto']) {
          updateDoc(doc(db, "User", cryptoInfo['uid']), {
              cryptoList: arrayUnion({
                crypto: cryptoInfo['crypto'],
                buyPrice: cryptoInfo['buyprice'],
                quantity: cryptoInfo['quantity']
              })
          }).catch((/*error*/) => {
            //console.log(error)
            commit('setError', 'err_addCrypto')
          })
          validated(true)
        }      
      })
    },


    

    loadDataUser: ({commit}) => {
      return new Promise(Validated => {
        onAuthStateChanged(auth, user => { 
          //console.log(user)
          if (user) {
            commit('setUserDataEmail', user.email)
            commit('setUserDataUid', user.uid)
          }
          Validated()
        });
      })
    },
    loadDataCrypto: ({commit}, data) => {
/*       console.log(data) */
      return new Promise(Validated => {
        getDoc(doc(db, 'User', data)).then((snapshot ) => {
          /* console.log(snapshot.data()) */
          commit('setUserDataCrypto', snapshot.data())
          commit('setUserDataDeposit', snapshot.data())
        }).then(() => {
          Validated(true)
        })
      })
    },

    loadCryptoPrice: ({commit}, params) => {
      return new Promise(validated => {
        let list = params.toString()
        axios({
          method: 'GET',
          url: 'http://localhost:8080/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=3c532d3a-c0d1-415e-8d48-f15d64497835&symbol=' + list
        }).then(result => {
          commit('setActuelPrice', { 
            test: result.data.data,
            param: params, 
          })
          validated(true)
          },
          error => {
            validated(error)
          }
        )
      })
    }
  },
  modules: {},
});


/*
    //test ascyncro
    test: ({commit}) => {
      commit;
      var resolveAfter2Seconds = function() {
        console.log("Initialisation de la promesse lente");
        return new Promise(resolve => {
          setTimeout(function() {
            resolve("lente");
            console.log("La promesse lente est terminée");
          }, 2000);
        });
      };
      var resolveAfter1Second = function() {
        console.log("Initialisation de la promesse rapide");
        return new Promise(resolve => {
          setTimeout(function() {
            resolve("rapide");
            console.log("La promesse rapide est terminée");
          }, 1000);
        });
      };
      var concurrentPromise = function() {
        console.log('==Début concurrentiel avec Promise.all==');
        return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
          console.log(messages[0]); // lente
          console.log(messages[1]); // rapide
        });
      }
      concurrentPromise()
    }
*/

/* crypto : {
  btc: {
    buyprice: 54 000,
    quantity: 2,
  },
  egld: {
    buyprice: 54 000,
    quantity: 2,
  },
} */



/* function bite (namecrypto) {
  let namecrypto = namecrypto['crypto']
  let toAdd : {
    buyprice: namecrypto['buyprice'],
    quantity: namecrypto['quantity'],
  }
} */
