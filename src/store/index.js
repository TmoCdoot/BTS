import { createStore } from "vuex";
import axios from 'axios' 
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getDoc, collection, db, doc, onAuthStateChanged, getDocs, setDoc, deleteDoc, updateDoc } from "../plug-in/firebase.js";

export default createStore({
  state: {
    error: '',
    valuesList: '',
    userData: {
      email: '',
      uid: '',
      deposit: [],
      dataCrypto: [],
      listCryptoUser: [],
      walletList: [],
      walletSelected: '',
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
      for (const name in snapshotResult) {
        snapshotResult[name]['crypto'] = name
        state.userData.listCryptoUser.push(name)
        state.userData.dataCrypto.push(snapshotResult[name])
      }
    },
    setUserDeposit: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        state.userData.deposit.push(snapshotResult[name])
      }
      console.log(state.userData.deposit)
    },
    setActuelPrice: function (state, returnApi ) {
      for (const result in returnApi['resultRequest']) {
        for (const name in state.userData.dataCrypto) {
          if (result == state.userData.dataCrypto[name].crypto) {
            state.userData.dataCrypto[name].priceNow = (returnApi['resultRequest'][result].quote.USD.price).toFixed(3)
          }
        }
      }
    },
    setWinLostValue: function (state, resultSum) {
      state.winLostValue = 0
      state.winLostValue = resultSum;
    },
    setCryptoList: function (state, snapshotResult) {
      state.valuesList = snapshotResult
    },
    setWalletUser: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        state.userData.walletList.push(name)
      }
      /* console.log(state.userData.walletList) */
    },
    setSelectedWallet: function (state, value) {
      state.userData.walletSelected = value
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
          setDoc(doc(db, `UserCrypto/${cryptoInfo['uid']}/List/${cryptoInfo['crypto']}`), {
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
        getDoc(doc(db, 'UserCrypto', userUid)).then((snapshot ) => {
          commit('setUserDeposit', snapshot.data())
        }).then(() => {
          Validated(true)
        })
      })
    },
    //requete crypto user
    loadUserCrypto: ({commit, state}, userUid) => {
      return new Promise(Validated => {
        state.userData.listCryptoUser = []
        state.userData.dataCrypto = []
        const tab = []
        var isEmpty = 0
        getDocs(collection(db, `UserCrypto/${userUid}/List`)).then((snapshot) => {
          snapshot.forEach((doc) => tab[doc.id] = doc.data())
          snapshot.forEach(() => isEmpty = 1)
        }).then(() => {
          console.log(tab)
          if (isEmpty != 0) {
            commit('setUserDataCrypto', tab)
            Validated(true)
          } else {
            Validated(false)
          }
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
      return new Promise(Validated => {
        let tab = []
        let resultSum = 0
        for (const name in dataCrypto) {
          tab.push(parseInt((dataCrypto[name].quantity * dataCrypto[name].priceNow).toFixed(2)))
        }      
        for (var b=0; b<tab.length; b++) {
          resultSum = (resultSum+tab[b])
        }
        commit('setWinLostValue', resultSum)
        Validated(true)
      })
    },
    //requete recuperation de la liste des creypto valide du site
    loadCryptoList: ({commit}) => {
      return new Promise(Validated => {
        getDoc(doc(db, 'CryptoList', 'wpcNLNN9xWlI2bi6VvP9')).then((snapshot ) => {
          commit('setCryptoList', snapshot.data().Crypto)
        }).then(() => {
          Validated(true)
        })
      })
    },
    //delete crypto
    deleteCryptoUser: ({state}, data) => {
      return new Promise(Validated => {
        deleteDoc(doc(db, `UserCrypto/${state.userData.uid}/List/${data['cryptoName']}`)).then(() => {
          Validated(true)
        })
      })
    },
    //update deposit
    updateDeposit: ({state}, data) => {
      return new Promise(Validated => {
        updateDoc(doc(db, `UserCrypto/${state.userData.uid}`), {
          deposit: data['deposit']
        }).then(() => {
          Validated(true)
        })
      })
    },
    //update crypto user
    updateCryptoUser: ({state}, data) => {
      return new Promise(Validated => {
        updateDoc(doc(db, `UserCrypto/${state.userData.uid}/List/${data['cryptoName']}`), {
          buyPrice: data['buyprice'],
          quantity: data['quantity']
        }).then(() => {
          Validated(true)
        })
      })
    },
    //add new wallet
    AddNewWallet: ({state}, data) => {
      return new Promise(Validated => {
        if (data['walletName']) {
          setDoc(doc(db, `UserWallet/${state.userData.uid}/ListWallet/${data['walletName']}`), {
            deposit: data['deposit'], 
          })
          Validated(true)
        }      
      })
    },
    loadUserWallet: ({state, commit}) => {
      return new Promise(Validated => {
        state.userData.walletList = []
        state.userData.deposit = []
        const tab = []
        getDocs(collection(db, `UserWallet/${state.userData.uid}/ListWallet`)).then((snapshot) => {
          snapshot.forEach((doc) => tab[doc.id] = doc.data())
/*           snapshot.forEach(() => isEmpty = 1) */
        }).then(() => {
          commit('setWalletUser', tab)
          commit('setUserDeposit', tab)
          Validated(true)
        })
      })
    },
    selectWallet: ({commit}, value) => {
      return new Promise(Validated => {
        commit('setSelectedWallet', value)
        Validated(true)
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
