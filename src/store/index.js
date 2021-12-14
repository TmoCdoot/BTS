import { arrayUnion } from "@firebase/firestore";
import { createStore } from "vuex";
import axios from 'axios' 
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateDoc, db, doc, onAuthStateChanged, getDoc } from "../plug-in/firebase.js";

export default createStore({
  state: {
    error: '',
    valuesList: ['BTC', 'EGLD', 'ADA', 'ETH', 'BNB', 'FTM', 'LUNA', 'SOL', 'VET', 'DENT', 'AXS', 'DUCK', 'SOLR', 'BCOIN', 'USDC', 'USDT', 'CSPR'], /* A CHANGER METTRE LES TOKEN SUR LA BASE DE DONNER CAR RISQUE DE CHANGEMENT OU HACK */
    userData: {
      email: '',
      uid: '',
      deposit: 0,
      dataCrypto: null,
      listCryptoUser: [],
    },
    actualPrice: [ ],
    winLostValue: 0,
  },
  mutations: {
    setError: function (state, error) {
      state.error = error;
    },
    setUserEmail: function (state, email) {
      state.userData.email = email;
    },
    setUserUid: function (state, uid) {
      state.userData.uid = uid;
    },
    setUserDataCrypto: function (state, snapshotResult) {
      state.userData.dataCrypto = snapshotResult.cryptoList;
      for (var i=0; i<Object.keys(snapshotResult.cryptoList).length; i++) {
        state.userData.listCryptoUser[i] = snapshotResult.cryptoList[i].crypto
      }
    },
    setUserDeposit: function (state, snapshotResult) {
      state.userData.deposit = parseInt(snapshotResult.deposit);
    },
    setActuelPrice: function (state, returnApi ) {
      for (var i=0; i<Object.keys(returnApi['userCryptoList']).length; i++) {
        state.userData.dataCrypto[i].priceNow = (returnApi['resultRequest'][returnApi['userCryptoList'][i]].quote.USD.price).toFixed(3)
      }
    },
    setWinLostValue: function (state, resultSum) {
      state.winLostValue = resultSum;
    }
  },
  getters: {
    getUserEmail: state => {
      return state.userData.email
    },
    getUserUid: state => {
      return state.userData.uid
    },
    getUserDataCrypto: state => {
      return state.userData.dataCrypto
    },
    getUserListCrypto: state =>{
      return state.userData.listCryptoUser
    }
  },
  actions: {
    signUp: ({commit}, userInfo) => {
      return new Promise(Validated => {
        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        var depositReg = new RegExp(/-+/);
        if (emailReg.test(userInfo["email"])) {
          if (userInfo["password"] == userInfo["confirm_pass"]) {
            if (!depositReg.test(userInfo["deposit"])) {
              createUserWithEmailAndPassword(auth, userInfo["email"], userInfo["password"]).then((userData) => {
                const userUid = userData.user.uid;
                Validated(userUid);
              }).catch((error) => {
                commit('setError', error.code)
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
      return new Promise(Validated => {
        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        if (emailReg.test(userInfo["email"])) {
          signInWithEmailAndPassword(auth, userInfo['email'], userInfo['password']).then(() => {
            Validated(true)
          }).catch(() => {
            commit('setError', 'err_mail')
          })
        } else {
          commit('setError', 'err_mail');
        }
      })
    },
    addOnWallet: ({commit}, cryptoInfo) => {
      return new Promise(Validated => {
        if (cryptoInfo['crypto']) {
          updateDoc(doc(db, "User", cryptoInfo['uid']), {
              cryptoList: arrayUnion({
                crypto: cryptoInfo['crypto'],
                buyPrice: cryptoInfo['buyprice'],
                quantity: cryptoInfo['quantity']
              })
          }).catch(() => {
            commit('setError', 'err_addCrypto')
          })
          Validated(true)
        }      
      })
    },
    loadUserData: ({commit}) => {
      return new Promise(Validated => {
        onAuthStateChanged(auth, user => { 
          if (user) {
            commit('setUserEmail', user.email)
            commit('setUserUid', user.uid)
          }
          Validated()
        });
      })
    },
    loadDataCrypto: ({commit}, userUid) => {
      return new Promise(Validated => {
        getDoc(doc(db, 'User', userUid)).then((snapshot ) => {
          commit('setUserDataCrypto', snapshot.data())
          commit('setUserDeposit', snapshot.data())
        }).then(() => {
          Validated(true)
        })
      })
    },
    loadCryptoPrice: ({commit}, userCryptoList) => {
      return new Promise(Validated => {
        let list = userCryptoList.toString()
        axios({
          method: 'GET',
          url: 'http://localhost:8080/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=3c532d3a-c0d1-415e-8d48-f15d64497835&symbol=' + list
        }).then(result => {
          commit('setActuelPrice', { 
            resultRequest: result.data.data,
            userCryptoList: userCryptoList, 
          })
          Validated(true)
          },
          error => {
            Validated(error)
          }
        )
      })
    },
    loadWinLostValue: ({commit}, dataCrypto) => {
      let tab = []
      let resultSum = 0
      for (var i=0; i<Object.keys(dataCrypto).length; i++) {
        tab[i] = parseInt((dataCrypto[i].quantity*dataCrypto[i].priceNow).toFixed(2))
      }
      for (var b=0; b<tab.length; b++) {
        resultSum = (resultSum+tab[b])
      }
      commit('setWinLostValue', resultSum)
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
