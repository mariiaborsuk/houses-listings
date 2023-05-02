import {defineStore} from 'pinia'

export const useHousesStore = defineStore('houses', {
  state: () => ({}),

  actions: {
    async getHouses() {
      return fetch('https://api.intern.d-tt.nl/api/houses', {
        headers: {'X-Api-Key': import.meta.env.VITE_API_KEY}
      })
        .then((response) => response.json())
        .then((data) => data)
    }
  }
  // }
})
