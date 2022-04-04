import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import { auth, onAuthStateChanged } from '../plug-in/firebase.js';

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: loginRequired
  },
];

//probleme avec la fonction revoir celle-ci pour plus propre probleme callback
function loginRequired (to, from, next) {
  onAuthStateChanged(auth, user => { 
    /* console.log(user)  */
    if (user != null) {
      next()
    } else {
      next({name: 'Auth'})
    }
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
