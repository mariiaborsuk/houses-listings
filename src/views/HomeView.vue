<template>
  <h2 class="margin">Houses</h2>
  <div class="margin buttons">
    <div class="search">
      <form @submit.prevent="search">
        <input type="text" placeholder="Search for a house" v-model="textSearch" />
      </form>
      <button
        class="clear"
        :style="{
          backgroundImage: `url(${searchActive ? 'assets/images/ic_clear@3x.png' : ''})`
        }"
        @click="handleClick"
      ></button>
    </div>

    <div class="edit"></div>
  </div>
  <div class="content margin">
    <h2 v-show="showResult">{{ searchResult }} results found</h2>
    <div class="error" v-show="showError"></div>
    <div v-show="list.length > 0" class="list" v-for="house in list" :key="house.id">
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
      list: [],
      textSearch: '',
      searchActive: false,
      searchResult: 0,
      showResult: false,
      showError: false
    }
  },

  computed: {
    ...mapState(useHousesStore, ['houses'])
  },
  methods: {
    ...mapActions(useHousesStore, ['getHouses']),
    search() {
      if (this.textSearch !== '') {
        let newList = this.list.filter((item) => {
          if (item.location.city === this.textSearch) {
            return item
          }
        })

        this.list = newList
        this.searchActive = true
        this.showResult = true
        this.searchResult = newList.length
        if (this.searchResult === 0) {
          this.showError = true
        }
      }
    },
    async getList() {
      this.list = await this.getHouses()
    },
    handleClick() {
      this.getList()
      this.searchActive = false
      this.textSearch = ''
      this.showResult = false
      this.showError = false
    }
  },
  async created() {
    await this.getList()
  }
}
</script>
<style>
h2 {
  font-weight: 800;
}
input {
  background-image: url('assets/images/ic_search@3x.png');
  background-color: rgb(192, 181, 181);
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: 10px 10px;
  padding-left: 50px;
  height: 95%;

  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border: none;
}
input::placeholder {
  font-weight: 700;
  color: grey;
}
input:focus {
  outline: none;
}
.search {
  height: 3rem;
  border: none;
  border-radius: 10px;
  background-color: rgb(192, 181, 181);
  display: flex;
  flex-direction: row;
}
form {
  flex: 10;
  height: 100%;
  padding-right: 10px;
}
.search > button {
  flex: 1;
  border: none;
  background-color: rgb(192, 181, 181);
  border-radius: 10px;
  background-position: 10px 10px;
  background-size: 50%;
  background-repeat: no-repeat;
}

.buttons {
  display: flex;
  flex-direction: row;
}
.edit {
  flex: 3;
}
.search {
  flex: 2;
}
.error {
  height: 50vh;
  background-image: url('assets/images/img_empty_houses@3x.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30%;
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
  .error {
    background-size: 50%;
  }
  .buttons {
    flex-direction: column;
    height: 4rem;
  }
  input {
    background-size: 10px;
    padding-left: 30px;
  }
  .buttons > div {
    flex: 1;
  }
}
</style>
