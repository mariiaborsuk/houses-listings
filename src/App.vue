<template>
  <div class="nav">
    <Navigation/>
  </div>
  <modal/>
  <router-view class="content "></router-view>
</template>
<script>
import Navigation from '@/components/Navigation.vue'
import Modal from "@/components/Modal/Modal.vue";

export default {
  name: 'App',
  components: {
    Navigation,
    Modal
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@800&family=Montserrat:ital,wght@1,500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@800&family=Montserrat:ital,wght@1,500&display=swap');

.title1 {
  font-family: 'Open Sans Semibold', arial;
  font-weight: bold;
}

.errorM {
  font-family: 'Montserrat';
}

h1 {
  text-align: center;
  padding: 2%
}

h2 {
  margin-top: 2%;
  margin-bottom: 2%
}

body {
  max-width: 100%;
  height: 200%;
  background-color: #dddddd;
  color: #4d4d4d;
  font-family: 'Open Sans Regular', arial;
}

.content {
  height: 100%;

}

input {
  font-size: 12px;
}

label {
  font-size: 12px;
  font-weight: bold;
}

@media only screen and (max-width: 900px) {
  body {
    font-size: 14px;
  }

  label {
    font-size: 14px;
    font-weight: bold;
  }

  .nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: white;
    height: 10%;
    margin-top: 5%;
  }

  .nav > div {
    display: flex;
    flex-direction: row;
  }

  .margin {
    max-width: 90%;
    margin-right: 5%;
    margin-left: 5%
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
    display: block
  }

  body {
    font-size: 18px;
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
    max-width: 60%;
  }
}
</style>
