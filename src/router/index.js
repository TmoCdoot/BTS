import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import { auth  /* onAuthStateChanged */ } from '../plug-in/firebase.js';

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
   /*  beforeEnter: test */
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: notrequireAuth
  },
];

//probleme avec la fonction revoir celle-ci pour plus propre probleme callback
/* function loginRequired (to, from, next) {
  var user = onAuthStateChanged(auth, user => { 
    if (user != null) {
      return true
    } else {
      return false
    }
  })

  console.log(user)
  if (user == true) {
    next('/home')
    return
  } else {
    next('/')
    return
  }
} */

function notrequireAuth (to,from,next) {
  let user = auth.currentUser
  if(user != null){
    next()
  }else{
    next({name:'Auth'})
  }
}

/* function test (to,from,next) {
  let user = auth.currentUser
  console.log(auth)
  console.log(user)
  if(user == null){
    next()
  }else{
    next({name:'Home'})
  }
} */

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
