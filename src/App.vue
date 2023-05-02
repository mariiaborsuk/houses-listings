<template>
  <div class="nav">
    <Navigation/>
  </div>

  <router-view class="content margin"></router-view>
</template>
<script>
import {useRoute} from 'vue-router'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      location: useRoute(),
      pageName: location.name
    }
  }
}
</script>
<style>
body {
  max-width: 100%;
  height: 200%;
  background-color: #dddddd;
  color: #4d4d4d;
  font-family: Arial;
}

.content {
  height: 100%;
  margin-top: 7%;
}

@media only screen and (max-width: 900px) {
  .nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: white;
    height: 100px;
  }

  .nav > div {
    display: flex;
    flex-direction: row;
  }
}

@media only screen and (min-width: 900px) {
  .nav {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    background-color: white;
    height: 100px;
  }

  .nav > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-basis: 200px;
  }

  .margin {
    margin-left: 20%;
    margin-right: 20%;
  }
}
</style>
