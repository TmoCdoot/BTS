/* import { arrayUnion } from "@firebase/firestore"; */
import { createStore } from "vuex";
import axios from 'axios' 
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getDoc, collection, db, doc, onAuthStateChanged, getDocs, setDoc } from "../plug-in/firebase.js";

export default createStore({
  state: {
    error: '',
    valuesList: '',
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
      

      /* for (var i=0; i<Object.keys(snapshotResult).length; i++) {
        console.log(snapshotResult);
      } */
      state.userData.dataCrypto = snapshotResult
      for (const name in snapshotResult) {
        /* console.log(`${name}`); */
        state.userData.listCryptoUser.push(name)
        /* for (const data in snapshotResult[name]) {
          console.log(`${data}: ${snapshotResult[name][data]}`);
        } */
      }
      console.log(state.userData.dataCrypto) 

      /* state.userData.dataCrypto = snapshotResult.cryptoList;
      for (var i=0; i<Object.keys(snapshotResult.cryptoList).length; i++) {
        state.userData.listCryptoUser[i] = snapshotResult.cryptoList[i].crypto
      } */
    },
    setUserDeposit: function (state, snapshotResult) {
      state.userData.deposit = parseInt(snapshotResult.deposit);
    },
    setActuelPrice: function (state, returnApi ) {
      /* console.log(returnApi) */
      /* for (var i=0; i<Object.keys(returnApi['userCryptoList']).length; i++) {
        state.userData.dataCrypto[i].priceNow = (returnApi['resultRequest'][returnApi['userCryptoList'][i]].quote.USD.price).toFixed(3)
      } */

      for (const result in returnApi['resultRequest']) {
        for (const name in state.userData.dataCrypto) {
          if (result == name) {
            /* console.log('resquette : ' + result + ' && liste : ' + name)
            console.log((returnApi['resultRequest'][result].quote.USD.price).toFixed(3)) */
            state.userData.dataCrypto[result].priceNow = (returnApi['resultRequest'][result].quote.USD.price).toFixed(3)
          }
          /* console.log(`${result}`);
          console.log(`${name}`); */
        }
      }
      /* console.log(state.userData.dataCrypto) */
    },
    setWinLostValue: function (state, resultSum) {
      state.winLostValue = resultSum;
    },
    setCryptoList: function (state, snapshotResult) {
      state.valuesList = snapshotResult
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
          setDoc(doc(db, 'UserCrypto', cryptoInfo['uid'], 'List', cryptoInfo['crypto']), {
            buyPrice: cryptoInfo['buyprice'], 
            quantity: cryptoInfo['quantity']
          }).catch(() => {
            commit('setError', 'err_addCrypto')
          })
          commit('setError', 'err_addCrypto')
          Validated(true)
        }      
      })
    },
    //requete donne user
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
    //requete deposit user
    loadUserDeposit: ({commit}, userUid) => {
      return new Promise(Validated => {
        getDoc(doc(db, 'UserDeposit', userUid)).then((snapshot ) => {
          /* commit('setUserDataCrypto', snapshot.data()) */
          commit('setUserDeposit', snapshot.data())
        }).then(() => {
          Validated(true)
        })
      })
    },
    //requete crypto user
    loadUserCrypto: ({commit}, userUid) => {
      return new Promise(Validated => {
        const tab = []
        getDocs(collection(db, `UserCrypto/${userUid}/List`)).then((snapshot) => {
          snapshot.forEach((doc) => tab[doc.id] = doc.data())
          
        }).then(() => {
          console.log(tab)
          commit('setUserDataCrypto', tab)
          Validated(true)
        })
      })
    },
    //requete recuperation price crypto
    loadCryptoPrice: ({commit}, userCryptoList) => {
      return new Promise(Validated => {
        let list = userCryptoList.toString()
        var urlcourante = document.location.host; 
        axios({
          method: 'GET',
          url: 'http://' + urlcourante + '/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=3c532d3a-c0d1-415e-8d48-f15d64497835&symbol=' + list
        }).then(result => {
          commit('setActuelPrice', { 
            resultRequest: result.data.data,
          })
          Validated(true)
          },
          error => {
            Validated(error)
          }
        )
      })
    },
    //calcul winloss valeur
    loadWinLostValue: ({commit}, dataCrypto) => {
      let tab = []
      let resultSum = 0
      
      
      for (const name in dataCrypto) {
        tab.push(parseInt((dataCrypto[name].quantity * dataCrypto[name].priceNow).toFixed(2)))

      }
      
      /* for (var i=0; i<Object.keys(dataCrypto).length; i++) {
        tab[i] = parseInt((dataCrypto[i].quantity*dataCrypto[i].priceNow).toFixed(2))
      } */

      

      for (var b=0; b<tab.length; b++) {
        resultSum = (resultSum+tab[b])
      }
      /* console.log(tab)
      console.log(resultSum) */
      commit('setWinLostValue', resultSum)
    },
    //requete recuperation de la liste des creypto valide du site
    loadCryptoList: ({commit}) => {
      return new Promise(Validated => {
        getDoc(doc(db, 'CryptoList', 'wpcNLNN9xWlI2bi6VvP9')).then((snapshot ) => {
          /* console.log(snapshot.data().Crypto) */
          commit('setCryptoList', snapshot.data().Crypto)
        }).then(() => {
          Validated(true)
        })
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
