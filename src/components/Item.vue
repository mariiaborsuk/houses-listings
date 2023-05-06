<template>
  <div class="list">
    <div class="imgContainer">
      <router-link :to="{ name: 'house', params: { id: house.id } }" href="#">
        <div class="houseImg" :style="{ backgroundImage: `url(${house.image})` }"></div>
      </router-link>
    </div>
    <div class="houseInfo">
      <div class="street">{{ house.location.street }}</div>
      <div class="price">€{{ house.price }}</div>
      <div class="city">{{ house.location.city }}</div>
      <div class="details">
        <img class="img" src="assets/images/ic_bed@3x.png"/> {{ house.rooms.bedrooms }}
        <img class="img" src="assets/images/ic_bath@3x.png"/> {{ house.rooms.bathrooms }}
        <img class="img" src="assets/images/ic_size@3x.png"/> {{ house.size }} m2
      </div>
    </div>
    <div v-show="house.madeByMe" class="deleteEdit">
      <div>
        <router-link :to="{name:'edit',  params: { id: house.id }}">
          <img class="imgEdit" src="/assets/images/ic_edit@3x.png"/>
        </router-link>
      </div>
      <div><img class="imgEdit" src="/assets/images/ic_delete@3x.png"/></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['house']
}
</script>
<style>
.imgContainer {
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

}

.deleteEdit {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
}

.deleteEdit > div {
  flex: 1
}

.imgEdit {
  display: inline-block;
  width: 50%;
  margin-right: 10%;
}

@media only screen and (min-width: 900px) {

  .list {
    height: 15rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    padding: 2%;
    border-radius: 10px;
  }

  .houseInfo {
    flex: 3;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .houseInfo > div {
    padding-bottom: 5px;
    flex: 1
  }

  .houseImg {
    height: 30vh;
    width: 15vw;
    margin: auto;
    border-radius: 10px;
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .street {
    font-weight: 700;
    font-size: 120%;
  }

  .city {
    color: gray;
    font-size: 120%;
  }

  .img {
    width: 100px;
    margin-left: 10px
  }

}

@media only screen and (max-width: 900px) {

  .hidden {
    display: none;
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
    flex: 3;
    height: 90%;
    margin-left: 10%;
    margin-top: 5%;
  }

  .houseImg {
    height: 20vh;
    width: 40vw;
    border-radius: 10px;
    background-size: 200%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .street {
    font-weight: 700;
    font-size: 90%;
  }

  .city {
    color: gray;
    font-size: 90%;
  }

  .details > img {
    width: 10%;
  }

  .details {
    font-size: 50%;
  }

  .houseInfo > div {
    margin-bottom: 0.5rem;
  }
}
</style>