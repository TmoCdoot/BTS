import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import { auth, onAuthStateChanged } from '../plug-in/firebase.js';

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
    beforeEnter: noLogin
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: isLogin
  },
];

//probleme avec la fonction revoir celle-ci pour plus propre probleme callback
function isLogin (to, from, next) {
  onAuthStateChanged(auth, user => { 
    /* console.log(user)  */
    if (user != null) {
      next()
    } else {
      next({name: 'Auth'})
    }
  })
}

function noLogin(to, from, next) {
  onAuthStateChanged(auth, user => { 
    /* console.log(user)  */
    if (user != null) {
      next({name: 'Home'})
    } else {
      next()
    }
  })
}

/* function notrequireAuth (to,from,next) {
  let user = auth.currentUser
  if(user != null){
    next()
  }else{
    next({name:'Auth'})
  }
} */

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
