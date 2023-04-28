<template>
  <div class="flex margin">
    <div class="logo"><img src="assets/images/img_logo_dtt@3x.png" /></div>
    <router-link :to="{ name: 'houses' }" class="link home" @click="handleClick"
      ><div :class="$route.name === 'houses' ? 'active' : ''">Houses</div>
      <img
        id="home"
        :src="
          $route.name === 'houses'
            ? 'assets/images/ic_mobile_navigarion_home_active@3x.png'
            : 'assets/images/ic_mobile_navigarion_home@3x.png'
        "
    /></router-link>

    <router-link :to="{ name: 'about' }" class="link about"
      ><div :class="$route.name === 'about' ? 'active' : ''">About</div>
      <img
        :src="
          $route.name === 'about'
            ? 'assets/images/ic_mobile_navigarion_info_active@3x.png'
            : 'assets/images/ic_mobile_navigarion_info@3x.png'
        "
        id="about"
    /></router-link>
  </div>
</template>
<script>
import About from '@/views/AboutView.vue'
import Home from '@/views/HomeView.vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'AppNavigation',
  components: {
    About,
    Home
  }
}
</script>
<style>
@media only screen and (max-width: 1000px) {
  .link > div {
    display: none;
  }
  .img {
    width: 100px;
  }
  .flex > .link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 2%;
    flex: 1;
  }
  .logo {
    display: none;
  }
}

@media only screen and (min-width: 1000px) {
  .link > img {
    display: none;
  }
  .link > div {
    display: block;
  }
  .logo > img {
    width: 200px;
    padding-top: 1rem;
  }
  .logo {
    margin-right: 50px;
  }
  .flex > .link {
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    color: grey;
  }
  .active {
    color: black;
    font-weight: 700;
  }
}
</style>
