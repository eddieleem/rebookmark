import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CardView from "@/views/CardView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mypage/:id",
    name: "MyPage",
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/MyPage.vue"),
  },
  {
    path: "/card/:id",
    name: "CardView",
    component: CardView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
