<template src="./edit.html">
</template>
<script>
import {Field, Form} from 'vee-validate'
import {mapActions, mapState,} from 'pinia'
import {useHousesStore} from '@/stores/counter'

export default {
  name: 'PostHouse',
  data() {
    return {
      isSubmited: false,
      house: {},
      editId: '',
      street: '',
      city: '',
      price: '',
      size: '',
      bedrooms: '',
      bathrooms: '',
      code: '',
      description: '',
      hasGarage: '',
      constructionYear: '',
      houseNumber: '',
      houseAddition: '',
      imageURl: '',
      background: 'assets/images/ic_plus_grey@3x.png',
    }
  },

  components: {
    Form,
    Field
  },

  computed: {
    ...mapState(useHousesStore, ['linkId']),
  },
  methods: {
    ...mapActions(useHousesStore, ['editHouse', 'getHouses']),
    submit(values) {
      /**
       * submit updated data for a House to backend
       * enter the edited House page, using linkId as params
       * disable submit button
       * @type {default.methods}
       */
      var self = this
      this.editHouse(
        this.editId,
        values.price,
        values.bedrooms,
        values.bathrooms,
        values.size,
        values.streetName,
        values.houseNumber,
        values.code,
        values.city,
        values.numberAddition,
        values.constructionYear,
        values.garage === 'yes',
        values.description
      ).then(function (imageData) {
        self.$router.push({name: "house", params: {id: self.linkId}})
      });
      this.isSubmited = true
    },
    // change background on image input field
    onFileChange(event) {
      if (!event.target.files) {
        document.getElementById('imgLabel').style.backgroundImage = 'url(/assets/images/ic_plus_grey@3x.png)';
      } else {
        document.getElementById('imgLabel').style.backgroundImage = `url(${window.URL.createObjectURL(event.target.files[0])})`;
        document.getElementById('imgLabel').style.backgroundSize = '100%';
        document.getElementById('deleteImgBtn').style.display = 'inline-block'
      }
    },
    /**
     * change background after deleting an image
     * @param event
     */
    onImageDelete(event) {
      document.getElementById('imgLabel').style.backgroundImage = 'url(/assets/images/ic_plus_grey@3x.png)';
      event.target.style.display = 'none'
      this.house.image = null;
    },
    /**
     * splits address taken from backend and returns an object
     * that allows to use streetName, houseNumber and number addition separately
     * @param {string} address
     * @returns {*|{streetName: *, houseNumber: string, numberAddition: string}|*[]}
     // *
     */
    splitAddress(address) {
      if (address.length === 0) {
        return [];
      }
      const splitted = address.split(' ')
      if (splitted.length === 1) {
        return splitted
      }
      const result = {streetName: splitted[0], houseNumber: '', numberAddition: ''}
      for (let i = 0; i < splitted[1].length; i++) {
        if (isNaN(parseInt(splitted[1][i]))) {
          result.numberAddition = result.numberAddition + splitted[1][i]
        } else {
          result.houseNumber = result.houseNumber + splitted[1][i]
        }
      }
      return result
    },
    // checks if data is provided.
    validateField(value) {
      if (!value) {
        return 'This field is required';
      }
      return true

    },
    // check if data is given and whether it is a number
    validateNumber(value) {
      if (!value) {
        return 'This field is required';
      } else if (isNaN(value)) {
        return 'This must be a number'
      }
      return true

    },
    // checks if the file is provided and whether it has an allowed type
    validateImage(value) {
      if (!value && this.house.image) {
        return true;
      }

      let allowedTypes = ['image/jpeg', 'image/png'];
      if (!value) {
        return 'image is required';
      } else if (!allowedTypes.includes(value.type)) {
        return 'Only JPG and PNG are allowed'
      }

      return true
    }
  },
  /**defines editId using route.params,
   * takes the House from the backend by using editId
   * fills in the form with this House data
   * @returns {Promise<void>}
   */

  async created() {
    this.editId = this.$route.params.id;
    let list = await this.getHouses();
    list.forEach((item) => {
      if (item.id == this.editId) {
        this.house = item
      }
    })

    this.street = this.splitAddress(this.house.location.street);
    this.city = this.house.location.city;
    this.price = this.house.price;
    this.size = this.house.size;
    this.bedrooms = this.house.rooms.bedrooms;
    this.bathrooms = this.house.rooms.bathrooms;
    this.code = this.house.location.zip;
    this.description = this.house.description;
    this.hasGarage = this.house.hasGarage ? 'yes' : 'no';
    this.constructionYear = this.house.constructionYear;
    this.houseNumber = this.house.houseNumber;
    this.houseAddition = this.house.numberAddition;
    this.imageURl = this.house.image
    this.background = this.house.image
  },
  async mounted() {
    // change the backgroud of a div if image input is edited
    this.$el.addEventListener('change', this.onFileChange)
  }
}
</script>
<style src="./edit.css"></style>
