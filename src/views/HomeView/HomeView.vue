<template src="./home_view.html"></template>
<script>
import {mapActions, mapState} from 'pinia'
import {useHousesStore} from '../../stores/counter'
import Item from '@/components/item/Item.vue'
import Search from "@/lib/search";

const search = new Search()

export default {
  name: 'homeView',
  components: {
    Item
  },
  data() {
    return {
      filteredList: [],
      textSearch: '',
      searchActive: false,
      searchResult: 0,
      showResult: false,
      showError: false,
      sortActive: ''
    }
  },
  computed: {
    ...mapState(useHousesStore, ['list'])
  },
  methods: {
    ...mapActions(useHousesStore, ['getHouses']),
    /**checks if searchtext has enough length
     * gets rid of white spaces
     * filters the houses list to show houses with city that equals textSearch and displays the result
     * shows filtered houses list
     * if there is no result, shows error
     * makes clear button visible
     */
    search() {
      this.filteredList = search.search(this.textSearch, this.list)
      this.searchResult = this.filteredList.length

      if (this.textSearch.trim().length >= 3) {
        this.searchActive = true
        this.showResult = true
        if (this.searchResult === 0) {
          this.showError = true
        }
      } else {
        this.searchActive = false
        this.showResult = false
        this.showError = false
      }
    },
    /**
     * resets the filter and displays all the houses
     * hides clear button
     * hides result
     * hides error,
     * clears textSearch
     */
    handleClick() {
      var self = this
      this.getHouses().then((data) => {
        self.filteredList = data
      })
      this.searchActive = false
      this.textSearch = ''
      this.showResult = false
      this.showError = false
    },
    /**
     *  displays list sorted by price in ascending order
     *  changes style of an active div
     */
    sortByPrice() {
      let sorted = this.list.sort((a, b) => {
        return a.price - b.price
      })
      this.list = sorted
      this.sortActive = 'price'
    },
    /**
     *  displays list sorted by size in ascending order
     *  changes style of an active div
     */
    sortBySize() {
      let sorted = this.list.sort((a, b) => {
        return a.size - b.size
      })
      this.list = sorted
      this.sortActive = 'size'
    }
  },
  /**
   * On creation of the component, display the list of houses, sorted by price by default.
   * @returns {Promise<void>}
   */
  async created() {
    var self = this
    this.getHouses().then((data) => {
      self.filteredList = data
      self.sortByPrice()
    })
    const useStore = useHousesStore()
    //Subscribe on the changes in the Pinia state (the list of houses), once its changed, call search functionality.
    useStore.$subscribe((mutation, state) => {
      self.search()
    })
  }
}
</script>
<style src="./home_view.css"></style>
