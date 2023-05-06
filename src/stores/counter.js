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
    async getHouseById(id) {
      const list = await this.getHouses()
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          return list[i];
        }
      }
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
          const formData = new FormData();
          const fileField = document.querySelector('input[type="file"]');
          formData.append('image', fileField.files[0])
          return fetch(`https://api.intern.d-tt.nl/api/houses/${data.id}/upload`, {
            headers: {
              'X-Api-Key': import.meta.env.VITE_API_KEY,
            },
            method: "POST",
            body: formData
          });

        }).then((response) =>
          response.text()
        )
    },
    async editHouse(
      houseId,
      newPostPrice,
      newPostbedrooms,
      newPostbathrooms,
      newPostSize,
      newPostStreetName,
      newPostHouseNumber,
      newPostZip,
      newPostCity,
      newPostNumberAddition,
      newPostConstructionYear,
      newPostHasGarage,
      newPostDescription
    ) {
      var self = this
      return fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
          method: 'POST',
          headers: {
            'X-Api-Key': import.meta.env.VITE_API_KEY,
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            price: newPostPrice,
            bedrooms: newPostbedrooms,
            bathrooms: newPostbathrooms,
            size: newPostSize,
            streetName: newPostStreetName,
            houseNumber: newPostHouseNumber,
            numberAddition: newPostNumberAddition,
            zip: newPostZip,
            city: newPostCity,
            constructionYear: newPostConstructionYear,
            hasGarage: newPostHasGarage,
            description: newPostDescription
          })
        }
      ).then((response) => response.text())
        .then((data) => {
          self.linkId = houseId
          const formData = new FormData();
          const fileField = document.querySelector('input[type="file"]');
          formData.append('image', fileField.files[0])
          return fetch(`https://api.intern.d-tt.nl/api/houses/${self.linkId}/upload`, {
            headers: {
              'X-Api-Key': import.meta.env.VITE_API_KEY,
            },
            method: "POST",
            body: formData
          });

        }).then((response) => response.text())
    }

  }
})