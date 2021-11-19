import { createStore } from "vuex";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, db, doc, onAuthStateChanged, } from "../plug-in/firebase.js";
import createPersistedState from "vuex-persistedstate";

onAuthStateChanged(auth, user => { console.log(user); });

export default createStore({
  plugins: [createPersistedState()],
  state: {
    error: '',
    user: null,
  },
  getters:{
    getUser: state => {
        return state.user;
    }
  },
  mutations: {
    setError: function (state, error) {
      state.error = error;
    },
    setUser: function (state, user) {
      state.email = user;
    }
  },
  actions: {
    createAccount: ({commit}, userInfo) => {
      function creatUser() {
        return new Promise(resolve => {
          var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
          var depositReg = new RegExp(/-+/);
          if (emailReg.test(userInfo["email"])) {
            if (userInfo["password"] == userInfo["confirm_pass"]) {
              if (!depositReg.test(userInfo["deposit"])) {
                createUserWithEmailAndPassword(auth, userInfo["email"], userInfo["password"]).then((userCredential) => {
                  const user = userCredential.user.uid;
                  console.log(userCredential.user);
                  resolve(user);
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
      }
      
      async function creatDoc() {
        const userUiud = await creatUser()
        setDoc(doc(db, "User", userUiud), {
          deposit: userInfo["deposit"],
        });
        console.log(userInfo);
      }
      creatDoc()     
    },

    signIn: ({commit}, userInfo) => {
      return new Promise(errorCode => {
        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        if (emailReg.test(userInfo["email"])) {
          signInWithEmailAndPassword(auth, userInfo['email'], userInfo['password']).then((userCredential) => {
            const user = userCredential.user;
            //console.log(user);
            commit('setUser', user);
            errorCode(user)
          })
          .catch((error) => {
            commit('setError', error)
          })
        } else {
          commit('setError', 'err_mail');
        }
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