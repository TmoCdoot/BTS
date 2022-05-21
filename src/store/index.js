import { createStore } from "vuex";
import axios from 'axios'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getDoc, collection, db, doc, onAuthStateChanged, getDocs, setDoc, deleteDoc, updateDoc } from "../plug-in/firebase.js";

export default createStore({
  state: {
    error: '',
    listCryptoForGekoApi: '',
    listCryptoForCryptoCompare: '',
    userData: {
      email: '',
      uid: '',
      depositSelect: 0,
      depositList: [],
      dataCrypto: [],
      listCryptoUserForGekoApi: [],
      listCryptoUserForCryptoCompare: [],
      walletList: [],
      walletSelected: '',
    },
    historyWalletDly: '',
    historyTimeDly: '',

    historyWalletWky: '',
    historyTimeWky: '',

    historyWalletMth: '',
    historyTimeMth: '',

    winLostValue: 0,
    eurPrice: 0,
    readyForLoadGraph: 0
  },
  mutations: {
    //definit les erreurs
    setError: function (state, error) {
      state.error = error;
    },
    //definit l'email de l'utilisateur
    setUserEmail: function (state, email) {
      state.userData.email = email;
    },
    //definit l'uid de l'utilisateur
    setUserUid: function (state, uid) {
      state.userData.uid = uid;
    },
    //definit les listes des crypto du wallet selectionner pour les requetes vers gecko et cryptocompare
    setUserDataCrypto: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        snapshotResult[name]['crypto'] = name
        state.userData.dataCrypto.push(snapshotResult[name])
        for (const index in state.listCryptoForGekoApi) {
          if (state.listCryptoForGekoApi[index] == name) {
            state.userData.listCryptoUserForGekoApi.push(state.listCryptoForGekoApi[index])
            state.userData.listCryptoUserForCryptoCompare.push(state.listCryptoForCryptoCompare[index].toLowerCase())
          }
        }
      }
    },
    //definit le depot des wallets de l'utilisateur
    setUserDepositList: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        state.userData.depositList.push(snapshotResult[name])
      }
    },
    //definit le depot du wallet selectionner
    setUserDepositSelect: function (state, snapshotResult) {
      state.userData.depositSelect = snapshotResult.deposit
    },
    //definit le prix des crypto de l'utilisateur
    setActuelPrice: function (state, returnApi) {
      for (const result in returnApi['resultRequest']) {
        for (const name in state.userData.dataCrypto) {
          if (returnApi['resultRequest'][result].id == state.userData.dataCrypto[name].crypto) {
            state.userData.dataCrypto[name].priceNow = (returnApi['resultRequest'][result].current_price).toFixed(3)
            state.userData.dataCrypto[name].name = returnApi['resultRequest'][result].name
            state.userData.dataCrypto[name].symbol = returnApi['resultRequest'][result].symbol
          }         
        }
      }
    },
    //definit le prix de l'euro par rapport au dollar
    setEurPrice: function (state, result) {
      state.eurPrice = result.resultRequest
    },
    //definit le ratio win/loss du wallet selectionner
    setWinLostValue: function (state, resultSum) {
      state.winLostValue = 0
      state.winLostValue = resultSum;
    },
    //definit la liste des crypto du site pour utilisation sur l'api gecko
    setCryptoList: function (state, snapshotResult) {
      state.listCryptoForGekoApi = snapshotResult
    },
    //definit la liste des crypto du site pour l'api cryptocompare
    setlistCryptoForCryptoCompare: function (state, snapshotResult) {
      state.listCryptoForCryptoCompare = snapshotResult
    },
    //definit tout les wallets de l'utilisateur
    setWalletUser: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        state.userData.walletList.push(name)
      }
    },
    //definit le wallet selectionner
    setSelectedWallet: function (state, value) {
      state.userData.walletSelected = value
    },
    //definit les dates et le prix du grpahique 
    setHistoWalletDly: function (state, data) {
      state.historyWalletDly = data['tabCrypto']
      state.historyTimeDly = data['tabTime']
    },
    //definit les dates et le prix du grpahique 
    setHistoWalletWky: function (state, data) {
      state.historyWalletWky = data['tabCrypto']
      state.historyTimeWky = data['tabTime']
    },
    //definit les dates et le prix du grpahique 
    setHistoWalletMth: function (state, data) {
      state.historyWalletMth = data['tabCrypto']
      state.historyTimeMth = data['tabTime']
    },
  },
  getters: {
    //recuperer l'email de l'utilisateur
    getUserEmail: state => {
      return state.userData.email
    },
    //recuperer l'uid de l'utilisateur
    getUserUid: state => {
      return state.userData.uid
    },
    //recuperer les informations des crypto du wallet selectionner
    getUserDataCrypto: state => {
      return state.userData.dataCrypto
    },
    //recuperer la liste du wallet selectionner
    getUserListCrypto: state => {
      return state.userData.listCryptoUserForGekoApi
    },
    //recuperer la liste des wallet de l'utilisateur
    getUserWalletList: state => {
      return state.userData.walletList
    },
    //recuperer le depot du wallet selectionner
    getUserDepositSelect: state => {
      return state.userData.depositSelect
    },
    //recuperer les prix pour le graphique
    getHistoWalletDly: state => {
      return state.historyWalletDly
    },
    //recuperer les dates pour le graphique
    getHistoTimeDly: state => {
      return state.historyTimeDly
    },
    //recuperer les prix pour le graphique
    getHistoWalletWky: state => {
      return state.historyWalletWky
    },
    //recuperer les dates pour le graphique
    getHistoTimeWky: state => {
      return state.historyTimeWky
    },
    //recuperer les prix pour le graphique
    getHistoWalletMth: state => {
      return state.historyWalletMth
    },
    //recuperer les dates pour le graphique
    getHistoTimeMth: state => {
      return state.historyTimeMth
    },
  },
  actions: {
    //inscription au site
    signUp: ({ commit }, userInfo) => {
      return new Promise(Validated => {
        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        var depositReg = new RegExp(/-+/);
        if (emailReg.test(userInfo["email"])) {
          if (userInfo["password"] == userInfo["confirm_pass"]) {
            if (!depositReg.test(userInfo["deposit"])) {
              createUserWithEmailAndPassword(auth, userInfo["email"], userInfo["password"]).then((userData) => {
                const userUid = userData.user.uid;
                setDoc(doc(db, `UserWallet/${userUid}/ListWallet/${userInfo["account"]}`), {
                  deposit: userInfo["deposit"],
                }).then(() => {
                  Validated(true);
                })
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
    //connexion au site
    signIn: ({ commit }, userInfo) => {
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

    
    //recuperation donner utilisateur
    loadUserData: ({ commit }) => {
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
    //recuperation des crypto de l'utilisation sur le wallet selectionner
    loadUserCrypto: ({ commit, state }, userUid) => {
      return new Promise(Validated => {
        state.userData.listCryptoUserForGekoApi = []
        state.userData.listCryptoUserForCryptoCompare = []
        state.userData.dataCrypto = []
        const tab = []
        var isEmpty = 0
        getDocs(collection(db, `UserCrypto/${userUid}/${state.userData.walletSelected}`)).then((snapshot) => {
          snapshot.forEach((doc) => tab[doc.id] = doc.data())
          snapshot.forEach(() => isEmpty = 1)
        }).then(() => {
          if (isEmpty != 0) {
            commit('setUserDataCrypto', tab)
            Validated(true)
          } else {
            Validated(false)
          }
        })
      })
    },
    //mise a jour des info de la crypto (quantité, prix d'achat)
    updateCryptoUser: ({ state }, data) => {
      return new Promise(Validated => {
        updateDoc(doc(db, `UserCrypto/${state.userData.uid}/${state.userData.walletSelected}/${data['cryptoName']}`), {
          buyPrice: data['buyprice'],
          quantity: data['quantity']
        }).then(() => {
          Validated(true)
        })
      })
    },
    //suppression d'une crypto dans le wallet selectionner
    deleteCryptoUser: ({ state }, data) => {
      return new Promise(Validated => {
        deleteDoc(doc(db, `UserCrypto/${state.userData.uid}/${state.userData.walletSelected}/${data['cryptoName']}`)).then(() => {
          Validated(true)
        })
      })
    },


    //recuperation de la liste des crypto du site
    loadCryptoList: ({ commit }) => {
      return new Promise(Validated => {
        getDoc(doc(db, 'CryptoList', 'wpcNLNN9xWlI2bi6VvP9')).then((snapshot) => {
          commit('setCryptoList', snapshot.data().Crypto)
          commit('setlistCryptoForCryptoCompare', snapshot.data().CryptoName)
        }).then(() => {
          Validated(true)
        })
      })
    },
    //recuperation du prix de euro par rapport au dollar
    loadEurPrice: ({commit}) => {
      return new Promise(Validated => {
        axios({
          method: 'GET',
          url: 'https://min-api.cryptocompare.com/data/v2/histohour?fsym=usd&tsym=eur&limit=1'
        }).then(result => {
          commit('setEurPrice', {
            resultRequest: result.data.Data.Data[0].open,
          })
          Validated(true)
        },
          error => {
            if(error) {
              Validated(false)
            }
          }
        )    
      })
    },
    //calcul winloss du wallet selectionner
    loadWinLostValue: ({ commit }, dataCrypto) => {
      return new Promise(Validated => {
        let tab = []
        let resultSum = 0
        for (const name in dataCrypto) {
          tab.push(parseInt((dataCrypto[name].quantity * dataCrypto[name].priceNow).toFixed(2)))
        }
        for (var b = 0; b < tab.length; b++) {
          resultSum = (resultSum + tab[b])
        }
        commit('setWinLostValue', resultSum)
        Validated(true)
      })
    },
    //recuperation des prix des crypto de l'utilisateur
    loadCryptoPrice: ({ commit }, userCryptoList) => {
      return new Promise(Validated => {
        var list = userCryptoList.toString()
        list = list.split(',').join('%2C')
        /* var urlcourante = document.location.host; */
        axios({
          method: 'GET',
         /*  url: 'http://' + urlcourante + '/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=3c532d3a-c0d1-415e-8d48-f15d64497835&symbol=BTC,EGLD' */
          url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + list + '&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        }).then(result => {
          //console.log(result)
          commit('setActuelPrice', {
            resultRequest: result.data,
          })
          Validated(true)
        },
          error => {
            Validated(error)
          }
        )   
      })
    },
    

    //ajout d'un crypto dans le wallet selectionner
    addOnWallet: ({ commit, state }, cryptoInfo) => {
      return new Promise(Validated => {
        if (cryptoInfo['crypto']) {
          setDoc(doc(db, `UserCrypto/${cryptoInfo['uid']}/${state.userData.walletSelected}/${cryptoInfo['crypto']}`), {
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
    //ajouter nouveaux wallet
    AddNewWallet: ({ state }, data) => {
      return new Promise(Validated => {
        if (data['walletName']) {
          setDoc(doc(db, `UserWallet/${state.userData.uid}/ListWallet/${data['walletName']}`), {
            deposit: data['deposit'],
          })
          Validated(true)
        }
      })
    },
    //récuperation crypto du wallet de l'utilisateur
    loadUserWallet: ({ state, commit }) => {
      return new Promise(Validated => {
        state.userData.walletList = []
        state.userData.depositList = []
        const tab = []
        var isEmpty = 0
        getDocs(collection(db, `UserWallet/${state.userData.uid}/ListWallet`)).then((snapshot) => {
          snapshot.forEach((doc) => tab[doc.id] = doc.data())
          snapshot.forEach(() => isEmpty = 1)
        }).then(() => {
          if (isEmpty != 0) {
            commit('setWalletUser', tab)
            commit('setUserDepositList', tab)
            Validated(true)
          } else {
            Validated(false)
          }

        })
      })
    },
    //selection le wallet voulue
    selectWallet: ({ commit }, value) => {
      return new Promise(Validated => {
        commit('setSelectedWallet', value)
        Validated(true)
      })
    },
    //suppression du wallet ainsi que les crypto contenue dedans
    deleteWalletUser: ({ state }, value) => {
      return new Promise(Validated => {
        deleteDoc(doc(db, `UserWallet/${state.userData.uid}/ListWallet/${value['walletName']}`)).then(() => {
          getDocs(collection(db, `UserCrypto/${state.userData.uid}/${value['walletName']}`)).then((snapshot) => {
            snapshot.forEach((docu) => deleteDoc(doc(db, `UserCrypto/${state.userData.uid}/${value['walletName']}/${docu.id}`)).then(() => {
              Validated(false)
            }))
          })
        }).then(() => {
          Validated(true)
        })
      })
    },


    //recuperation prix des crypto pour le graph
    loadCryptoPriceHistoryHour: ({ commit, state }) => {
      return new Promise(Validated => {
        //compteur du nombre de fois qu'il y a la boucle for
        var countDly = 1
        for (const token in state.userData.listCryptoUserForCryptoCompare) {
          //tableau liste price crypto et date
          var tabCryptoDly = []
          var tabTimeDly = []
          //requete pour recuperer les prix
          axios({
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/v2/histohour?fsym=' + state.userData.listCryptoUserForCryptoCompare[token] + '&tsym=USD&limit=23'
          }).then(result => {
            //parse resultat
            var data = result.data.Data.Data
            //si pas de donnée sur la crypto alors skip
            if (typeof data != 'undefined') {
              //faire correspondre la crypto de la requete avec crypto de l'user
              for (const cryptoUser in state.userData.dataCrypto) {
                //si correspondance
                if (state.userData.dataCrypto[cryptoUser].symbol == state.userData.listCryptoUserForCryptoCompare[token]) {
                  //alors parse les donner puis ajouter dans tableau en multipliant par le nombre de crypto de l'user
                  for (const val in data) {
                    //si tableau est vide alors remplir la première fois
                    if (tabCryptoDly[val] == null) {
                      tabCryptoDly[val] = Math.round(data[val].open * state.userData.dataCrypto[cryptoUser].quantity)
                      tabTimeDly[val] = timeConverter(data[val].time)
                    } else {
                      //si tableau contient 1 valeurs alors continuer à remplir
                      tabCryptoDly[val] = Math.round(tabCryptoDly[val] + (data[val].open * state.userData.dataCrypto[cryptoUser].quantity))
                      tabTimeDly[val] = timeConverter(data[val].time)
                    }
                  }
                }
              }
              countDly++
            } else {
              countDly++
            }
            //si la boucle for arrive à la fin alors envoyer au commit
            if (countDly == (state.userData.listCryptoUserForCryptoCompare.length + 1)) {
              commit('setHistoWalletDly', {
                tabCrypto: tabCryptoDly,
                tabTime: tabTimeDly
              })
              //renvoie true pour dire que la function est terminé
              Validated(true)
            }
          })
        }
        //permet de convertir Unix en date
        function timeConverter(UNIX_timestamp) {
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
          return time;
        }
      })
    },
    //recuperation prix des crypto pour le graph
    loadCryptoPriceHistoryWly: ({ commit, state }) => {
      return new Promise(Validated => {
        //compteur du nombre de fois qu'il y a la boucle for
        var countWky = 1
        for (const token in state.userData.listCryptoUserForCryptoCompare) {
          //tableau liste price crypto et date
          var tabCryptoWky = []
          var tabTimeWky = []
          //requete pour recuperer les prix
          axios({
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=' + state.userData.listCryptoUserForCryptoCompare[token] + '&tsym=USD&limit=6'
          }).then(result => {
            //parse resultat
            var data = result.data.Data.Data
            //si pas de donnée sur la crypto alors skip
            if (typeof data != 'undefined') {
              //faire correspondre la crypto de la requete avec crypto de l'user
              for (const cryptoUser in state.userData.dataCrypto) {
                //si correspondance
                if (state.userData.dataCrypto[cryptoUser].symbol == state.userData.listCryptoUserForCryptoCompare[token]) {
                  //alors parse les donner puis ajouter dans tableau en multipliant par le nombre de crypto de l'user
                  for (const val in data) {
                    //si tableau est vide alors remplir la première fois
                    if (tabCryptoWky[val] == null) {
                      tabCryptoWky[val] = Math.round(data[val].open * state.userData.dataCrypto[cryptoUser].quantity)
                      tabTimeWky[val] = timeConverter(data[val].time)
                    } else {
                      //si tableau contient 1 valeurs alors continuer à remplir
                      tabCryptoWky[val] = Math.round(tabCryptoWky[val] + (data[val].open * state.userData.dataCrypto[cryptoUser].quantity))
                      tabTimeWky[val] = timeConverter(data[val].time)
                    }
                  }
                }
              }
              countWky++
            } else {
              countWky++
            }
            //si la boucle for arrive à la fin alors envoyer au commit
            if (countWky == (state.userData.listCryptoUserForCryptoCompare.length + 1)) {
              commit('setHistoWalletWky', {
                tabCrypto: tabCryptoWky,
                tabTime: tabTimeWky
              })
              //renvoie true pour dire que la function est terminé
              Validated(true)
            }
          })
        }
        //permet de convertir Unix en date
        function timeConverter(UNIX_timestamp) {
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var time = date + ' ' + month + ' ' + year + ' ';
          return time;
        }
      })
    },
    //recuperation prix des crypto pour le graph
    loadCryptoPriceHistoryMth: ({ commit, state }) => {
      return new Promise(Validated => {
        //compteur du nombre de fois qu'il y a la boucle for
        var countMth = 1
        for (const token in state.userData.listCryptoUserForCryptoCompare) {
          //tableau liste price crypto et date
          var tabCryptoMth = []
          var tabTimeMth = []
          //requete pour recuperer les prix
          axios({
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=' + state.userData.listCryptoUserForCryptoCompare[token] + '&tsym=USD&limit=30'
          }).then(result => {
            //parse resultat
            var data = result.data.Data.Data
            //si pas de donnée sur la crypto alors skip
            if (typeof data != 'undefined') {
              //faire correspondre la crypto de la requete avec crypto de l'user
              for (const cryptoUser in state.userData.dataCrypto) {
                //si correspondance 
                if (state.userData.dataCrypto[cryptoUser].symbol == state.userData.listCryptoUserForCryptoCompare[token]) {
                  //alors parse les donner puis ajouter dans tableau en multipliant par le nombre de crypto de l'user
                  for (const val in data) {
                    //si tableau est vide alors remplir la première fois
                    if (tabCryptoMth[val] == null) {
                      tabCryptoMth[val] = Math.round(data[val].open * state.userData.dataCrypto[cryptoUser].quantity)
                      tabTimeMth[val] = timeConverter(data[val].time)
                    } else {
                      //si tableau contient 1 valeurs alors continuer à remplir
                      tabCryptoMth[val] = Math.round(tabCryptoMth[val] + (data[val].open * state.userData.dataCrypto[cryptoUser].quantity))
                      tabTimeMth[val] = timeConverter(data[val].time)
                    }
                  }
                }
              }
              countMth++
            } else {
              countMth++
            } 
            //si la boucle for arrive à la fin alors envoyer au commit
            if (countMth == (state.userData.listCryptoUserForCryptoCompare.length + 1)) {
              commit('setHistoWalletMth', {
                tabCrypto: tabCryptoMth,
                tabTime: tabTimeMth
              })
              //renvoie true pour dire que la function est terminé
              Validated(true)
            }
          })
        }
        //permet de convertir Unix en date
        function timeConverter(UNIX_timestamp) {
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var time = date + ' ' + month + ' ' + year;
          return time;
        }
      })
    },


    //recuperation depot du wallet selectionner
    loadUserDeposit: ({ commit, state }) => {
      return new Promise(Validated => {
        state.userData.deposit = 0
        getDoc(doc(db, `UserWallet/${state.userData.uid}/ListWallet/${state.userData.walletSelected}`,)).then((snapshot) => {
          if (typeof snapshot.data() == 'undefined') {
            Validated(false)
          } else {
            commit('setUserDepositSelect', snapshot.data())
            Validated(true)
          }
        })
      })
    },
    //mise a jour depot du wallet
    updateDeposit: ({ state }, data) => {
      return new Promise(Validated => {
        updateDoc(doc(db, `UserWallet/${state.userData.uid}/ListWallet/${state.userData.walletSelected}`), {
          deposit: data['deposit']
        }).then(() => {
          Validated(true)
        })
      })
    },



    //test api bourse
    test: () => {
      const finnhub = require('finnhub');

      finnhub.ApiClient.instance.basePath = "http://localhost:8080"

      console.log(finnhub.ApiClient.instance.basePath)

      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = "sandbox_c9rpevqad3i8g2romtgg"
      const finnhubClient = new finnhub.DefaultApi()
    
      finnhubClient.quote("NFLX", (error, data) => {
        console.log(data.c)
      });
    }
  },
  modules: {},
});