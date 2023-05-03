<template>
  <div>
    <h2>About DTT Real Estate</h2>
    <div class="content">
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua
      </p>
      <h2 style="padding-top: 2rem">Design and Development</h2>
      <div class="logoDiv">
        <div class="picture"><img class="img" src="assets/images/img_logo_dtt@3x.png"/></div>
        <div style="padding-left: 1rem">
          <div>By DTT</div>
          <div style="color: blue">www.d-tt.nl</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {useRoute} from 'vue-router'

export default {
  data() {
    return {
      location: useRoute()
    }
  }
}
</script>
<style>
.logoDiv {
  display: flex;
  flex-direction: row;
}

@media only screen and (max-width: 900px) {
  .img {
    width: 5rem;
  }
}

@media only screen and (min-width: 900px) {
  .img {
    width: 300px;
  }
}
</style>
