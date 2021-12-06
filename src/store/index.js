import { arrayUnion } from "@firebase/firestore";
import { createStore } from "vuex";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateDoc, db, doc, onAuthStateChanged, getDoc } from "../plug-in/firebase.js";
//import createPersistedState from "vuex-persistedstate";

export default createStore({
  //plugins: [createPersistedState()],
  state: {
    error: '',
    valuesList: ['BTC', 'EGLD', 'ADA', 'ETH'],
    userData: {
      email: '',
      uid: '',
      dataCrypto: null,
    },
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
      state.userData.dataCrypto = dataCrypto;
      console.log(state.userData.dataCrypto)
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
          updateDoc(doc(db, "User", "Ex14xbkDTvUH1YzHPeSje59cB0z1"), {
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
    loadDataCrypto: ({commit}) => {
      return new Promise(Validated => {
        const dataDoc = getDoc(doc(db, 'User', this.userData.uid))
        commit('setUserDataCrypto', dataDoc)
        Validated()
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
