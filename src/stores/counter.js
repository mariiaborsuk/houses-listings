import {defineStore} from 'pinia'

export const useHousesStore = defineStore('houses', {
  state: () => ({
    linkId: null
  }),

  actions: {
    async getHouses() {
      return fetch('https://api.intern.d-tt.nl/api/houses', {
        headers: {'X-Api-Key': import.meta.env.VITE_API_KEY}
      })
        .then((response) => response.json())
        .then((data) => data)
    },
    async postHouse(
      postPrice,
      postbedrooms,
      postbathrooms,
      postSize,
      postStreetName,
      postHouseNumber,
      postZip,
      postCity,
      postNumberAddition,
      postConstructionYear,
      postHasGarage,
      postDescription
    ) {
      return fetch('https://api.intern.d-tt.nl/api/houses', {
        method: 'POST',
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_KEY,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          price: postPrice,
          bedrooms: postbedrooms,
          bathrooms: postbathrooms,
          size: postSize,
          streetName: postStreetName,
          houseNumber: postHouseNumber,
          zip: postZip,
          city: postCity,
          numberAddition: postNumberAddition,
          constructionYear: postConstructionYear,
          hasGarage: postHasGarage,
          description: postDescription
        })
      }).then((response) => response.json())
        .then((data) => {
          this.linkId = data.id;
          console.log(this.linkId)
          const formData = new FormData();
          const fileField = document.querySelector('input[type="file"]');
          formData.append('image', fileField.files[0])
          console.log(formData.get('image'))
          return fetch(`https://api.intern.d-tt.nl/api/houses/${data.id}/upload`, {
            headers: {
              'X-Api-Key': import.meta.env.VITE_API_KEY,
            },
            method: "POST",
            body: formData
          });

        }).then((response) => response.text())
        .then(function (data) {
          console.log(data)
        })
    },

  }
})