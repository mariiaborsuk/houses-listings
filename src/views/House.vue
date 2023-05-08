<template>
  <div class="houseView margin ">
    <div class="house">
      <div class="hiddenComp">
        <router-link :to="{name: 'houses'}"><img class="houseImg2" src="/assets/images/ic_back_grey@3x.png"/>
        </router-link>
      </div>
      <div class="houseComp" :style="{
          backgroundImage: `url(${house.image})`
        }">
        <div class="houseNav">
          <div class="hiddenMobile">
            <router-link :to="{name: 'houses'}"><img class="houseImg2 " src="/assets/images/ic_back_white@3x.png"/>
            </router-link>
          </div>
          <div v-show="house.madeByMe" class="navImg hiddenDiv">
            <router-link :to="{name:'edit', params: {id: $route.params.id}}">
              <img class="houseImg2 editImg" src="/assets/images/ic_edit_white@3x.png"/>
            </router-link>
            <img class="houseImg2 deleteImg" src="/assets/images/ic_delete_white@3x.png"/></div>
        </div>

      </div>
      <div class="houseDetails">
        <div class="streetDetails">
          <div v-if="house.location" class="houseStreet">{{ house.location.street }}</div>
          <div v-show="house.madeByMe" class="deleteEdit hiddenComp">
            <router-link :to="{name:'edit', params: {id: $route.params.id}}">
              <img src="/assets/images/ic_edit@3x.png" class="houseImg2"/></router-link>

            <img
              class="houseImg2"
              src="/assets/images/ic_delete@3x.png" @click="openDeleteModal"/></div>
        </div>


        <div class="houseIndex"><img class="houseImg2" src="/assets/images/ic_location@3x.png"/>
          <span v-if="house.location">{{ house.location.zip }} {{ house.location.city }}</span>
        </div>
        <div class="houseInformation"><img class="houseImg2" src="/assets/images/ic_price@3x.png"/>
          <span v-if="house">{{
              house.price
            }}
          </span>
          <img
            class="houseImg2"
            src="/assets/images/ic_size@3x.png"/>
          <span v-if="house">{{ house.size }}m2</span>
          <img class="houseImg2"
               src="/assets/images/ic_construction_date@3x.png"/>
          <span v-if="house">Built in {{ house.constructionYear }}</span>

        </div>
        <div class="houseInformation"><img class="houseImg2" src="/assets/images/ic_bed@3x.png"/>
          <span v-if="house.rooms">{{ house.rooms.bedrooms }}</span>
          <img class="houseImg2" src="/assets/images/ic_bath@3x.png"/>
          <span v-if="house.rooms">{{ house.rooms.bathrooms }}</span>
          <img class="houseImg2" src="/assets/images/ic_garage@3x.png"/>
          <span v-if="house">{{ house.hasGarage ? 'Yes' : 'No' }}</span>
        </div>
        <div class="houseDescription">
          <div v-if="house">{{ house.description }}</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import {mapActions, mapWritableState} from 'pinia'
import {useHousesStore} from '../stores/counter'

export default {
  name: 'HousePage',
  data() {
    return {
      list: [],
      house: {},
    }
  },
  async created() {
    this.house = await this.getHouseById(this.$route.params.id)
  },
  computed: {
    ...mapWritableState(useHousesStore, ['showDeleteModal', 'deleteHouseId'])
  },
  methods: {
    ...mapActions(useHousesStore, ['getHouses', 'getHouseById']),
    openDeleteModal() {
      this.showDeleteModal = true
      this.deleteHouseId = this.house.id
    }
  },
}
</script>
<style>
span {
  display: inline-block;
  margin: 1%
}

.houseComp {
  background-size: 120%;

  background-repeat: no-repeat;
  box-sizing: border-box;
}

.houseDetails > div {
  margin-left: 5%;
  margin-right: 5%
}

.houseDetails {
  padding-top: 5%;
}

@media only screen and (min-width: 900px) {
  .hiddenMobile {
    display: none
  }

  .houseView {
    max-width: 60%;
    margin: auto;
    display: flex;
    flex-direction: row;
  }

  .house {
    flex: 2
  }

  .hiddenDiv {
    display: none
  }

  .houseImg2 {
    height: 1rem;
  }

  .houseComp {
    height: 60vh;
    background-position: 10% 20%;
  }

  .houseDetails {
    background-color: white;
    display: flex;
    flex-direction: column;
    padding-bottom: 3%;
  }

  .houseDetails > div {
    margin-top: 1%;
  }

  .houseStreet {
    font-weight: bold;
    font-size: 180%;
  }

  .hiddenComp {
    margin-top: 2%;
    margin-bottom: 2%
  }

  .streetDetails {
    display: flex;
    flex-direction: row;
  }

  .streetDetails > div {
    flex: 1
  }

  .deleteEdit {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .deleteEdit > img {
    margin-left: 5%;
  }
}

@media only screen and (max-width: 900px) {
  .houseNav {
    display: flex;
    flex-direction: row;
    margin: 5%;
    max-width: 100%;
  }

  .houseNav > div {
    flex: 1
  }

  .navImg {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-left: 90%;
  }

  .navImg img {
    margin-right: 5vw;
    height: 3vh;
  }

  .house {
    display: flex;
    flex-direction: column;
    position: relative
  }

  .house > .houseComp {
    height: 40vh;
    max-width: 100%;
  }

  .hiddenComp {
    display: none;
  }

  .houseNav {
    margin-right: 14vw;
  }

  .houseDetails {
    background-color: white;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    display: flex;
    flex-direction: column;
    top: 28vh;
    padding: 5%;
    max-width: 100%;
    margin-top: -10vh;

  }

  .houseDetails > div {
    margin-top: 3%;
  }

  .houseStreet {
    font-weight: bold;
    font-size: 150%;
    height: 15%;
  }

  .houseImg2 {
    height: 1.5vh;
  }

}
</style>