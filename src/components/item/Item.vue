<template src="./item.html"></template>
<script>
import {mapWritableState} from "pinia";
import {useHousesStore} from '../../stores/counter'

export default {
  computed: {
    ...mapWritableState(useHousesStore, ['showDeleteModal', 'deleteHouseId'])
  },
  methods: {
    /** opens Modal window, rewrites the deleteHouseId with this.House.id in pinia,
     *   so it will be used by Modal component to delete this House
     */
    clickDeleteButton() {
      this.showDeleteModal = true
      this.deleteHouseId = this.house.id
    }
  },
  props: ['house']
}
</script>
<style src="./item.css">

</style>