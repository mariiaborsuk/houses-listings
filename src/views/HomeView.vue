<template>
  <div class="header margin">
    <div class="h2"><h2>Houses</h2></div>
    <router-link :to="{name:'create'}" class="createBtn">
      <button>+ <span class="hidden">CREATE NEW</span></button>
    </router-link>
  </div>

  <div class="margin buttons">
    <div class="search">
      <form @submit.prevent="search">
        <input type="text" class="searchInput" placeholder="Search for a house" v-model="textSearch"/>
      </form>
      <button
        class="clear"
        :style="{
          backgroundImage: `url(${searchActive ? 'assets/images/ic_clear@3x.png' : ''})`
        }"
        @click="handleClick"
      ></button>
    </div>

    <div class="sort">
      <div
        style="
           {
            'border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;'
          }
        "
        @click="sortByPrice"
        :class="sortActive === 'price' ? 'sortActive' : ''"
        id="sortPrice"
      >
        Price
      </div>
      <div
        style="
           {
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
          }
        "
        @click="sortBySize"
        :class="sortActive === 'size' ? 'sortActive' : ''"
        id="sortSize"
      >
        Size
      </div>
    </div>
  </div>
  <div class="content margin">
    <h2 v-show="showResult">{{ searchResult }} results found</h2>
    <div class="error" v-show="showError"></div>
    <router-link
      v-show="list.length > 0"
      class="list"
      v-for="house in list"
      :key="house.id"
      :to="{ name: 'house', params: { id: house.id } }"
      href="#"
    >

      <div class="houseImg" :style="{ backgroundImage: `url(${house.image})` }"></div>

      <div class="houseInfo">
        <div class="street">{{ house.location.street }}</div>
        <div v-show="house.madeByMe" class=" deleteEdit hiddenComp
          "><img src="/assets/images/ic_edit@3x.png" class="houseImg2"/><img
          class="houseImg2"
          src="/assets/images/ic_delete@3x.png"/></div>
        <div class="price">€{{ house.price }}</div>
        <div class="city">{{ house.location.city }}</div>
        <div class="details">
          <img src="assets/images/ic_bed@3x.png"/> {{ house.rooms.bedrooms }}
          <img src="assets/images/ic_bath@3x.png"/> {{ house.rooms.bathrooms }}
          <img src="assets/images/ic_size@3x.png"/> {{ house.size }} m2
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import {mapActions} from 'pinia'
import {useHousesStore} from '../stores/counter'

export default {
  data() {
    return {
      list: [],
      textSearch: '',
      searchActive: false,
      searchResult: 0,
      showResult: false,
      showError: false,
      sortActive: ''
    }
  },

  methods: {
    ...mapActions(useHousesStore, ['getHouses']),
    search() {
      if (this.textSearch.length >= 3) {
        let newList = this.list.filter((item) => {
          let endIndex = this.textSearch.length
          if (
            item.location.city.slice(0, endIndex).toLowerCase() == this.textSearch.toLowerCase()
          ) {
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
    },
    sortByPrice() {
      let sorted = this.list.sort((a, b) => {
        return a.price - b.price
      })
      this.list = sorted
      this.sortActive = 'price'
    },
    sortBySize() {
      let sorted = this.list.sort((a, b) => {
        return a.size - b.size
      })
      this.list = sorted
      this.sortActive = 'size'
    }
  },

  async created() {
    await this.getList()
    this.sortByPrice()
  }
}
</script>
<style>

h2 {
  font-weight: 800;
}

.header {
  display: flex;
  flex-direction: row;
}

.header > div {
  flex: 1;
}

.createBtn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 20px;
  text-decoration: none;
}

.buttons {
  margin-top: 2%;
}

.searchInput {
  background-image: url('assets/images/ic_search@3x.png');
  background-color: rgb(192, 181, 181);
  background-repeat: no-repeat;
  background-size: 8%;
  background-position: 5% 50%;
  padding-left: 9%;
  height: 95%;

  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border: none;
}

.searchInput::placeholder {
  font-weight: 700;
  color: grey;
}

.searchInput:focus {
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

.sort {
  width: 30%;
  border-radius: 10px;
  background-color: gray;
}

.sortActive {
  background-color: coral;
}

#sortPrice.sortActive {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

#sortSize.sortActive {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

.search {
  width: 50%;
  margin-right: 20%;
}

.error {
  height: 50vh;
  background-image: url('assets/images/img_empty_houses@3x.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30%;
}

.list {
  text-decoration: none;
  color: black;
  margin-top: 3%;
}

@media only screen and (min-width: 900px) {
  .createBtn > button {
    width: 200px;
    height: 50px;
    background-color: coral;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 600;
    color: white;
    right: 10px;
  }

  .list {
    height: 15rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    padding: 2%;
    border-radius: 10px;
  }

  .sort {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border-radius: 10px;
  }

  .sort > div {
    flex: 1;
    text-align: center;
    padding-top: 5%;
    color: white;
  }

  .houseInfo {
    flex: 2;
    height: 90%;
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
    margin-right: 1%;
  }

  .street {
    font-weight: 700;
    font-size: 90%;
  }

  .city {
    color: gray;
    font-size: 80%;
  }

  .details > img {
    width: 2%;
  }

  .houseInfo > div {
    margin-bottom: 1%;
  }
}

@media only screen and (max-width: 900px) {
  .sort {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 2%;
  }

  .sort > div {
    flex: 1;
    text-align: center;
    color: white;
    padding-top: 1%;
  }

  .search {
    width: 100%;
  }

  .h2 {
    flex: 3;
  }

  .hidden {
    display: none;
  }

  .createBtn > button {
    flex: 1;
    color: black;
    background-color: #dddddd;
    border: none;
  }

  .list {
    height: 10rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    margin-bottom: 5%;
    padding: 2%;
    border-radius: 10px;
  }

  .houseInfo {
    flex: 2;
    height: 90%;
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
    margin-right: 2%;
  }

  .street {
    font-weight: 700;
    font-size: 100%;
  }

  .city {
    color: gray;
    font-size: 90%;
  }

  .details > img {
    width: 10%;
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

  .searchInput {
    background-size: 7%;
    padding-left: 10%;
    background-position: 2% 18%;
  }

  .buttons > div {
    flex: 1;
  }
}
</style>
