<template>
  <div class="houseView ">
    <div class="house">
      <div class="hiddenComp">
        <router-link :to="{name: 'houses'}"><img class="houseImg2" src="/assets/images/ic_back_grey@3x.png"/>
        </router-link>
      </div>
      <div class="houseComp" :style="{
          backgroundImage: `url(${house.image})`
        }">
        <div class="houseNav hiddenDiv">
          <div>
            <router-link :to="{name: 'houses'}"><img class="houseImg2 " src="/assets/images/ic_back_white@3x.png"/>
            </router-link>
          </div>
          <div v-show="house.madeByMe" class="navImg"><img class="houseImg2 editImg"
                                                           src="/assets/images/ic_edit_white@3x.png"/>
            <img class="houseImg2 deleteImg" src="/assets/images/ic_delete_white@3x.png"/></div>
        </div>

      </div>
      <div class="houseDetails">
        <div class="streetDetails">
          <div class="houseStreet">{{ house.location.street }}</div>
          <div v-show="house.madeByMe" class=" deleteEdit hiddenComp
          "><img src="/assets/images/ic_edit@3x.png" class="houseImg2"/><img
            class="houseImg2"
            src="/assets/images/ic_delete@3x.png"/></div>
        </div>


        <div class="houseIndex"><img class="houseImg2" src="/assets/images/ic_location@3x.png"/> <span>{{
            house.location.zip
          }} {{ house.location.city }}</span>

        </div>
        <div class="houseInformation"><img class="houseImg2" src="/assets/images/ic_price@3x.png"/> <span>{{
            house.price
          }} </span>
          <img
            class="houseImg2"
            src="/assets/images/ic_size@3x.png"/> <span>{{ house.size }}m2</span>
          <img class="houseImg2"
               src="/assets/images/ic_construction_date@3x.png"/><span>Built in {{
              house.constructionYear
            }}</span>

        </div>
        <div class="houseInformation"><img class="houseImg2" src="/assets/images/ic_bed@3x.png"/><span>{{
            house.rooms.bedrooms
          }}</span> <img class="houseImg2"
                         src="/assets/images/ic_bath@3x.png"/> <span>{{ house.rooms.bathrooms }}</span>
          <img class="houseImg2"
               src="/assets/images/ic_garage@3x.png"/> <span>{{
              house.hasGarage ? 'Yes' : 'No'
            }}</span>
        </div>
        <div class="houseDescription">
          <div>{{
              house.description
            }}
          </div>
        </div>

      </div>
    </div>

    <div class="recommended"><h2>Recommended for you</h2>
      <div class="list">List</div>
    </div>
  </div>

</template>
<script>
import {mapActions} from 'pinia'
import {useHousesStore} from '../stores/counter'

export default {
  name: 'HousePage',
  data() {
    return {
      list: [],
      house: {},
    }
  },
  methods: {
    ...mapActions(useHousesStore, ['getHouses']),
    async getHouseById() {
      this.list = await this.getHouses();
      console.log(this.list)
      console.log(this.$route.params.id)
      this.list.forEach((item) => {
        if (item.id == this.$route.params.id) {
          this.house = item
        }
      })

    }

  },
  created() {
    this.getHouseById()
  }
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

.houseDescription {
  max-width: 90%;
  overflow-y: auto;
}

@media only screen and (min-width: 900px) {
  .houseView {
    max-width: 90%;
    margin: auto;
    display: flex;
    flex-direction: row;
  }

  .house {
    flex: 2
  }

  .recommended {
    flex: 1;
    margin-left: 3%
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
    dispaly: flex;
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
    margin-left: 60%;
  }

  .navImg > img {
    margin-left: 20%
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