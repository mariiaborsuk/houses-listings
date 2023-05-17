<template src="./modal.html">

</template>
<script>
import {mapActions, mapWritableState} from "pinia";
import {useHousesStore} from '../../stores/counter'

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
    /**
     *  // delete a House using deleteHouseId from pinia,
     *        then if then moving to the home page, if needed,
     *        rewrite the list of houses
     *        close the Modal and rewrite deleteHouseId from pinia
     */
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
<style src="./modal.css"></style>
