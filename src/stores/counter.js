import {defineStore} from 'pinia'

export const useHousesStore = defineStore('houses', {
  state: () => ({
    linkId: null,
    showDeleteModal: false,
    deleteHouseId: null,
    list: []
  }),

  actions: {
    /**
     * get the list of houses from backend
     * @returns {Promise<any>}
     */
    async getHouses() {
      var self = this
      return fetch('https://api.intern.d-tt.nl/api/houses', {
        headers: {'X-Api-Key': import.meta.env.VITE_API_KEY}
      })
        .then((response) => response.json())
        .then((data) => {
          self.list = data
          return data
        })
    },
    /**
     *
     * @param {number} id
     * @returns {Promise<*>}
     * get the House details from backend using the House id
     */
    async getHouseById(id) {
      const list = await this.getHouses()
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          return list[i];
        }
      }
    },
    /**
     *
     * @param {number} postPrice
     * @param {number} postbedrooms
     * @param {number} postbathrooms
     * @param {number} postSize
     * @param {string}postStreetName
     * @param {number} postHouseNumber
     * @param {string} postZip
     * @param {string} postCity
     * @param {string}postNumberAddition
     * @param {number} postConstructionYear
     * @param {('yes'|'no')} postHasGarage
     * @param {string} postDescription
     * @returns {Promise<string>}
     * adding a new House;
     * uploading an image for a House separately using House id
     */
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
    /**
     *
     * @param {number} houseId
     * @param {number} newPostPrice
     * @param {number} newPostbedrooms
     * @param {number} newPostbathrooms
     * @param {number} newPostSize
     * @param {string} newPostStreetName
     * @param {number} newPostHouseNumber
     * @param {string}newPostZip
     * @param {string}newPostCity
     * @param{string} newPostNumberAddition
     * @param {number} newPostConstructionYear
     * @param {('yes'|'no')} newPostHasGarage
     * @param {string} newPostDescription
     * @returns {Promise<string>}
     *   replacing old image data with new, provided in parameters
     *   uploading a new image for House separately using House id
     */
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
    },
    /**
     *
     * @param {number} houseId
     * @returns {Promise<string>}
     */
    async deleteHouse(houseId) {
      return fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
          method: 'DELETE',
          headers: {
            'X-Api-Key': import.meta.env.VITE_API_KEY
          }
        }
      )
        .then((response) => response.text())
        .then((data) => data)
    }
  }
})
