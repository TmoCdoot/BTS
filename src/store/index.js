import { createStore } from "vuex";
import axios from 'axios'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getDoc, collection, db, doc, onAuthStateChanged, getDocs, setDoc, deleteDoc, updateDoc } from "../plug-in/firebase.js";

export default createStore({
  state: {
    userData: {
      userEmail: '',
      userUid: '',
      userDepositSelected: 0,
      userWalletSelected: '',
      userAssetSelected: [],
      userDepositList: [],
      userWalletList: [],
      userDataCrypto: [],
      userAssetCounter: 0,
      userEtfCounter: 0,
      userCryptoCounter: 0,
      userForexCounter: 0,
      userActionCounter :0,
      userWinLostValue: 0,
      userMaxBalanceValue: 0,
      userMinBalanceValue: 0,
      userMeanBalanceValue: 0,
      userCryptoIndexListGekoApi: [],
      userCryptoIndexListCryptoCompareApi: [],
    },

    listCryptoForGekoApi: '',
    listCryptoForCryptoCompare: '',
    ListCryptoFullName: '',

    historyWalletDly: '',
    historyTimeDly: '',

    historyWalletWky: '',
    historyTimeWky: '',

    historyWalletMth: '',
    historyTimeMth: '',

    userTheme: 'light',
    
    eurPrice: 0,
    readyForLoadGraph: 0,

  },

  mutations: {
    //definit les erreurs
    setError: function (state, error) {
      state.error = error;
    },
    //definit l'email de l'utilisateur
    setUserEmail: function (state, email) {
      state.userData.userEmail = email;
    },
    //definit l'uid de l'utilisateur
    setUserUid: function (state, uid) {
      state.userData.userUid = uid;
    },
    //definit les listes des crypto du wallet selectionner pour les requetes vers gecko et cryptocompare
    setUserDataCrypto: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        snapshotResult[name]['crypto'] = name
        state.userData.userDataCrypto.push(snapshotResult[name])
        for (const index in state.listCryptoForGekoApi) {
          if (state.listCryptoForGekoApi[index] == name) {
            state.userData.userCryptoIndexListGekoApi.push(state.listCryptoForGekoApi[index])
            state.userData.userCryptoIndexListCryptoCompareApi.push(state.listCryptoForCryptoCompare[index].toLowerCase())
          }
        }
      }
      state.userData.userAssetCounter = state.userData.userDataCrypto.length
      state.userData.userCryptoCounter = state.userData.userDataCrypto.length
    },
    //definit le depot des wallets de l'utilisateur
    setUserDepositList: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        state.userData.userDepositList.push(snapshotResult[name])
      }
    },
    //definit le depot du wallet selectionner
    setUserDepositSelect: function (state, snapshotResult) {
      state.userData.userDepositSelected = snapshotResult.deposit
    },
    //definit le prix des crypto de l'utilisateur
    setActuelPrice: function (state, returnApi) {
      for (const result in returnApi['resultRequest']) {
        for (const name in state.userData.userDataCrypto) {
          if (returnApi['resultRequest'][result].id == state.userData.userDataCrypto[name].crypto) {
            state.userData.userDataCrypto[name].priceNow = (returnApi['resultRequest'][result].current_price).toFixed(3)
            state.userData.userDataCrypto[name].name = returnApi['resultRequest'][result].name
            state.userData.userDataCrypto[name].symbol = returnApi['resultRequest'][result].symbol
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
      state.userData.userWinLostValue = 0
      state.userData.userWinLostValue = resultSum;
    },
    //definit la liste des crypto du site pour utilisation sur l'api gecko
    setCryptoList: function (state, snapshotResult) {
      state.listCryptoForGekoApi = snapshotResult
    },
    //definit la liste des crypto du site pour l'api cryptocompare
    setlistCryptoForCryptoCompare: function (state, snapshotResult) {
      state.listCryptoForCryptoCompare = snapshotResult
    },
    setListCryptoFullName: function (state, snapshotResult) {
      state.ListCryptoFullName = snapshotResult
    },
    //definit tout les wallets de l'utilisateur
    setWalletUser: function (state, snapshotResult) {
      for (const name in snapshotResult) {
        state.userData.userWalletList.push(name)
      }
    },
    //definit le wallet selectionner
    setSelectedWallet: function (state, value) {
      state.userData.userWalletSelected = value
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
    //definit l'asset selectionner
    setUserAssetSelected: function (state, data) {
      state.userData.userAssetSelected.symbol = data["symbol"]
      state.userData.userAssetSelected.price = data["price"]
      state.userData.userAssetSelected.nameForEdit = data["nameForEdit"]
      state.userData.userAssetSelected.buyPrice = data["buyPrice"]
      state.userData.userAssetSelected.quantity = data["quantity"]
    },
    //definit moyen price
    setMeanPriceWallet: function (state, data) {
      state.userData.userMeanBalanceValue = 0 
      state.userData.userMeanBalanceValue = data
    },
    //definit min price wallet
    setMinPriceWallet: function (state, data) {
      state.userData.userMinBalanceValue = 0
      state.userData.userMinBalanceValue = data
    },
    //definit max price wallet
    setMaxPriceWallet: function (state, data) {
      state.userData.userMaxBalanceValue = 0
      state.userData.userMaxBalanceValue = data
    }
  },

  getters: {
    //recuperer l'email de l'utilisateur
    getUserEmail: state => {
      return state.userData.userEmail
    },
    //recuperer l'uid de l'utilisateur
    getUserUid: state => {
      return state.userData.userUid
    },
    //recuperer les informations des crypto du wallet selectionner
    getUserDataCrypto: state => {
      return state.userData.userDataCrypto
    },
    //recuperer la liste du wallet selectionner
    getUserListCrypto: state => {
      return state.userData.userCryptoIndexListGekoApi
    },
    //recuperer la liste des wallet de l'utilisateur
    getUserWalletList: state => {
      return state.userData.userWalletList
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
    //recuperer les dates pour le graphique
    getAssetSelected: state => {
      return state.userData.userAssetSelected
    },
    getUserData: state => {
      return state.userData
    }
  },

  actions: {
    //inscription au site
    UserSignUp: ({ commit }, userInfo) => {
      return new Promise(Validated => {

        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        var depositReg = new RegExp(/-+/);

        if (emailReg.test(userInfo["userEmail"])) {
          if (userInfo["userPassword"] == userInfo["userConfirm_pass"]) {
            if (!depositReg.test(userInfo["userDeposit"])) {

              createUserWithEmailAndPassword(auth, userInfo["userEmail"], userInfo["userPassword"]).then((userData) => {
                const userUid = userData.user.uid;
                setDoc(doc(db, `UserWallet/${userUid}/ListWallet/${userInfo["userAccount"]}`), {
                  deposit: userInfo["userDeposit"],
                }).then(() => {
                  Validated(true);
                })
              }).catch((error) => {
                commit('setError', error.code)
                Validated(false)
              })

            } else {
              commit('setError', 'err_depo');
              Validated(false)
            }
            
          } else {
            commit('setError', 'err_pass');
            Validated(false)
          }

        } else {
          commit('setError', 'err_mail');
          Validated(false)
        }

      })
    },
    //connexion au site
    UserLogIn: ({ commit }, userInfo) => {
      return new Promise(Validated => {

        var emailReg = new RegExp(/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/);
        if (emailReg.test(userInfo["userEmail"])) {
          signInWithEmailAndPassword(auth, userInfo['userEmail'], userInfo['userPassword']).then(() => {
            Validated(true)
          }).catch(() => {
            commit('setError', 'err_mail')
            Validated(false)
          })
        } else {
          commit('setError', 'err_mail');
          Validated(false)
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
            Validated(true)
          } else {
            Validated(false)
          }
        });
      })
    },
    //recuperation de la liste des crypto du site
    loadCryptoList: ({ commit }) => {
      return new Promise(Validated => {
        getDoc(doc(db, 'CryptoList', 'wpcNLNN9xWlI2bi6VvP9')).then((snapshot) => {
          commit('setCryptoList', snapshot.data().Crypto)
          commit('setlistCryptoForCryptoCompare', snapshot.data().CryptoName)
          commit('setListCryptoFullName', snapshot.data().CryptoFullName)
        }).then(() => {
          Validated(true)
        })
      })
    },
    //récuperation crypto du wallet de l'utilisateur
    loadUserWallet: ({ state, commit }) => {
      return new Promise(Validated => {
        
        state.userData.userWalletList = []
        state.userData.userDepositList = []
        const listWallet = []
        var isEmpty = 0
        getDocs(collection(db, `UserWallet/${state.userData.userUid}/ListWallet`)).then((snapshot) => {
          snapshot.forEach(
            (doc) => listWallet[doc.id] = doc.data()
            )
          snapshot.forEach(
            () => isEmpty = 1
            )
        }).then(() => {
          if (isEmpty != 0) {
            commit('setWalletUser', listWallet)
            commit('setUserDepositList', listWallet)
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
    //recuperation depot du wallet selectionner
    loadUserDeposit: ({ commit, state }) => {
      return new Promise(Validated => {
        state.userData.userDepositSelected = 0
        getDoc(doc(db, `UserWallet/${state.userData.userUid}/ListWallet/${state.userData.userWalletSelected}`,)).then((snapshot) => {
          if (typeof snapshot.data() == 'undefined') {
            Validated(false)
          } else {
            commit('setUserDepositSelect', snapshot.data())
            Validated(true)
          }
        })
      })
    },
    //recuperation des crypto de l'utilisation sur le wallet selectionner
    loadUserCrypto: ({ commit, state }, userUid) => {
      return new Promise(Validated => {
        state.userData.userCryptoIndexListGekoApi = []
        state.userData.userCryptoIndexListCryptoCompareApi = []
        state.userData.userDataCrypto = []
        const tab = []
        var isEmpty = 0
        getDocs(collection(db, `UserCrypto/${userUid}/${state.userData.userWalletSelected}`)).then((snapshot) => {
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
    //definit l'asset selectionner
    UserSelectedAsset: ({state, commit}, data) => {
      return new Promise(Valited => {
        state.userData.userAssetSelected = []
        
        for(const test in state.userData.userDataCrypto) {
          if (state.userData.userDataCrypto[test].symbol == data["symbol"]) {
            commit('setUserAssetSelected', {
              symbol: data["symbol"],
              nameForEdit: data["nameForEdit"],
              price: state.userData.userDataCrypto[test].priceNow,
              buyPrice: state.userData.userDataCrypto[test].buyPrice,
              quantity: state.userData.userDataCrypto[test].quantity,
            })
          }
        }
        Valited(true)
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
          if (!isNaN(tab[b])) {
            resultSum = (resultSum + tab[b])
          }
        }
        commit('setWinLostValue', resultSum)
        Validated(true)
      })
    },    
    //recuperation prix des crypto pour le graph
    loadCryptoPriceHistoryHour: ({ commit, state }) => {
      return new Promise(Validated => {
        //compteur du nombre de fois qu'il y a la boucle for
        var countDly = 1
        for (const token in state.userData.userCryptoIndexListCryptoCompareApi) {
          //tableau liste price crypto et date
          var tabCryptoDly = []
          var tabTimeDly = []
          //requete pour recuperer les prix
          axios({
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/v2/histohour?fsym=' + state.userData.userCryptoIndexListCryptoCompareApi[token] + '&tsym=USD&limit=23'
          }).then(result => {
            //parse resultat
            var data = result.data.Data.Data
            //si pas de donnée sur la crypto alors skip
            if (typeof data != 'undefined') {
              //faire correspondre la crypto de la requete avec crypto de l'user
              for (const cryptoUser in state.userData.userDataCrypto) {
                //si correspondance
                if (state.userData.userDataCrypto[cryptoUser].symbol == state.userData.userCryptoIndexListCryptoCompareApi[token]) {
                  //alors parse les donner puis ajouter dans tableau en multipliant par le nombre de crypto de l'user
                  for (const val in data) {
                    //si tableau est vide alors remplir la première fois
                    if (tabCryptoDly[val] == null) {
                      tabCryptoDly[val] = Math.round(data[val].open * state.userData.userDataCrypto[cryptoUser].quantity)
                      tabTimeDly[val] = timeConverter(data[val].time)
                    } else {
                      //si tableau contient 1 valeurs alors continuer à remplir
                      tabCryptoDly[val] = Math.round(tabCryptoDly[val] + (data[val].open * state.userData.userDataCrypto[cryptoUser].quantity))
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
            if (countDly == (state.userData.userCryptoIndexListCryptoCompareApi.length + 1)) {
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
    loadCryptoPriceHistoryWly: ({ commit, state }) => {
      return new Promise(Validated => {
        //compteur du nombre de fois qu'il y a la boucle for
        var countWky = 1
        for (const token in state.userData.userCryptoIndexListCryptoCompareApi) {
          //tableau liste price crypto et date
          var tabCryptoWky = []
          var tabTimeWky = []
          //requete pour recuperer les prix
          axios({
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=' + state.userData.userCryptoIndexListCryptoCompareApi[token] + '&tsym=USD&limit=6'
          }).then(result => {
            //parse resultat
            var data = result.data.Data.Data
            //si pas de donnée sur la crypto alors skip
            if (typeof data != 'undefined') {
              //faire correspondre la crypto de la requete avec crypto de l'user
              for (const cryptoUser in state.userData.userDataCrypto) {
                //si correspondance
                if (state.userData.userDataCrypto[cryptoUser].symbol == state.userData.userCryptoIndexListCryptoCompareApi[token]) {
                  //alors parse les donner puis ajouter dans tableau en multipliant par le nombre de crypto de l'user
                  for (const val in data) {
                    //si tableau est vide alors remplir la première fois
                    if (tabCryptoWky[val] == null) {
                      tabCryptoWky[val] = Math.round(data[val].open * state.userData.userDataCrypto[cryptoUser].quantity)
                      tabTimeWky[val] = timeConverter(data[val].time)
                    } else {
                      //si tableau contient 1 valeurs alors continuer à remplir
                      tabCryptoWky[val] = Math.round(tabCryptoWky[val] + (data[val].open * state.userData.userDataCrypto[cryptoUser].quantity))
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
            if (countWky == (state.userData.userCryptoIndexListCryptoCompareApi.length + 1)) {
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
    loadCryptoPriceHistoryMth: ({ commit, state }, valUserData) => {
      return new Promise(Validated => {
        //compteur du nombre de fois qu'il y a la boucle for
        var countMth = 1
        for (const token in valUserData.userCryptoIndexListCryptoCompareApi) {
          //tableau liste price crypto et date
          var tabCryptoMth = []
          var tabTimeMth = []
          //requete pour recuperer les prix
          axios({
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=' + valUserData.userCryptoIndexListCryptoCompareApi[token] + '&tsym=USD&limit=30'
          }).then(result => {
            //parse resultat
            var data = result.data.Data.Data
            //si pas de donnée sur la crypto alors skip
            if (typeof data != 'undefined') {
              //faire correspondre la crypto de la requete avec crypto de l'user
              for (const cryptoUser in state.userData.userDataCrypto) {
                //si correspondance 
                if (state.userData.userDataCrypto[cryptoUser].symbol == valUserData.userCryptoIndexListCryptoCompareApi[token]) {
                  //alors parse les donner puis ajouter dans tableau en multipliant par le nombre de crypto de l'user
                  for (const val in data) {
                    //si tableau est vide alors remplir la première fois
                    if (tabCryptoMth[val] == null) {
                      tabCryptoMth[val] = Math.round(data[val].open * parseFloat(valUserData.userDataCrypto[cryptoUser].quantity))
                      tabTimeMth[val] = timeConverter(data[val].time)
                    } else {
                      //si tableau contient 1 valeurs alors continuer à remplir
                      tabCryptoMth[val] = Math.round(tabCryptoMth[val] + (data[val].open * parseFloat(valUserData.userDataCrypto[cryptoUser].quantity)))
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
            if (countMth == (valUserData.userCryptoIndexListCryptoCompareApi.length + 1)) {
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
    //calcul moyen prix
    loadMeanPriceWallet: ({commit, state}) => {
      return new Promise(Validated => {
        var tab = state.historyWalletMth.length
        var i = 0, sum = 0
        while (i < tab) {
          sum = sum + state.historyWalletMth[i++]
        }
        commit('setMeanPriceWallet', (sum / tab).toFixed(2))
        Validated(true)
      })
    },
    //calcul min prix wallet
    loadMinPriceWallet: ({commit, state}) => {
      return new Promise(Validated => {
        var tab = state.historyWalletMth
        var min = Math.min(...tab)
        commit('setMinPriceWallet', min)
        Validated(true)
      })
    },
    loadMaxPriceWallet: ({commit, state}) => {
      return new Promise(Validated => {
        var tab = state.historyWalletMth
        var min = Math.max(...tab)
        commit('setMaxPriceWallet', min)
        Validated(true)
      })
    },
    



    //mise a jour des info de la crypto (quantité, prix d'achat)
    updateCryptoUser: ({ state }, data) => {
      return new Promise(Validated => {
        var buyPriceReplace = data['buyprice'].replace(',', '.')
        var quantityReplace = data['quantity'].replace(',', '.')
        updateDoc(doc(db, `UserCrypto/${state.userData.userUid}/${state.userData.userWalletSelected}/${data['cryptoName']}`), {
          buyPrice: buyPriceReplace,
          quantity: quantityReplace
        }).then(() => {
          Validated(true)
        })
      })
    },
    //suppression d'une crypto dans le wallet selectionner
    deleteCryptoUser: ({ state }, data) => {
      return new Promise(Validated => {
        deleteDoc(doc(db, `UserCrypto/${state.userData.userUid}/${state.userData.userWalletSelected}/${data['cryptoName']}`)).then(() => {
          Validated(true)
        })
      })
    },
    //ajout d'une crypto dans le wallet selectionner
    addOnWallet: ({ commit, state }, cryptoInfo) => {
      return new Promise(Validated => {
        if (cryptoInfo['crypto']) {
          var buyPriceReplace = cryptoInfo['buyprice'].replace(',', '.')
          setDoc(doc(db, `UserCrypto/${cryptoInfo['uid']}/${state.userData.userWalletSelected}/${cryptoInfo['crypto']}`), {
            buyPrice: buyPriceReplace,
            quantity: cryptoInfo['quantity'],
            Name: cryptoInfo['Name']
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
          setDoc(doc(db, `UserWallet/${state.userData.userUid}/ListWallet/${data['walletName']}`), {
            deposit: data['deposit'],
          })
          Validated(true)
        }
      })
    },
    //suppression du wallet ainsi que les crypto contenue dedans
    deleteWalletUser: ({ state }, value) => {
      return new Promise(Validated => {
        deleteDoc(doc(db, `UserWallet/${state.userData.userUid}/ListWallet/${value['walletName']}`)).then(() => {
          getDocs(collection(db, `UserCrypto/${state.userData.userUid}/${value['walletName']}`)).then((snapshot) => {
            snapshot.forEach((docu) => deleteDoc(doc(db, `UserCrypto/${state.userData.userUid}/${value['walletName']}/${docu.id}`)).then(() => {
              Validated(false)
            }))
          })
        }).then(() => {
          Validated(true)
        })
      })
    },
    //mise a jour depot du wallet
    updateDeposit: ({ state }, data) => {
      return new Promise(Validated => {
        updateDoc(doc(db, `UserWallet/${state.userData.userUid}/ListWallet/${state.userData.userWalletSelected}`), {
          deposit: data['deposit']
        }).then(() => {
          Validated(true)
        })
      })
    },



    /**
     * -calculer price de balance maximun
     * -calculer price de balance minimum
     * -faire le graphique
     * -faire actif cliquable et afficher les stats
     * -compter etf
     * -compter crypto
     * -compter forex
     * -compter action
     * 
     */


    /**
     * 
     * func 1 : connexion
     * func 2: inscription
     * func 2,5 : recup data user
     * func 3 : recuperation des wallets de l'utilisateur
     * func 4 : selection wallet et selection du premier actif
     * func 5 : recuperation donner des crypto de l'utilisateur et donner user
     * func 6 : recuperation des price des actifs (crypto, etf, action, forex, euro, usd, ...)
     * func 7 : calcul win loss value
     * func 8 : modifier le depot du wallet
     * func 9 : modifier les données de l'actif selectionner
     * func 10 : suppression de l'actif selectionner
     * func 11 : suppression de wallet
     * func 12 : selection d'un actif au click
     * func 13 : calcul prix balance max et min et moyenne
     * 
     */
  },

  modules: {},
});