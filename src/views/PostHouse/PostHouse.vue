<template src="./post_house.html"></template>
<script>
import {Field, Form} from 'vee-validate'
import {mapActions, mapState,} from 'pinia'
import {useHousesStore} from '../../stores/counter'

export default {
  name: 'PostHouse',
  data() {
    return {
      isSubmited: false,
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
    ...mapActions(useHousesStore, ['postHouse']),
    /**
     * add a new hous eto the list of houses with the data from a form
     *while submitting a new House, get to the page with a newly created House, by using linkId for params
     * @param values
     */
    submit(values) {
      var self = this
      this.postHouse(
        values.price,
        values.bedrooms,
        values.bathrooms,
        values.size,
        values.street,
        values.houseNumber,
        values.code,
        values.city,
        values.option,
        values.date,
        values.garage,
        values.description
      ).then(function (imageData) {
        self.$router.push({name: "house", params: {id: self.linkId}});
      });
    },
    /**
     *
     * @param value
     * @returns {boolean|string}
     * checks if the value is not empty
     */
    validateField(value) {
      if (!value) {
        return 'This field is required';
      }
      return true

    },
    /**
     * checks if the value is provided and if it is a number
     * @param value
     * @returns {boolean|string}
     */
    validateNumber(value) {
      if (!value) {
        return 'This field is required';
      } else if (isNaN(value)) {
        return 'This must be a number'
      }
      return true

    },
    /**
     * checks if the file is provided and if it is of  a certain type
     * @param value
     * @returns {boolean|string}
     */
    validateImage(value) {
      let allowedTypes = ['image/jpeg', 'image/png'];
      if (!value) {
        return 'image is required';
      } else if (!allowedTypes.includes(value.type)) {
        return 'Only JPG and PNG are allowed'
      }

      return true
    }
  }

}
</script>
<style src="./post_house.css"></style>
