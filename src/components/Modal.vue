<template>
  <div v-show="showDeleteModal" id="modal" class="modal">
    <div class="modal-content">
      <h3>Delete listings </h3>
      <p>Are you sure that you want to delete this listing?</p>
      <p>The action cannot be undone</p>
      <div class="modalButtons">
        <button @click="confirmDelete" class="yesdelete">YES, DELETE</button>
        <button @click="hideModal" class="goBack">GO BACK</button>
      </div>
    </div>

  </div>
</template>
<script>
import {mapActions, mapWritableState} from "pinia";
import {useHousesStore} from '../stores/counter'

export default {
  name: 'DeleteModal',
  computed: {
    ...mapWritableState(useHousesStore, ['showDeleteModal', 'deleteHouseId'])
  },
  methods: {
    ...mapActions(useHousesStore, ['deleteHouse', 'getHouses']),
    hideModal() {
      this.showDeleteModal = false
    },
    confirmDelete() {
      var self = this
      this.deleteHouse(this.deleteHouseId)
        .then((response) => {
          if (self.$route.name === 'house') {
            self.$router.push({name: 'houses'})
            self.showDeleteModal = false
            self.deleteHouseId = null
          } else if (self.$route.name === 'houses') {
            this.getHouses().then((data) => {
                self.showDeleteModal = false
                self.deleteHouseId = null
              }
            )
          }
        })
    }
  }
}
</script>
<style>
.modal {
  display: block;
  position: fixed;
  z-index: 10;
  padding-top: 30vh;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: rgba(254, 254, 254, 0.98);
  margin: auto;;
  border: 1px solid #888;
  width: 30%;
  height: 30%;
  padding: 3%;
  border-radius: 10px;
  display: flex;
  flex-direction: column
}

.modal-content > p {
  text-align: center;
}

.modalButtons {
  display: flex;
  flex-direction: column;
}

.modalButtons > button {
  width: 50%;
  margin: auto;
  height: 5vh;
  border-radius: 10px;
  margin-top: 1%;
  border: none;
  color: white
}

.yesdelete {
  background-color: coral;
}

.goBack {
  background-color: gray;
}
</style>
