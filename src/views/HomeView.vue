<template>
  <h2 class="margin">Houses</h2>
  <div class="content margin">
    <div class="list" v-for="house in list" :key="house.id">
      <div class="houseImg" :style="{ backgroundImage: `url(${house.image})` }"></div>

      <div class="houseInfo">
        <div class="street">xxxxxx{{ house.location.street }}</div>
        <div class="price">€{{ house.price }}</div>
        <div class="city">{{ house.location.city }}</div>
        <div class="details">
          <img src="assets/images/ic_bed@3x.png" /> {{ house.rooms.bedrooms }}
          <img src="assets/images/ic_bath@3x.png" /> {{ house.rooms.bathrooms }}
          <img src="assets/images/ic_size@3x.png" /> {{ house.size }} m2
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useHousesStore } from '../stores/counter'

export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState(useHousesStore, ['houses'])
  },
  methods: {
    ...mapActions(useHousesStore, ['getHouses'])
  },
  async created() {
    this.list = await this.getHouses()
  }
}
</script>
<style>
h2 {
  font-weight: 800;
}
@media only screen and (min-width: 900px) {
  .list {
    height: 15rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 10px;
  }

  .houseInfo {
    flex: 2;
    height: 200px;
    margin: auto;
  }
  .houseImg {
    height: 200px;
    width: 200px;
    margin: auto;
    border-radius: 10px;
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 1rem;
  }
  .street {
    font-weight: 700;
    font-size: 2rem;
  }
  .city {
    color: gray;
    font-size: 2rem;
  }
  .details > img {
    width: 1.5rem;
  }
  .houseInfo > div {
    margin-bottom: 1.5rem;
  }
}
@media only screen and (max-width: 900px) {
  .list {
    height: 10rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 10px;
  }

  .houseInfo {
    flex: 2;
    height: 200px;
    margin: auto;
  }
  .houseImg {
    height: 80%;
    width: 35%;
    margin: auto;
    border-radius: 10px;
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 1rem;
  }
  .street {
    font-weight: 700;
    font-size: 1.5rem;
  }
  .city {
    color: gray;
    font-size: 1.5rem;
  }
  .details > img {
    width: 1.5rem;
  }
  .houseInfo > div {
    margin-bottom: 0.5rem;
  }
}
</style>
