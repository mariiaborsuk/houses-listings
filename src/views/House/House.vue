<template src="./house.html">
</template>
<script>
import {mapActions, mapWritableState} from 'pinia'
import {useHousesStore} from '../../stores/counter'

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
    /**
     * open Modal window
     * defining deleteHouseId for deleting this House in pinia
     */
    openDeleteModal() {
      this.showDeleteModal = true
      this.deleteHouseId = this.house.id
    }
  },
}
</script>
<style src="./house.css">

</style>